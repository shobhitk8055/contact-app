import React, { useState } from "react";
import User from "./components/User";
import CreateUser from "./components/CreateUser";
import "./App.css";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useUserApi from "./hooks/useUserApi";
import UserListLoader from "./components/loaders/UserListLoader";

function App() {
  const { data, loading } = useUserApi();
  console.log(data, loading);
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-6 mx-auto mt-4">
          <div className="card">
            <div className="card-header">
              <h3 className="heading">Contact list</h3>
              <div>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#createUser"
                  className="btn btn-outline-primary"
                  type="button"
                >
                  Add User
                </button>
              </div>
            </div>
            <div className="card-body">
              {!loading ? (
                <>
                  {data.map((i, index) => (
                    <User key={index} user={i} />
                  ))}
                </>
              ) : (
                <UserListLoader />
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateUser />
      <ToastContainer />
    </div>
  );
}

export default App;
