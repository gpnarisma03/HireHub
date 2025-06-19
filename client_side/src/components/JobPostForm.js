import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UseJobCategories from "../hooks/UseJobCategories";

function JobPostForm({ onSuccess }) {
  const { company_id } = useParams();
  const { categories } = UseJobCategories();

  const [form, setForm] = useState({
    category_id: "",
    job_title: "",
    job_description: "",
    job_qualifications: "",
    job_responsibilities: "",
    job_type: "full-time",
    job_vacancy: "",
    payment_min: "",
    payment_max: "",
    date_start: "",
    status: "open", // ✅ Add default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const formatPeso = (value) =>
    "₱" + parseInt(value || 0).toLocaleString("en-PH");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payment_range = `${formatPeso(form.payment_min)} - ${formatPeso(
      form.payment_max
    )}`;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/jobs`,
        {
          ...form,
          job_vacancy: parseInt(form.job_vacancy),
          payment_range,
          company_id: company_id, // ✅ use from params
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Job posted successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  // ... rest of the JSX (unchanged)

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Job Title</label>
        <input
          type="text"
          name="job_title"
          className="form-control"
          value={form.job_title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Category</label>
        <select
          name="category_id"
          className="form-select"
          value={form.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12">
        <label className="form-label">Job Description</label>
        <textarea
          name="job_description"
          className="form-control"
          value={form.job_description}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
      <div className="col-12">
        <label className="form-label">Qualifications</label>
        <textarea
          name="job_qualifications"
          className="form-control"
          value={form.job_qualifications}
          onChange={handleChange}
          rows="2"
        ></textarea>
      </div>
      <div className="col-12">
        <label className="form-label">Responsibilities</label>
        <textarea
          name="job_responsibilities"
          className="form-control"
          value={form.job_responsibilities}
          onChange={handleChange}
          rows="2"
        ></textarea>
      </div>
      <div className="col-md-4">
        <label className="form-label">Job Type</label>
        <select
          name="job_type"
          className="form-select"
          value={form.job_type}
          onChange={handleChange}
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label">Vacancy</label>
        <input
          type="number"
          name="job_vacancy"
          className="form-control"
          value={form.job_vacancy}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          name="date_start"
          className="form-control"
          value={form.date_start}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Payment Range (Min)</label>
        <input
          type="number"
          name="payment_min"
          className="form-control"
          value={form.payment_min}
          onChange={handleChange}
          placeholder="e.g. 25000"
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Payment Range (Max)</label>
        <input
          type="number"
          name="payment_max"
          className="form-control"
          value={form.payment_max}
          onChange={handleChange}
          placeholder="e.g. 35000"
          required
        />
      </div>

      <div className="col-12 text-end">
        <button type="submit" className="btn btn-primary">
          Post Job
        </button>
      </div>
    </form>
  );
}

export default JobPostForm;
