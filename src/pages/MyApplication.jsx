import { useEffect, useState } from "react";
import API from "../services/api";

function MyApplications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    try {

      const response = await API.get(
        `/applications/user/${user.id}`
      );

      setApplications(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div>
      <h2>My Applications</h2>

      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        applications.map((application) => (
          <div
            key={application.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px"
            }}
          >
            <p>
              <strong>Application ID:</strong>{" "}
              {application.id}
            </p>

            <p>
              <strong>Job ID:</strong>{" "}
              {application.jobId}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;