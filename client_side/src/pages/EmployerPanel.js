import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function EmployerPanel() {
  const { user } = useContext(AuthContext);
  const logoBaseUrl = `${process.env.REACT_APP_API_BASE_URL}/storage/`;

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    company_details: "",
    company_logo: null,
    preview: null,
    street: "",
    city: "",
    region: "",
    zip_code: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "company_logo") {
      const file = files[0];
      setForm({
        ...form,
        company_logo: file,
        preview: file ? URL.createObjectURL(file) : null,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("company_name", form.company_name);
    formData.append("company_details", form.company_details);
    formData.append("street", form.street);
    formData.append("city", form.city);
    formData.append("region", form.region);
    formData.append("zip_code", form.zip_code);

    if (form.company_logo) {
      formData.append("company_logo", form.company_logo);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/company`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Company created successfully!");
        window.location.reload();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        alert(
          "Validation failed:\n" +
            Object.entries(validationErrors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("\n")
        );
      } else if (error.response?.status === 401) {
        alert("Unauthorized. Please log in again.");
      } else {
        console.error("Unexpected error:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container p-5">
      <h2 className="mb-4">Employer Panel</h2>

      <h4 className="mb-3">Your Company</h4>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Logo</th>
              <th>Company Name</th>
              <th>Details</th>
              <th>Location</th>
              <th style={{ whiteSpace: "nowrap" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {user?.companies && user.companies.length > 0 ? (
              user.companies.map((company) => (
                <tr key={company.company_id}>
                  <td>
                    <img
                      src={`${logoBaseUrl}${company.company_logo}`}
                      alt="Company Logo"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                      className="rounded"
                    />
                  </td>
                  <td>{company.company_name}</td>
                  <td>{company.company_details}</td>
                  <td>
                    {company.street}, {company.city}, {company.region},{" "}
                    {company.zip_code}
                  </td>
                  <td className="text-nowrap">
                    <div className="btn-group gap-2" role="group">
                      <Link
                        to={`/employer/company/${company.company_id}`}
                        className="manage-company-btn"
                      >
                        View
                      </Link>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No Company Profile Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-end mt-3">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add New Company
        </button>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Create Company Profile</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      name="company_name"
                      className="form-control"
                      value={form.company_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Company Logo</label>
                    <input
                      type="file"
                      name="company_logo"
                      className="form-control"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    {form.preview && (
                      <img
                        src={form.preview}
                        alt="Preview"
                        className="img-thumbnail mt-2"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Company Details</label>
                    <textarea
                      name="company_details"
                      className="form-control"
                      rows="3"
                      value={form.company_details}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Street</label>
                    <input
                      type="text"
                      name="street"
                      className="form-control"
                      value={form.street}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Region</label>
                    <input
                      type="text"
                      name="region"
                      className="form-control"
                      value={form.region}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Zip Code</label>
                    <input
                      type="text"
                      name="zip_code"
                      className="form-control"
                      value={form.zip_code}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Company
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerPanel;
