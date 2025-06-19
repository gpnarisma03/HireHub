import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function JobApplicants() {
  const { job_id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/applications/job/${job_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = res.data;

        setApplicants(
          data.map((app) => ({
            ...app,
            job_title: app.job?.job_title || "Untitled",
          }))
        );

        if (data.length > 0) {
          setJobTitle(data[0]?.job?.job_title || "");
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [job_id]);

  const getBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning text-dark";
      case "hired":
        return "bg-success";
      case "reviewed":
        return "bg-info text-dark";
      case "rejected":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container p-5 position-relative">
      <h3 className="text-muted">
        Applicants for:{" "}
        <span className="text-job">
          <span style={{ color: "var(--primary_1)" }}>{jobTitle}</span>{" "}
          <span style={{ color: "var(--secondary_2)" }}>{`#${job_id}`}</span>
        </span>
      </h3>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : applicants.length === 0 ? (
        <p className="text-muted">No applicants yet.</p>
      ) : (
        <div className="table-responsive">
          <table
            className="table table-bordered align-middle custom-table"
            style={{ color: "red" }}
          >
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Cover Letter</th>
                <th>Applied At</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr key={app.application_id}>
                  <td>
                    {app.user?.first_name} {app.user?.last_name}
                  </td>
                  <td>{app.user?.email}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(app.status)}`}>
                      {app.status.toUpperCase()}
                    </span>
                  </td>
                  <td>{app.cover_letter}</td>
                  <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={`${process.env.REACT_APP_API_BASE_URL}/storage/${app.resume_file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-3">
        <Link to="/employer" className="btn btn-secondary">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default JobApplicants;
