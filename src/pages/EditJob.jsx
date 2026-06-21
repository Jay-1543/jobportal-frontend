import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    salary: "",
    location: ""
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {

    try {

      const response = await API.get("/jobs");

      const selectedJob = response.data.find(
        (j) => j.id === id
      );

      if (selectedJob) {
        setJob(selectedJob);
      }

    } catch (error) {

      console.error(error);

    }
  };

  const handleChange = (e) => {

    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.put(`/jobs/${id}`, job);

      alert("Job Updated Successfully");

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Update Failed");
    }
  };

  return (
    <div className="card">

      <h2>Edit Job</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />

        <input
          type="text"
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company"
          required
        />

        <input
          type="text"
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <input
          type="number"
          name="salary"
          value={job.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />

        <input
          type="text"
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />

        <button type="submit">
          Update Job
        </button>

      </form>

    </div>
  );
}

export default EditJob;