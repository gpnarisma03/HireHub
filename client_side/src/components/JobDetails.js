import React from "react";
import { useParams } from "react-router-dom";
import UseJobs from "../hooks/UseJobs"; // Make sure this hook fetches all jobs

import Banner from "./Banner";

function JobDetails() {
  const { jobSlug } = useParams();
  const jobId = jobSlug.split("-")[0];

  const { jobs, loading, error } = UseJobs();
  const job = jobs.find((job) => job.job_id.toString() === jobId);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center mt-5 text-danger">
        Job not found or an error occurred.
      </div>
    );
  }

  return (
    <>
      <Banner
        title="Your Next Role Starts Here."
        tagline="See what makes this opportunity the right fit for you."
        showButtons={false}
        sectionClassName="job-details"
      />

      <section className="job-details container mt-4" data-aos="fade-down">
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-md-8">
            <div className="mb-3 p-5 job-listings-card">
              {/* Header */}
              <div className="row align-items-center g-3 mb-3">
                <div className="col-12 col-sm-2 col-md-2 d-flex align-items-center justify-content-center">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/storage/${job.company?.company_logo}`}
                    alt={job.title}
                    className="company-logo"
                  />
                </div>

                <div className="col-12 col-sm-10 col-md-10">
                  <h5 className="mb-2 fw-bold">{job.job_title}</h5>
                  <div
                    className="d-flex flex-wrap gap-3 text-muted mb-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <div>
                      <i className="bi bi-geo-alt"></i>{" "}
                      <span>{job.company?.city}, PH</span>
                    </div>
                    <div>
                      <i className="bi bi-clock"></i>{" "}
                      <span>{job.job_type}</span>
                    </div>
                    <div>
                      <i className="bi bi-cash"></i>{" "}
                      <span>{job.payment_range}</span>
                    </div>
                  </div>
                  <small className="text-muted">
                    Posted on: {new Date(job.posted_at).toLocaleDateString()}
                  </small>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-3">
                <h5 className="fw-bold">Job Description</h5>
                <p>{job.job_description}</p>
              </div>

              {/* Responsibilities */}
              <div className="mb-3">
                <h5 className="fw-bold">Responsibilities</h5>
                <ul>
                  {job.job_responsibilities?.split("\n").map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Qualifications */}
              <div className="mb-3">
                <h5 className="fw-bold">Qualifications</h5>
                <ul>
                  {job.job_qualifications?.split("\n").map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Apply Section */}
              <div className="border-top pt-3">
                <h5>Apply for this Job</h5>
                <form>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Your message or cover letter... (optional)"
                    ></textarea>
                  </div>
                  <div className="mb-3 d-flex align-items-center gap-3 flex-wrap">
                    <button type="submit" className="apply-now-button">
                      Apply Now
                    </button>
                    <input
                      type="file"
                      className="form-control"
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-4">
            <div className="p-5">
              <div className="job-summary-side p-3 mb-4">
                <h4>Job Summary</h4>
                <ul>
                  <li>
                    Published on: {new Date(job.posted_at).toLocaleDateString()}
                  </li>
                  <li>Vacancy: {job.job_vacancy}</li>
                  <li>Job Type: {job.job_type}</li>
                  <li>Salary: {job.payment_range}</li>
                  <li>Location: {job.company?.city}</li>
                  <li>
                    Start Date:{" "}
                    {job.date_start
                      ? new Date(job.date_start).toLocaleDateString()
                      : "TBD"}
                  </li>
                </ul>
              </div>
              <div className="job-summary-side p-3">
                <h4>Company Details</h4>
                <p>
                  {job.company?.company_details || "No company info provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default JobDetails;
