import React from "react";
import useJobCategories from "../hooks/UseJobCategories";

function ExploreCategories() {
  const { categories, loading, error } = useJobCategories();

  return (
    <section className="explore-category container p-5" data-aos="slide-up">
      <h2 className="mb-4 text-center">Explore By Category</h2>

      {loading && (
        <div className="text-center spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      {error && <div className="text-danger text-center">{error}</div>}

      <div className="row g-4">
        {!loading && categories.length === 0 && (
          <div className="text-center text-muted w-100">No Job Categories</div>
        )}

        {categories
          .slice()
          .sort((a, b) => a.category_name.localeCompare(b.category_name))
          .map((category) => (
            <div
              className="col-12 col-sm-6 col-md-3"
              key={category.category_id}
            >
              <div className="card h-100 p-3 text-center">
                {category.category_logo ? (
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/storage/${category.category_logo}`}
                    alt={category.category_name}
                    className="mb-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <i className="bi bi-folder fs-1 mb-3"></i>
                )}
                <div className="card-body">
                  <h5 className="card-title">{category.category_name}</h5>
                  <p className="card-text-vacancy">
                    {category.open_jobs_sum_job_vacancy || 0} Vacanc
                    {(category.open_jobs_sum_job_vacancy || 0) > 1
                      ? "ies"
                      : "y"}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default ExploreCategories;
