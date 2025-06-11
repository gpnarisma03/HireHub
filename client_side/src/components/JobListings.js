import { useState } from "react";
import { Link } from "react-router-dom";
const jobsData = {
  fulltime: [
    {
      title: "Software Engineer",
      location: "Quezon City, PH",
      type: "Full Time",
      salary: "₱70,000 - ₱90,000",
      datePosted: "May 25, 2025",
      image: "business-logo-5.jpg",
    },
    {
      title: "Math Teacher",
      location: "Bulacan City, PH",
      type: "Full Time",
      salary: "₱70,000 - ₱90,000",
      datePosted: "May 25, 2025",
      image: "business-logo-4.jpg",
    },
    {
      title: "Jr. Web Developer",
      location: "Caloocan City, PH",
      type: "Full Time",
      salary: "₱70,000 - ₱90,000",
      datePosted: "May 25, 2025",
      image: "business-logo-3.png",
    },
    {
      title: "Marketing Manager",
      location: "Tuguegarao City, PH",
      type: "Full Time",
      salary: "₱70,000 - ₱90,000",
      datePosted: "May 25, 2025",
      image: "business-logo-2.jpg",
    },
    {
      title: "Product Designer",
      location: "Caloocan City, PH",
      type: "Full Time",
      salary: "₱70,000 - ₱90,000",
      datePosted: "May 25, 2025",
      image: "business-logo-1.jpg",
    },
  ],
  parttime: [
    {
      title: "Product Designer",
      location: "Caloocan City, PH",
      type: "Part Time",
      salary: "₱70,000 - ₱90,000",
      datePosted: "May 25, 2025",
      image: "business-logo-1.jpg",
    },
  ],
};

function JobListings() {
  const [activeTab, setActiveTab] = useState("fulltime");

  const renderJobCard = (job, index) => (
    <div className="card mb-3 p-3 job-listings-card" key={index}>
      <div className="row align-items-center g-3">
        <div className="col-12 col-sm-2 col-md-1 text-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/${job.image}`}
            alt={job.title}
            className="img-fluid company-logo"
          />
        </div>
        <div className="col-12 col-sm-7 col-md-8">
          <h5 className="mb-2">{job.title}</h5>
          <div
            className="d-flex flex-wrap gap-3 text-muted mb-2"
            style={{ fontSize: "0.9rem" }}
          >
            <div>
              <i className="bi bi-geo-alt"></i> <span>{job.location}</span>
            </div>
            <div>
              <i className="bi bi-clock"></i> <span>{job.type}</span>
            </div>
            <div>
              <i className="bi bi-cash"></i> <span>{job.salary}</span>
            </div>
          </div>
          <small className="text-muted">Posted on: {job.datePosted}</small>
        </div>
        <div className="col-12 col-sm-3 col-md-3 text-sm-end text-center">
          <Link to="/jobs" className="view-job-button">
            View Job
          </Link>
        </div>
      </div>
    </div>
  );

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
          {jobsData[activeTab].map((job, index) => renderJobCard(job, index))}
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

export default JobListings;
