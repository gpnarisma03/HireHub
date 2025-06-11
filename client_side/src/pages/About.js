import AboutComponent from "../components/AboutComponent";
import Banner from "../components/Banner";

function About() {
  return (
    <>
      <Banner
        title="Our Mission. Your Future."
        tagline="Empowering people and organizations through meaningful connections
              and purpose-driven growth."
        showButtons={false}
      />
      <AboutComponent />
    </>
  );
}

export default About;
