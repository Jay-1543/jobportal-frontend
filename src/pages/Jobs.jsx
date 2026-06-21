import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Jobs() {

  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const response = await API.get("/jobs");

      setJobs(response.data);

    } catch (error) {

      console.error(
        "Error fetching jobs:",
        error
      );
    }
  };

  const applyJob = async (jobId) => {

    const currentUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!currentUser) {

      alert("Please login first");

      navigate("/login");

      return;
    }

    try {

      await API.post("/applications", {
        userId: currentUser.id,
        jobId: jobId
      });

      alert("Applied Successfully");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Already Applied"
      );

      console.error(error);
    }
  };

  const deleteJob = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await API.delete(`/jobs/${id}`);

      alert("Job Deleted Successfully");

      fetchJobs();

    } catch (error) {

      console.error(error);

      alert("Delete Failed");
    }
  };

  return (
    <div>

      <h2>Available Jobs</h2>

      {jobs.length === 0 ? (

        <p>No jobs available</p>

      ) : (

        jobs.map((job) => (

          <div
            key={job.id}
            className="job-card"
          >

            <h3>{job.title}</h3>

            <p>
              <strong>Company:</strong>{" "}
              {job.company}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {job.location}
            </p>

            <p>
              <strong>Salary:</strong>{" "}
              ₹{job.salary}
            </p>

            <p>{job.description}</p>

            {user?.role === "ADMIN" ? (

              <div>

                <button
                  onClick={() =>
                    navigate(
                      `/edit-job/${job.id}`
                    )
                  }
                  style={{
                    marginRight: "10px"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteJob(job.id)
                  }
                >
                  Delete
                </button>

              </div>

            ) : (

              <button
                onClick={() =>
                  applyJob(job.id)
                }
              >
                Apply Now
              </button>

            )}

          </div>
        ))
      )}

    </div>
  );
}

export default Jobs;