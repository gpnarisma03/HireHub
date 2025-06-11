const categories = [
  { icon: "bi-headset", title: "Customer Service", vacancies: 1 },
  { icon: "bi-megaphone", title: "Sales and Communication", vacancies: 3 },
  {
    icon: "bi-journal-bookmark",
    title: "Teaching and Education",
    vacancies: 1,
  },
  { icon: "bi-people", title: "Human Resources", vacancies: 1 },
  // Repeated categories as per your original HTML
  { icon: "bi-headset", title: "Customer Service", vacancies: 1 },
  { icon: "bi-headset", title: "Customer Service", vacancies: 1 },
  { icon: "bi-headset", title: "Customer Service", vacancies: 1 },
  { icon: "bi-headset", title: "Customer Service", vacancies: 1 },
];

function ExploreCategories() {
  return (
    <section className="explore-category container p-5" data-aos="slide-up">
      <h2 className="mb-4 text-center">Explore By Category</h2>
      <div className="row g-4">
        {categories.map((category, index) => (
          <div className="col-12 col-sm-6 col-md-3" key={index}>
            <div className="card h-100 p-3 text-center">
              <i className={`bi ${category.icon} fs-1 mb-3`}></i>
              <div className="card-body">
                <h5 className="card-title">{category.title}</h5>
                <p className="card-text-vacancy">
                  {category.vacancies} Vacancy
                  {category.vacancies > 1 ? "ies" : "y"}
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
