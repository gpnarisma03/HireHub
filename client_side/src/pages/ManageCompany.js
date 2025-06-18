import React, { useState } from "react";

function ManageCompany() {
  const [activeTab, setActiveTab] = useState("jobs");

  const renderContent = () => {
    switch (activeTab) {
      case "jobs":
        return (
          <>
            <h4>Posted Jobs</h4>
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Job Title</th>
                  <th>Type</th>
                  <th>Vacancies</th>
                  <th>Payment</th>
                  <th>Start Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Front-End Developer</td>
                  <td>Full-time</td>
                  <td>3</td>
                  <td>₱25,000 - ₱35,000</td>
                  <td>2025-07-01</td>
                </tr>
                <tr>
                  <td>QA Analyst</td>
                  <td>Part-time</td>
                  <td>1</td>
                  <td>₱18,000 - ₱22,000</td>
                  <td>2025-07-15</td>
                </tr>
              </tbody>
            </table>
          </>
        );

      case "applicants":
        return (
          <>
            <h4>Applicants</h4>
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Position Applied</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Juan Dela Cruz</td>
                  <td>Front-End Developer</td>
                  <td>juan@example.com</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>Maria Santos</td>
                  <td>QA Analyst</td>
                  <td>maria@example.com</td>
                  <td>Reviewed</td>
                </tr>
              </tbody>
            </table>
          </>
        );

      case "post":
        return (
          <>
            <h4>Post a New Job</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select">
                  <option value="">Select a category</option>
                  <option value="tech">Technology</option>
                  <option value="design">Design</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Job Description</label>
                <textarea className="form-control" rows="4"></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Qualifications</label>
                <textarea className="form-control" rows="3"></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Responsibilities</label>
                <textarea className="form-control" rows="3"></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Job Type</label>
                <select className="form-select">
                  <option value="">Select type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Job Vacancy</label>
                <input type="number" className="form-control" min="1" />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Range (PHP)</label>
                <div className="d-flex gap-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="₱ Minimum"
                    min="0"
                  />
                  <span className="align-self-center">-</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="₱ Maximum"
                    min="0"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input type="date" className="form-control" />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Job Post
              </button>
            </form>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container p-5">
      <h2 className="mb-4">Manage Company - Taruban Tilag Inc.</h2>
      <div className="row">
        {/* Sidebar */}
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
              onClick={() => setActiveTab("applicants")}
              className={`list-group-item list-group-item-action ${
                activeTab === "applicants" ? "active" : ""
              }`}
            >
              👤 Applicants
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

        {/* Content */}
        <div className="col-md-9">{renderContent()}</div>
      </div>
    </div>
  );
}

export default ManageCompany;
