import React, { useEffect, useState } from "react";
import { Trash2, PlusCircle, Megaphone, CalendarDays, User } from "lucide-react";
import "./styles/AnnouncementTab.css";

const AnnouncementTab = ({ classCode }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const teacherEmail = user?.email || "";

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

  // Add announcement
  const handleAdd = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/announcement/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, classCode, teacherEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setAnnouncements([data.announcement, ...announcements]);
        setMessage({ type: "success", text: "Announcement added!" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error adding announcement" });
    }
    setTitle("");
    setContent("");
  };

  // Delete announcement
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/announcement/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAnnouncements(announcements.filter((a) => a._id !== id));
        setMessage({ type: "success", text: "Announcement deleted" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error deleting announcement" });
    }
  };

  return (
    <div className="announcement-tab p-3">
      {/* Alert message */}
      {message && (
        <div
          className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} alert-dismissible fade show`}
        >
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

      {/* Add Announcement */}
      <div className="add-announcement mb-4 shadow-sm p-4 rounded-4 bg-light">
        <h5 className="fw-semibold mb-3 text-primary d-flex align-items-center">
          <Megaphone size={22} className="me-2 text-primary" /> Make an Announcement
        </h5>
        <input
          type="text"
          className="form-control mb-2 rounded-pill"
          placeholder="Enter announcement title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-3 rounded-3"
          placeholder="Write something for your students..."
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="btn btn-primary rounded-pill px-4" onClick={handleAdd}>
          <PlusCircle className="me-2" size={18} /> Post Announcement
        </button>
      </div>

      {/* List Announcements */}
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
            <Trash2
              className="text-danger delete-icon"
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(a._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementTab;
