import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FileDownload() {
  const [files, setFiles] = useState([]);
  const classCode = localStorage.getItem("currentClassCode");
  const fetchFiles = async () => {
    console.log("Inside fetchFiles, classCode:", classCode);
    try {
        console.log("Fetching files using APIs");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/files/get-files/${classCode}`
      );
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line
  }, [classCode]);

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h3 className="fw-bold text-primary animate-fade-in">
          <i className="bi bi-folder2-open me-2"></i>Class Files
        </h3>
        <p className="text-muted">All files uploaded for your class</p>
      </div>

      {files.length === 0 ? (
        <div className="text-center mt-5 animate-fade-in">
          <i className="bi bi-inbox fs-1 text-secondary"></i>
          <p className="text-muted mt-2">No files uploaded yet.</p>
        </div>
      ) : (
       <div className="row">
        {files.map((file, index) => (
            <div
            key={file._id}
            className="col-12 col-md-6 mb-4 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
            >
            <div
                className="card border-0 shadow-lg h-100 rounded-4 hover-effect"
                style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
                <div className="card-body d-flex flex-column justify-content-between">
                <div className="d-flex align-items-start mb-3">
                    <i className="bi bi-file-earmark-text text-primary fs-2 me-3 flex-shrink-0"></i>

                    <div className="flex-grow-1">
                      <h6
                        className="fw-semibold mb-1 text-break"
                        style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                        title={file.filename}
                      >
                        {file.filename}
                      </h6>

                      <small className="text-secondary d-block">
                        <i className="bi bi-clock-history me-1"></i>
                        {new Date(file.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </small>
                    </div>
                  </div>


                <div className="d-flex justify-content-between align-items-center mt-auto border-top pt-2">
                    <span className="badge bg-light text-dark px-3 py-2 rounded-pill shadow-sm">
                    {file.classCode}
                    </span>
                    <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary rounded-pill px-3"
                    >
                    <i className="bi bi-box-arrow-up-right me-1"></i>Open
                    </a>
                </div>
                </div>
            </div>
            </div>
        ))}
        </div>

      )}

      <style>{`
        .hover-effect {
          transition: all 0.3s ease-in-out;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
        .animate-slide-up {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.6s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
