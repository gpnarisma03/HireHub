import { Link } from "react-router-dom";

function Banner({ title, tagline, showButtons = true, sectionClassName = "" }) {
  return (
    <section
      className={`hero-banner text-white d-flex flex-column justify-content-center align-items-center text-center ${sectionClassName}`}
      data-aos="fade-up"
    >
      <div className="overlay"></div>
      <div className="hero-content position-relative z-2">
        <h1 className="title">{title}</h1>
        <p className="tag-line">{tagline}</p>

        {showButtons && (
          <div className="d-flex gap-3 justify-content-center flex-wrap mt-3">
            <Link to="/jobs" className="search-job-button px-4 py-2">
              Search a Job
            </Link>
            <Link to="/jobs" className="find-a-job-button px-4 py-2">
              Find a Talent
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Banner;
