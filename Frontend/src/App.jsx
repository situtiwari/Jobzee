import React, {useEffect, useContext} from "react";
import "./App.css";
import {Context} from "./main";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './components/home/home';
import Jobs from './components/job/jobs';
import JobDetails from './components/job/jobDetails';
import MyJobs from './components/job/myJobs';
import PostJobs from './components/job/postJobs';
import Application from './components/application/application';
import MyApplication from './components/application/myApplication';
import NotFound from './components/noFound/notFound';
import axios from "axios";
import {Toaster} from "react-hot-toast";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplication />} />
          <Route path="/job/post" element={<PostJobs />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;