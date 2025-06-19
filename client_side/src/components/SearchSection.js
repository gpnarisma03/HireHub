import React, { useState } from "react";
import useJobCategories from "../hooks/UseJobCategories";
import useJobs from "../hooks/UseJobs"; // Import the jobs hook

function SearchSection() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useJobCategories();
  const { jobs, loading: jobsLoading, error: jobsError } = useJobs();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Extract unique cities from jobs
  const uniqueCities = Array.from(
    new Set(
      (jobs || [])
        .filter((job) => job?.company?.city)
        .map((job) => job.company.city)
    )
  ).sort((a, b) => a.localeCompare(b));

  return (
    <section
      className="search-section py-4 px-3 px-md-5 position-relative z-2"
      data-aos="fade-down"
    >
      <div className="section-container bg-white p-4">
        <form
          className="row g-3 align-items-center justify-content-center"
          onSubmit={handleSubmit}
        >
          {/* Keyword Input */}
          <div className="col-12 col-md-4">
            <label htmlFor="keyword" className="form-label visually-hidden">
              Keyword
            </label>
            <div className="input-group">
              <span className="input-group-text border-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-0"
                id="keyword"
                placeholder="Job title, keywords..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="col-12 col-md-3">
            <label htmlFor="category" className="form-label visually-hidden">
              Category
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-0">
                <i className="bi bi-layers"></i>
              </span>
              <select
                className="form-select border-0"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All Categories</option>
                {categoriesLoading ? (
                  <option disabled>Loading...</option>
                ) : categoriesError ? (
                  <option disabled>Error loading categories</option>
                ) : (
                  categories
                    .slice()
                    .sort((a, b) =>
                      a.category_name.localeCompare(b.category_name)
                    )
                    .map((cat) => (
                      <option key={cat.category_id} value={cat.category_name}>
                        {cat.category_name}
                      </option>
                    ))
                )}
              </select>
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="col-12 col-md-3">
            <label htmlFor="location" className="form-label visually-hidden">
              Location
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-0">
                <i className="bi bi-geo-alt"></i>
              </span>
              <select
                className="form-select border-0"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All Locations</option>
                {jobsLoading ? (
                  <option disabled>Loading...</option>
                ) : jobsError ? (
                  <option disabled>Error loading jobs</option>
                ) : (
                  uniqueCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="col-12 col-md-2 d-grid">
            <button type="submit" className="btn search-job-button">
              <i className="bi bi-search me-2"></i>Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchSection;
