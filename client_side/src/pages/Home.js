import Banner from "../components/Banner";
import ExploreCategories from "../components/ExploreCategories";
import About from "../components/AboutComponent";
import JobListings from "../components/JobListings";
function Home() {
  return (
    <div>
      <Banner
        title="Where Careers Begin and Companies Grow."
        tagline="Connecting talent to the future of work."
      />
      <ExploreCategories />
      <About />
      <JobListings />
    </div>
  );
}

export default Home;
