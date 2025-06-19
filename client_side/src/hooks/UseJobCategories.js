import { useEffect, useState } from "react";
import axios from "axios";

function useJobCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/jobCategory`)
      .then((response) => {
        if (response.data.success) {
          setCategories(response.data.categories);
          console.log("Fetched categories:", response.data);
        } else {
          console.error("Fetch failed:", response.data);
          setError("Failed to fetch categories.");
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Something went wrong.");
      })
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}

export default useJobCategories;
