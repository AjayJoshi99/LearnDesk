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
          {/* Make the row stack on small screens and go horizontal on md+ */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2">
            <div className="flex-grow-1">
              {/* Title: allow breaking, don't let icon squeeze it */}
              <h6 className="fw-bold text-primary d-flex align-items-center mb-1 text-break w-100 flex-shrink-1">
                <Megaphone size={18} className="me-2 text-primary" />
                <span className="me-0">{a.title}</span>
              </h6>

              {/* Content: allow long text to wrap */}
              <p className="text-muted mb-2 text-break">{a.content}</p>

              {/* Metadata: will wrap items to next line on small screens */}
              <div className="d-flex flex-wrap align-items-center small text-muted">
                <span className="me-3 d-flex align-items-center text-break w-100 w-md-auto">
                  <User size={14} className="me-1" /> <span className="ms-1">{a.teacherEmail}</span>
                </span>

                <span className="d-flex align-items-center text-break w-100 w-md-auto mt-1 mt-md-0">
                  <CalendarDays size={14} className="me-1" />
                  <span className="ms-1">{new Date(a.createdAt).toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* Optional right-side small controls or summary — keeps it below on mobile */}
            <div className="ms-md-3 mt-2 mt-md-0 text-md-end">
              {/* You can put buttons / tags here, if any. Left empty for now. */}
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};

export default Announcement;
