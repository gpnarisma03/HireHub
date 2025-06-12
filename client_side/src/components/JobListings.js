import { useState } from "react";
import { Link } from "react-router-dom";
import UseJobs from "../hooks/UseJobs";
import slugify from "slugify";
import Banner from "./Banner";

// Extract the minimum number from a salary range string like "₱20,000 - ₱25,000"
const getMinSalary = (rangeStr) => {
  if (!rangeStr) return 0;
  const match = rangeStr.match(/\d{1,3}(?:,\d{3})*/); // Get first number
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10); // Remove commas
};

function JobListings() {
  const [activeTab, setActiveTab] = useState("fulltime");
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { jobs, loading, error } = UseJobs();

  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleSortChange = (e) => setSortBy(e.target.value);

  // Filter jobs by tab
  let filteredJobs = jobs.filter((job) => {
    if (activeTab === "fulltime") return job.job_type === "full-time";
    if (activeTab === "parttime") return job.job_type === "part-time";
    return true;
  });

  // Apply search filter
  if (searchTerm) {
    filteredJobs = filteredJobs.filter((job) =>
      `${job.job_title} ${job.company?.company_name}`
        .toLowerCase()
        .includes(searchTerm)
    );
  }

  // Sort logic
  if (sortBy === "date") {
    filteredJobs.sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));
  } else if (sortBy === "salaryHigh") {
    filteredJobs.sort(
      (a, b) => getMinSalary(b.payment_range) - getMinSalary(a.payment_range)
    );
  } else if (sortBy === "salaryLow") {
    filteredJobs.sort(
      (a, b) => getMinSalary(a.payment_range) - getMinSalary(b.payment_range)
    );
  }

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
              <i className="bi bi-geo-alt"></i> {job.company.city || "Unknown"}
            </div>
            <div>
              <i className="bi bi-clock"></i> {job.job_type}
            </div>
            <div>
              <i className="bi bi-cash"></i> {job.payment_range}
            </div>
          </div>
          <small className="text-muted">
            Posted on: {new Date(job.posted_at).toDateString()}
          </small>
        </div>
        <div className="col-12 col-sm-3 col-md-3 text-sm-end text-center">
          <Link
            to={`/jobDetails/${slugify(job.job_type)}-${slugify(
              job.job_title
            )}-${job.job_id}`}
            className="view-job-button"
          >
            View Job
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Banner
        title="Jobs That Match Your Talent."
        tagline="Browse jobs from top companies near you"
        showButtons={false}
        sectionClassName="custom-banner"
      />

      <section className="job-listings container p-5" data-aos="fade-up">
        <h2 className="mb-4">Job Listings</h2>

        {/* Search + Sort */}
        <div className="row mb-4 g-3">
          <div className="col-md-8">
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Type keywords (e.g. Software Engineer, Teacher)"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-0">
                <i className="bi bi-filter text-muted"></i>
              </span>
              <select
                className="form-select border-0"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="">Sort by</option>
                <option value="date">Date Posted</option>
                <option value="salaryHigh">Salary (High to Low)</option>
                <option value="salaryLow">Salary (Low to High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="text-center mb-4">
          <ul
            id="jobTabs"
            className="nav nav-tabs justify-content-center"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${
                  activeTab === "fulltime" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("fulltime");
                  setVisibleCount(5);
                }}
                type="button"
                role="tab"
              >
                Full Time
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${
                  activeTab === "parttime" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab("parttime");
                  setVisibleCount(5);
                }}
                type="button"
                role="tab"
              >
                Part Time
              </button>
            </li>
          </ul>
        </div>

        {/* Listings */}
        <div className="tab-content">
          <div className="tab-pane fade show active">
            {loading && (
              <div className="text-center spinner-container">
                <div className="spinner"></div>
              </div>
            )}
            {error && <p className="text-danger text-center">{error}</p>}
            {!loading && !error && filteredJobs.length === 0 && (
              <p className="text-muted text-center">
                No {activeTab.replace("time", "-time")} jobs available.
              </p>
            )}
            {!loading &&
              !error &&
              filteredJobs
                .slice(0, visibleCount)
                .map((job, index) => renderJobCard(job, index))}
          </div>
        </div>

        {/* Load More */}
        {!loading && !error && visibleCount < filteredJobs.length && (
          <div className="mt-4 text-center">
            <button onClick={handleLoadMore} className="browse-more-jobs">
              Load More Jobs
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default JobListings;
