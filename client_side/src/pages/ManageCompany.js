import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ManageCompany() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [company, setCompany] = useState(null);

  const { company_id } = useParams();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/company/${company_id}`, // replace with dynamic ID if needed
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
          <p>No jobs posted yet.</p>
        ) : (
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Job Title</th>
                <th>Status</th>
                <th>Type</th>
                <th>Payment</th>
                <th>Applications</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.job_id}>
                  <td>{job.job_title}</td>
                  <td>{job.status}</td>
                  <td>{job.job_type}</td>
                  <td>{job.payment_range}</td>
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
            <p>Post job form goes here.</p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container p-5">
      <h2 className="mb-4">
        Manage Company - {company?.company_name || "Loading..."}
      </h2>
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
