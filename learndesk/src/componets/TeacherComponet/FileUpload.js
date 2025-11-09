import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const classCode = localStorage.getItem("currentClassCode");
  const user = JSON.parse(localStorage.getItem("user"));
  const teacherEmail = user?.email;

  const API_URL = process.env.REACT_APP_API_URL; 

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/files/${classCode}/${teacherEmail}`
      );
      setFiles(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch uploaded files");
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this file?")) return;

  try {
    await axios.delete(`${API_URL}/api/files/${id}`);
    setFiles(files.filter((f) => f._id !== id));
  } catch (err) {
    console.error(err);
    alert("Failed to delete file");
  }
};

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("classCode", classCode);
    formData.append("teacherEmail", teacherEmail);

    try {
      setUploading(true);
      await axios.post(`${API_URL}/api/files/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setError("");
      setFile(null);
      e.target.reset();
      fetchFiles();
    } catch (err) {
      console.error(err);
      setError("File upload failed! Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0 p-4">
        <h4 className="mb-3 text-center text-primary">
          <i className="bi bi-upload me-2"></i>Upload Class Files
        </h4>

        <form onSubmit={handleUpload} className="text-center">
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Uploading...
              </>
            ) : (
              "Upload File"
            )}
          </button>
          {error && <div className="text-danger mt-2">{error}</div>}
        </form>
      </div>

      {/* Uploaded files section */}
      <div className="mt-4">
        <h5 className="text-secondary mb-3">Uploaded Files</h5>
        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <div className="row">
            {files.map((f) => (
              <div key={f._id} className="col-md-6 col-lg-4 mb-3">
                <div className="card shadow-lg border-0 p-3 h-100">
                 <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
  <div className="d-flex align-items-center flex-grow-1">
    <i className="bi bi-file-earmark-text text-primary fs-3 me-2"></i>
    <div className="text-truncate" style={{ maxWidth: "160px" }}>
      <h6 className="mb-0 text-truncate">{f.filename}</h6>
      <small className="text-muted">{f.classCode}</small>
    </div>
  </div>

  <div className="d-flex align-items-center gap-2">
    <a
      href={f.url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center"
      style={{ minWidth: "32px" }}
    >
      <i className="bi bi-box-arrow-up-right"></i>
    </a>
    <button
      className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
      onClick={() => handleDelete(f._id)}
      title="Delete file"
      style={{ minWidth: "32px" }}
    >
      <i className="bi bi-trash"></i>
    </button>
  </div>
</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
