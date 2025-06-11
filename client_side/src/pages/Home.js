import Banner from "../components/Banner";
import SearchSection from "../components/SearchSection";
import ExploreCategories from "../components/ExploreCategories";
import About from "../components/AboutComponent";
import FeatureJobs from "../components/FeatureJobs";
function Home() {
  return (
    <div>
      <Banner
        title="Where Careers Begin and Companies Grow."
        tagline="Connecting talent to the future of work."
      />
      <SearchSection />
      <ExploreCategories />
      <About />
      <FeatureJobs />
    </div>
  );
}

export default Home;
