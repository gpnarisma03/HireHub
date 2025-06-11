function About() {
  return (
    <section
      className="about-section container p-5 mb-3 mt-md-1"
      data-aos="fade-up"
    >
      <div className="row align-items-center">
        {/* Left: Image Column */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={`${process.env.PUBLIC_URL}/images/image-1.jpg`}
            alt="About Us"
            className="img-fluid"
          />
        </div>

        {/* Right: Text Column */}
        <div className="col-md-6">
          <h3 className="mb-3">Connecting Talent with Opportunity</h3>
          <p>
            At HireHub, we believe every job seeker deserves the perfect
            opportunity, and every employer deserves the ideal candidate. Our
            platform bridges this gap by offering an intuitive and reliable
            hiring experience for both sides.
          </p>
          <ul className="list-unstyled">
            <li>
              <span>✔</span> Comprehensive job listings tailored to your skills
            </li>
            <li>
              <span>✔</span> Advanced tools to discover top talent quickly
            </li>
            <li>
              <span>✔</span> User-friendly platform designed for seamless hiring
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
