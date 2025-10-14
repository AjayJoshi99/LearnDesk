import React, { useEffect, useState } from "react";
import { Megaphone, CalendarDays, User } from "lucide-react";
import "./TeacherComponet/styles/AnnouncementTab.css";

const Announcement = ({ classCode }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/announcement/class/${classCode}`);
        const data = await res.json();
        if (res.ok) setAnnouncements(data.announcements || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (classCode) fetchAnnouncements();
  }, [classCode]);


  return (
    <div className="announcement-tab p-3">
      <h6 className="fw-semibold text-secondary mb-3">Recent Announcements</h6>
      {loading && <p className="text-muted text-center">Loading announcements...</p>}
      {!loading && announcements.length === 0 && (
        <p className="text-muted text-center">No announcements yet. Be the first to post one!</p>
      )}

      {announcements.map((a) => (
        <div
          key={a._id}
          className="card announcement-card shadow-sm mb-3 rounded-4 border-0 p-3 hover-card"
        >
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="fw-bold text-primary d-flex align-items-center mb-1">
                <Megaphone size={18} className="me-2 text-primary" /> {a.title}
              </h6>
              <p className="text-muted mb-2">{a.content}</p>
              <div className="d-flex flex-wrap align-items-center small text-muted">
                <span className="me-3 d-flex align-items-center">
                  <User size={14} className="me-1" /> {a.teacherEmail}
                </span>
                <span className="d-flex align-items-center">
                  <CalendarDays size={14} className="me-1" />
                  {new Date(a.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
