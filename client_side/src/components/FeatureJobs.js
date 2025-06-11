import { useState } from "react";
import { Link } from "react-router-dom";
import UseJobs from "../hooks/UseJobs";
import slugify from "slugify";

function FeatureJobs() {
  const [activeTab, setActiveTab] = useState("fulltime");
  const { jobs, loading, error } = UseJobs();

  const renderJobCard = (job, index) => (
    <div className="card mb-3 p-3 job-listings-card" key={index}>
      <div className="row align-items-center g-3">
        <div className="col-12 col-sm-2 col-md-1 text-center">
          <img
            src={
              job.company?.company_logo
                ? `${process.env.REACT_APP_API_BASE_URL}/storage/${job.company.company_logo}`
                : `${process.env.PUBLIC_URL}/images/default-logo.jpg`
            }
            alt={job.company?.company_name || job.job_title}
            className="img-fluid company-logo"
          />
        </div>
        <div className="col-12 col-sm-7 col-md-8">
          <h5 className="mb-2">{job.job_title}</h5>
          <div
            className="d-flex flex-wrap gap-3 text-muted mb-2"
            style={{ fontSize: "0.9rem" }}
          >
            <div>
              <i className="bi bi-geo-alt"></i>{" "}
              <span>{job.company.city || "Unknown"}</span>
            </div>
            <div>
              <i className="bi bi-clock"></i> <span>{job.job_type}</span>
            </div>
            <div>
              <i className="bi bi-cash"></i> <span>{job.payment_range}</span>
            </div>
          </div>
          <small className="text-muted">
            Posted on: {new Date(job.posted_at).toDateString()}
          </small>
        </div>
        <div className="col-12 col-sm-3 col-md-3 text-sm-end text-center">
          <Link
            to={`/jobDetails/${job.job_id}-${slugify(job.job_title)}-${slugify(
              job.job_type
            )}`}
            className="view-job-button"
          >
            View Job
          </Link>
        </div>
      </div>
    </div>
  );

  const filteredJobs = jobs
    .filter((job) => {
      if (activeTab === "fulltime") return job.job_type === "full-time";
      if (activeTab === "parttime") return job.job_type === "part-time";
      return false;
    })
    .sort(() => 0.5 - Math.random()) // shuffle randomly
    .slice(0, 3); // limit to 3 jobs

  return (
    <section className="job-listings container p-5" data-aos="fade-up">
      <h2 className="mb-4">Job Listings</h2>

      <div className="text-center mb-4">
        <ul
          id="jobTabs"
          className="nav nav-tabs justify-content-center"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === "fulltime" ? "active" : ""}`}
              onClick={() => setActiveTab("fulltime")}
              type="button"
              role="tab"
            >
              Full Time
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === "parttime" ? "active" : ""}`}
              onClick={() => setActiveTab("parttime")}
              type="button"
              role="tab"
            >
              Part Time
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content">
        <div className="tab-pane fade show active">
          {loading && (
            <div className="text-center spinner-container">
              <div className="spinner"></div>
            </div>
          )}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && filteredJobs.length === 0 && (
            <p className="text-muted text-center">
              No {activeTab.replace("time", "-time")} jobs available.
            </p>
          )}
          {!loading &&
            !error &&
            filteredJobs.map((job, index) => renderJobCard(job, index))}
        </div>
      </div>

      <div className="mt-5 text-center">
        <Link to="/jobs" className="browse-more-jobs">
          Browse More Jobs
        </Link>
      </div>
    </section>
  );
}

export default FeatureJobs;
