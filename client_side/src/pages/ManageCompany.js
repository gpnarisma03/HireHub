import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import JobPostForm from "../components/JobPostForm";

function ManageCompany() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [company, setCompany] = useState(null);
  const { company_id } = useParams();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/company/${company_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCompany(response.data.company);
      } catch (error) {
        console.error("Failed to fetch company:", error);
      }
    };

    if (company_id) {
      fetchCompany();
    }
  }, [company_id]);

  const renderJobs = () => {
    const jobs = company?.jobs || [];

    return (
      <>
        <h4>Posted Jobs</h4>
        {jobs.length === 0 ? (
          <p className="text-center">No jobs posted yet.</p>
        ) : (
          <table className="table table-bordered table-hover align-middle custom-table">
            <thead className="table-light">
              <tr>
                <th>Job Title</th>
                <th>Status</th>
                <th>Type</th>
                <th>Payment</th>
                <th>Vacancy</th>
                <th>Applications</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.job_id}>
                  <td>{job.job_title}</td>
                  <td>
                    <span
                      className={`badge ${
                        job.status === "open" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {job.status.toUpperCase()}
                    </span>
                  </td>

                  <td>{job.job_type}</td>
                  <td>{job.payment_range}</td>
                  <td>{job.job_vacancy}</td>
                  <td>
                    {job.applications.length === 0 ? (
                      <span>0 applicants</span>
                    ) : (
                      <Link
                        to={`/employer/job/${job.job_id}/applicants`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Applicants ({job.applications.length})
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "jobs":
        return renderJobs();
      case "post":
        return (
          <>
            <h4>Post a New Job</h4>
            <JobPostForm
              companyId={company.company_id}
              onSuccess={() => window.location.reload()}
            />
          </>
        );
      default:
        return null;
    }
  };

  // ✅ If not loaded yet, show a single centered spinner
  if (!company) {
    return (
      <div
        className="container position-relative"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-5 position-relative">
      <h2 className="mb-4">Manage Company - {company.company_name}</h2>
      <div className="row">
        <div className="col-md-3 mb-3 custom-sidebar">
          <div className="list-group">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`list-group-item list-group-item-action ${
                activeTab === "jobs" ? "active" : ""
              }`}
            >
              📄 Posted Jobs
            </button>
            <button
              onClick={() => setActiveTab("post")}
              className={`list-group-item list-group-item-action ${
                activeTab === "post" ? "active" : ""
              }`}
            >
              ➕ Post a Job
            </button>
          </div>
        </div>
        <div className="col-md-9">{renderContent()}</div>
      </div>
    </div>
  );
}

export default ManageCompany;
