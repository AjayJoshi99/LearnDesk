import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Form, Button, Container, Card } from "react-bootstrap";

const SettingsTab = () => {
  const [classData, setClassData] = useState(null);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("classData"));
    if (storedData) {
      setClassData(storedData);
      setClassName(storedData.className || "");
      setSubject(storedData.subject || "");
    }
  }, []);

  const handleUpdate = async () => {
    if (!classData) return;
    setLoading(true);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/class/update/${classData.code}`,
        { className, subject }
      );
      localStorage.setItem("classData", JSON.stringify(res.data));
      alert("✅ Class updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error updating class");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!classData) return;
    if (
      !window.confirm(
        "⚠️ Are you sure you want to delete this class? This will also delete all related data."
      )
    )
      return;
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/class/delete/${classData.code}`
      );
      localStorage.removeItem("classData");
      alert("🗑️ Class deleted successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting class");
    }
    setLoading(false);
  };

  if (!classData) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading class data...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff, #f8f9fa)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "3rem 0",
      }}
    >
      <Container style={{ maxWidth: "600px" }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">⚙️ Class Settings</h2>
          <p className="text-muted">
            Manage your class details and perform administrative actions.
          </p>
        </div>

        {/* ---------- UPDATE CLASS ---------- */}
        <Card
          className="shadow border-0 mb-4 p-4"
          style={{
            borderRadius: "15px",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <Card.Body>
            <div className="text-center mb-3">
              <h5 className="fw-bold text-secondary">✏️ Update Class</h5>
              <p className="text-muted small mb-0">
                Modify your class name or subject details.
              </p>
            </div>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-muted">
                  Class Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Enter new class name"
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold text-muted">Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter new subject"
                  className="rounded-3"
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-4 py-2 fw-semibold rounded-pill"
                >
                  {loading ? "Updating..." : "Update Class"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* ---------- DELETE CLASS ---------- */}
        <Card
          className="shadow border-0 p-4"
          style={{
            borderRadius: "15px",
            background: "linear-gradient(135deg, #fff0f0, #ffeaea)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <Card.Body>
            <div className="text-center mb-3">
              <h5 className="fw-bold text-danger">🗑️ Delete Class</h5>
              <p className="text-muted small mb-0">
                This will permanently remove all data related to this class.
              </p>
            </div>

            <div className="text-center mt-4">
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 fw-semibold rounded-pill"
              >
                {loading ? "Deleting..." : "Delete Class"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default SettingsTab;
