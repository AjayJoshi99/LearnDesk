import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from "./Loading"; 
import './styles/LoginRegister.css';

const PENDING_KEY = 'pendingRegistration';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('user');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: 'Male',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();
  
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PENDING_KEY);
      if (!raw) return;
      const pending = JSON.parse(raw);
      if (pending.expiresAt && pending.expiresAt > Date.now()) {
        setRegisterData(prev => ({
          ...prev,
          name: pending.name || prev.name,
          email: pending.email || prev.email,
          mobile: pending.mobile || prev.mobile,
          gender: pending.gender || prev.gender
        }));
        setUserType(pending.userType || 'normal');
        setOtpSent(true);
      } else {
        localStorage.removeItem(PENDING_KEY);
      }
    } catch (err) {
      console.error('Error reading pending registration', err);
      localStorage.removeItem(PENDING_KEY);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!registerData.name.trim()) newErrors.name = 'Name is required';
    if (!registerData.email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(registerData.email))
      newErrors.email = 'Enter a valid email address';

    if (!registerData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!mobilePattern.test(registerData.mobile))
      newErrors.mobile = 'Mobile number must be 10 digits';

    if (!registerData.password) newErrors.password = 'Password is required';
    else if (!passwordPattern.test(registerData.password))
      newErrors.password =
        'Password must be at least 6 characters and include a letter, number, and special character';

    if (!registerData.confirmPassword)
      newErrors.confirmPassword = 'Confirm your password';
    else if (registerData.password !== registerData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('role', data.user.userType);
        localStorage.setItem('user', JSON.stringify(data.user));
        // alert(`Welcome ${data.user.name}`);
        setLoginData({ email: '', password: '' });
        if (data.user.userType === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }finally {
      setLoading(false); 
    }
  };

  const handleRegisterSubmit = async(e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Register:', { ...registerData, userType });
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          mobile: registerData.mobile,
          gender: registerData.gender,
          password: registerData.password,
          userType,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('OTP sent to your email. Please verify.');

        const pending = {
          name: registerData.name,
          email: registerData.email,
          mobile: registerData.mobile,
          gender: registerData.gender,
          userType,
          expiresAt: Date.now() + 10 * 60 * 1000
        };
        localStorage.setItem(PENDING_KEY, JSON.stringify(pending));

        setOtpSent(true);
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Try again later.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert('Please enter OTP');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          mobile: registerData.mobile,
          gender: registerData.gender,
          password: registerData.password,
          userType,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful! You can now login.');
        localStorage.removeItem(PENDING_KEY);
        setOtpSent(false);
        setOtp('');
        setRegisterData({
          name: '',
          email: '',
          mobile: '',
          gender: 'Male',
          password: '',
          confirmPassword: '',
        });
        setIsLogin(true);
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying OTP');
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          mobile: registerData.mobile,
          gender: registerData.gender,
          password: registerData.password,
          userType,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('OTP resent to your email.');
        const raw = localStorage.getItem(PENDING_KEY);
        if (raw) {
          const pending = JSON.parse(raw);
          pending.expiresAt = Date.now() + 10 * 60 * 1000;
          localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
        }
      } else {
        alert(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error(err);
      alert('Error resending OTP');
    }
  };

  const handleCancelOtp = () => {
    localStorage.removeItem(PENDING_KEY);
    setOtpSent(false);
    setOtp('');
  };

  return (
    <div className="auth-container">
      {loading && <Loading message="Please wait..." />}
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="auth-subtitle">
            {isLogin
              ? 'Login to continue your journey'
              : 'Join us to start learning'}
          </p>
        </div>

        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <div className="form-container">
          {isLogin ? (
            <form className="auth-form fade-in" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>
          ) : (
          
            !otpSent && (
              <form className="auth-form fade-in" onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label htmlFor="register-name">Full Name</label>
                  <input
                    id="register-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                    required
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="register-email">Email Address</label>
                  <input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                    required
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="register-mobile">Mobile Number</label>
                  <input
                    id="register-mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={registerData.mobile}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, mobile: e.target.value })
                    }
                    required
                  />
                  {errors.mobile && <p className="error">{errors.mobile}</p>}
                </div>

                <div className="user-type-group">
                  <label>Gender</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={registerData.gender === 'Male'}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, gender: e.target.value })
                        }
                        required
                      />
                      <span className="radio-custom"></span> Male
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={registerData.gender === 'Female'}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, gender: e.target.value })
                        }
                      />
                      <span className="radio-custom"></span> Female
                    </label>

                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={registerData.gender === 'Other'}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, gender: e.target.value })
                        }
                      />
                      <span className="radio-custom"></span> Other
                    </label>
                  </div>
                </div>

                <div className="user-type-group">
                  <label className="user-type-label">I am a:</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="userType"
                        value="user"
                        checked={userType === 'user'}
                        onChange={(e) => setUserType(e.target.value)} />
                      <span className="radio-custom"></span> user </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="userType"
                        value="teacher"
                        checked={userType === 'teacher'}
                        onChange={(e) => setUserType(e.target.value)} />
                      <span className="radio-custom"></span> Teacher </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="register-password">Password</label>
                  <input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value
                      })
                    }
                    required
                  />
                  {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="register-confirm">Confirm Password</label>
                  <input
                    id="register-confirm"
                    type="password"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value
                      })
                    }
                    required
                  />
                  {errors.confirmPassword && (
                      <p className="error">{errors.confirmPassword}</p>
                    )}
                </div>

                <button type="submit" className="submit-btn">
                  Create Account
                </button>
              </form>
            )
          )}
        </div>

        {otpSent && (
          <div className="form-group fade-in">
            <h3>OTP Verification</h3>
            <p>Enter the OTP sent to <strong>{registerData.email}</strong></p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button
                type="button"
                className="submit-btn"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>

              <button
                type="button"
                className="submit-btn"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>

              <button
                type="button"
                className="submit-btn"
                onClick={handleCancelOtp}
              >
                Edit details
              </button>
            </div>
          </div>
        )}

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
