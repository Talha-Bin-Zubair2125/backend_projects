import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // States for POST and GET
  let [name, setname] = useState("");
  let [fname, setfname] = useState("");
  let [course, setcourse] = useState("");
  let [semester, setsemester] = useState("");
  let [message, setmessage] = useState(""); // For responses
  let [data, setdata] = useState([]); // Fetched data

  // States for Update and Delete
  let [updatedata, setupdatedata] = useState(null);
  let [updated_name, setupdated_name] = useState("");
  let [updated_fname, setupdated_fname] = useState("");
  let [updated_course, setupdated_course] = useState("");
  let [updated_semester, setupdated_semester] = useState("");
  let [deletedata, setdeletedata] = useState(null);

  // POST Data
  let savedata = async () => {
    let students = {
      name: name,
      fathername: fname,
      course: course,
      semester: semester,
    };

    try {
      let data_to_backend = await axios.post(
        "http://localhost:3000/std/studentsdata",
        students
      );
      console.log(data_to_backend);
      setmessage("Student data saved successfully!");
      setTimeout(() => setmessage(""), 3000);
    } catch (error) {
      console.error(error);
      setmessage("Failed to save student data. Try again.");
      setTimeout(() => setmessage(""), 3000);
    }
  };

  // GET Data
  let data_from_backend = async () => {
    try {
      let data_from_backend = await axios.get(
        "http://localhost:3000/std/getstd"
      );
      console.log(data_from_backend.data);
      setdata(data_from_backend.data);
      setmessage("Data fetched successfully!");
      setTimeout(() => setmessage(""), 3000);
    } catch (error) {
      console.error(error);
      setmessage("Error fetching data from backend.");
      setTimeout(() => setmessage(""), 3000);
    }
  };

  // PATCH Data
  let updatedataofstudents = async (name) => {
    let updated_std_data = {
      name: updated_name,
      fathername: updated_fname,
      course: updated_course,
      semester: updated_semester,
    };
    console.log(updated_std_data);

    /*

      issue is in the colon (:) that i used only for Express route definitions, not when you call it from the frontend. frontend have to send the actual value
      `http://localhost:3000/std/updatestd/:${name}`
    */

    try {
      let updateddatatobackend = axios.patch(
        `http://localhost:3000/std/updatestd/${name}`,
        updated_std_data
      );
      console.log(updateddatatobackend);
      setmessage("Data Updated successfully!");
      setTimeout(() => setmessage(""), 3000);
    } catch (error) {
      console.error(error);
      setmessage("Error updating data from backend.");
      setTimeout(() => setmessage(""), 3000);
    }
  };

  // DELETE data
  let deletedataofstudents = async (name) => {
    try {
      let deldataofstd = axios.delete(
        `http://localhost:3000/std/delstddata/${name}`
      );
      console.log(deldataofstd);
      setmessage("Data Deleted successfully!");
      setTimeout(() => setmessage(""), 3000);
    } catch (error) {
      console.error(error);
      setmessage("Error Deleting data from backend.");
      setTimeout(() => setmessage(""), 3000);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Student Registration</h1>

      <div className="form-container">
        <input
          type="text"
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setname(e.target.value)}
          className="input-field"
        />

        <input
          type="text"
          value={fname}
          placeholder="Enter Your Father Name"
          onChange={(e) => setfname(e.target.value)}
          className="input-field"
        />

        <div className="form-row" style={{ display: "flex", gap: "15px" }}>
          <select
            value={course}
            onChange={(e) => setcourse(e.target.value)}
            className="dropdown"
            style={{ flex: 1 }}
          >
            <option value="">Select Course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Data Science">Data Science</option>
            <option value="Artifical Intelligence">
              Artifical Intelligence
            </option>
            <option value="BBA">BBA</option>
            <option value="Accounting & Finance">Accounting & Finance</option>
            <option value="English">English</option>
            <option value="Mass Communication">Mass Communication</option>
          </select>

          <select
            value={semester}
            onChange={(e) => setsemester(e.target.value)}
            className="dropdown"
            style={{ flex: 1 }}
          >
            <option value="">Select Semester</option>
            <option value="Semester#1">Semester #1</option>
            <option value="Semester#2">Semester #2</option>
            <option value="Semester#3">Semester #3</option>
            <option value="Semester#4">Semester #4</option>
            <option value="Semester#5">Semester #5</option>
            <option value="Semester#6">Semester #6</option>
            <option value="Semester#7">Semester #7</option>
            <option value="Semester#8">Semester #8</option>
          </select>
        </div>

        <div className="button-group">
          <button className="btn save" onClick={savedata}>
            Save Data
          </button>
          <button className="btn get" onClick={data_from_backend}>
            Get Data
          </button>
        </div>

        {/* Response Message */}
        {message && <p className="response-message">{message}</p>}
      </div>

      {/* Fetched Data in Form of Table */}
      {/* Fetched Data in Form of Table */}
      {data.length > 0 && (
        <div className="table-container">
          <h2 className="subtitle">Fetched Student Records</h2>

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Father Name</th>
                <th>Course</th>
                <th>Semester</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((std, index) => (
                <tr key={index}>
                  <td>{std.name}</td>
                  <td>{std.fathername}</td>
                  <td>{std.course}</td>
                  <td>{std.semester}</td>
                  <td>
                    <button onClick={() => setupdatedata(index)}>Update</button>

                    {updatedata === index && (
                      <div className="update-section">
                        <h3 className="subtitle">Update Student Data</h3>
                        <div className="form-container">
                          <input
                            type="text"
                            defaultValue={std.name}
                            placeholder="Original Name"
                            readOnly
                            className="input-field"
                          />

                          <input
                            type="text"
                            placeholder="Update Name"
                            value={updated_name}
                            onChange={(e) => setupdated_name(e.target.value)}
                            className="input-field"
                          />

                          <input
                            type="text"
                            placeholder="Update Father Name"
                            value={updated_fname}
                            onChange={(e) => setupdated_fname(e.target.value)}
                            className="input-field"
                          />

                          <div className="form-row">
                            <select
                              value={updated_course}
                              onChange={(e) =>
                                setupdated_course(e.target.value)
                              }
                              className="dropdown"
                            >
                              <option value="">Select Course</option>
                              <option value="Computer Science">
                                Computer Science
                              </option>
                              <option value="Software Engineering">
                                Software Engineering
                              </option>
                              <option value="Data Science">Data Science</option>
                              <option value="Artifical Intelligence">
                                Artifical Intelligence
                              </option>
                              <option value="BBA">BBA</option>
                              <option value="Accounting & Finance">
                                Accounting & Finance
                              </option>
                              <option value="English">English</option>
                              <option value="Mass Communication">
                                Mass Communication
                              </option>
                            </select>

                            <select
                              value={updated_semester}
                              onChange={(e) =>
                                setupdated_semester(e.target.value)
                              }
                              className="dropdown"
                            >
                              <option value="">Select Semester</option>
                              <option value="Semester#1">Semester #1</option>
                              <option value="Semester#2">Semester #2</option>
                              <option value="Semester#3">Semester #3</option>
                              <option value="Semester#4">Semester #4</option>
                              <option value="Semester#5">Semester #5</option>
                              <option value="Semester#6">Semester #6</option>
                              <option value="Semester#7">Semester #7</option>
                              <option value="Semester#8">Semester #8</option>
                            </select>
                          </div>

                          <div className="button-group">
                            <button
                              className="btn save"
                              onClick={() => {
                                updatedataofstudents(std.name);
                                setupdatedata(null);
                              }}
                            >
                              Save Update
                            </button>
                            <button
                              className="btn get"
                              onClick={() => setupdatedata(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>

                  <td>
                    <div>
                      <button onClick={() => setdeletedata(index)}>
                        Delete
                      </button>

                      {deletedata === index && (
                        <div className="delete-confirmation">
                          <input
                            type="text"
                            placeholder="Name to Delete"
                            defaultValue={std.name}
                            readOnly
                            className="input-field"
                          />
                          <div className="button-group">
                            <button
                              className="btn save"
                              onClick={() => {
                                deletedataofstudents(std.name);
                                setdeletedata(null);
                              }}
                            >
                              Confirm Delete
                            </button>
                            <button
                              className="btn get"
                              onClick={() => setdeletedata(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
