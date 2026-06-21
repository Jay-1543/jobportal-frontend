import { useState } from "react";
import API from "../services/api";

function AddJob() {

  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    salary: "",
    location: ""
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/jobs", job);

      alert("Job Added Successfully");

      setJob({
        title: "",
        company: "",
        description: "",
        salary: "",
        location: ""
      });

    } catch (error) {

      console.error(error);
      alert("Failed to Add Job");

    }
  };

  return (
    <div className="card">

      <h2>Add Job</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={job.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Job
        </button>

      </form>

    </div>
  );
}

export default AddJob;