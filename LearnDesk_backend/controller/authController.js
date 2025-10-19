const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Otp = require('../models/Otp');
const Class = require("../models/Class");
const { sendOtpEmail } = require('../utils/mailers');

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit string
};

exports.requestOtp = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    // check if user already verified
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: 'Email already verified. Please log in.' });
    }

    // generate OTP and hash it
    const otp = generateOtp();
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    const expireMinutes = parseInt(process.env.OTP_EXPIRE_MIN || '10', 10);
    const expiresAt = new Date(Date.now() + expireMinutes * 60000);

    // upsert OTP doc (replace any previous OTP for the email)
    await Otp.findOneAndUpdate(
      { email: email.toLowerCase() },
      { otpHash, expiresAt, createdAt: new Date(), attempts: 0 },
      { upsert: true, new: true }
    );

    // send email
    await sendOtpEmail(email, otp);

    return res.json({ message: 'OTP sent to email.' });
  } catch (err) {
    console.error('requestOtp error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};



exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp, name, password, mobile, gender, userType } = req.body;

    // ✅ Validate required fields
    if (!email || !otp || !name || !password || !mobile || !gender || !userType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const otpDoc = await Otp.findOne({ email: email.toLowerCase() });
    if (!otpDoc) return res.status(400).json({ message: 'OTP not found or expired' });

    // Expiry check
    if (otpDoc.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpDoc._id });
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Attempt limit
    if (otpDoc.attempts >= 5) {
      await Otp.deleteOne({ _id: otpDoc._id });
      return res.status(429).json({ message: 'Too many wrong attempts. Request new OTP.' });
    }

    // OTP match
    const match = await bcrypt.compare(otp, otpDoc.otpHash);
    if (!match) {
      otpDoc.attempts += 1;
      await otpDoc.save();
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // ✅ Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user && user.isVerified) {
      await Otp.deleteOne({ _id: otpDoc._id });
      return res.status(400).json({ message: 'User already registered' });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // ✅ Create or update user
    if (!user) {
      user = new User({
        name,
        email: email.toLowerCase(),
        password: passwordHash,
        mobile,
        gender,
        userType,
        isVerified: true,
      });
    } else {
      user.name = name;
      user.password = passwordHash;
      user.mobile = mobile;
      user.gender = gender;
      user.userType = userType;
      user.isVerified = true;
    }

    await user.save();
    await Otp.deleteOne({ _id: otpDoc._id });
    const pendingClasses = await Class.find({ pendingStudents: email });

    for (const cls of pendingClasses) {
      // Remove from pending
      cls.pendingStudents = cls.pendingStudents.filter((e) => e !== email);

      // Add to registered students if not already
      if (!cls.students.includes(email)) cls.students.push(email);

      await cls.save();
    }
    
    return res.json({
      message: 'User verified and registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error('verifyOtp error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

  exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found. Please register.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    // Successful login
    return res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};


exports.requestPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate OTP & hash
    const otp = generateOtp();
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    const expireMinutes = parseInt(process.env.OTP_EXPIRE_MIN || '10', 10);
    const expiresAt = new Date(Date.now() + expireMinutes * 60000);

    // Upsert OTP for the email (replace any previous OTP)
    await Otp.findOneAndUpdate(
      { email },
      { otpHash, expiresAt, createdAt: new Date(), attempts: 0 },
      { upsert: true, new: true }
    );

    // Send OTP via email
    await sendOtpEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully to email" });
  } catch (err) {
    console.error("requestPasswordOtp error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 2️⃣ Verify OTP
exports.verifyPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otp || !email) return res.status(400).json({ message: "Email and OTP required" });

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) return res.status(400).json({ message: "OTP not found or expired" });

    if (new Date(otpRecord.expiresAt) < new Date())
      return res.status(400).json({ message: "OTP expired" });

    const isMatch = await bcrypt.compare(otp.trim(), otpRecord.otpHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid OTP" });

    // ✅ Don't delete OTP here
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("verifyPasswordOtp error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// 3️⃣ Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ message: "All fields are required" });

    const otpDoc = await Otp.findOne({ email });
    if (!otpDoc) return res.status(400).json({ message: "OTP not found or expired" });

    // Expiry check
    if (otpDoc.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    // Compare OTP
    const isMatch = await bcrypt.compare(otp.trim(), otpDoc.otpHash);
    if (!isMatch) {
      otpDoc.attempts += 1;
      await otpDoc.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash new password & update user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    // Delete OTP after success
    await Otp.deleteOne({ email });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
