import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostJobs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios.post("http://127.0.0.1:4000/api/v1/job/postJobs", fixedSalary.length >= 4 ?
      {title, category, country, city, location, fixedSalary, description} :
      {title, category, country, city, location, salaryFrom, salaryTo, description},

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res => toast.success(res.data.message))
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const navigateTo = useNavigate()
  if (!isAuthorized || (user && user.role !== "Job Employer")) {
    navigateTo("/");
  }
  return (
    <>
      <div className="job_post">
        <div className="container">
          <h3>Post New Job</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input type="text" value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Job Title' />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Catefory</option>
                <option value="Mobile App Developement">Mobile App Developement</option>
                <option value="MERN Stack Developement">MERN Stack Developement</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Video Animation">Video Animation</option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Data Entry Operator">Data Entry Operator</option>
                <option value="HR Operation">HR Operation</option>
              </select>
            </div>
            <div className="wrapper">
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Job Country" />
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Job City" />
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Job Location" />
            </div>
            <div className="salary_wrapper">
              <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                <option value="default"></option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>

              <div>
                {
                  salaryType === "default" ? (<p>Please provide salary Type</p>) :
                    salaryType === "Fixed Salary" ? (<input type='number' placeholder='Enter Fixed Salary'
                      value={fixedSalary} onChange={(e) =>
                        setFixedSalary(e.target.value)} />
                    ) : (
                      <div className="ranged_salary">
                        <input type="number" placeholder='Salary From'
                          value={salaryFrom} onChange={(e) =>
                            setSalaryFrom(e.target.value)} />

                        <input type="number" placeholder='Salary To'
                          value={salaryTo} onChange={(e) =>
                            setSalaryTo(e.target.value)} />
                      </div>
                    )
                }
              </div>
            </div>

            <textarea rows="10" value={description}
              onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <button type='submit'>Create Job</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PostJobs
