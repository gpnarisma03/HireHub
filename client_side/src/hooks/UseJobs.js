import { useEffect, useState } from "react";
import axios from "axios";

const UseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/jobs`)
      .then((response) => {
        const jobList = response.data.jobs;

        setJobs(jobList);
      })
      .catch((err) => {
        setError("Failed to fetch jobs.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { jobs, loading, error };
};

export default UseJobs;
