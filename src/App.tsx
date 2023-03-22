import React, { useEffect, useState } from "react";
import User from "./components/User";
import CreateUser from "./components/CreateUser";
import "./App.css";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useUserApi from "./hooks/useUserApi";
import UserListLoader from "./components/loaders/UserListLoader";
import IUser from "./types/User";
const rndInt = () => Math.floor(Math.random() * 8 + 1);

function App() {
  const { data, loading, setLoading } = useUserApi();
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    if (data) {
      const userList = data.map((i) => {
        i.avatar = `user${rndInt()}`;
        return i;
      });
      setUsers(userList);
    }
  }, [data]);

  const handleSuccess = (user: IUser) => {
    setLoading(true);
    setTimeout(() => {
      const userList = [...users];
      userList.unshift(user);
      setUsers(userList);
      setLoading(false);
    }, 300);
  };

  const handleEditSuccess = (id: string, payload: IUser) => {
    setLoading(true);
    setTimeout(() => {
      const userList = [...users];
      const user = userList.find(i => i.id === id);
      if(user){
        user.name = payload.name;
        user.email = payload.email;
        user.avatar = payload.avatar;
      }
      setUsers(userList);
      setLoading(false);
    }, 300);
  };

  const handleEdit = (user: IUser) => {
    setUser(user);
  };

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
                  onClick={() => setUser(undefined)}
                >
                  Add User
                </button>
              </div>
            </div>
            <div className="card-body">
              {!loading ? (
                <>
                  {users.map((i, index) => (
                    <User key={index} user={i} handleEdit={handleEdit} />
                  ))}
                </>
              ) : (
                <UserListLoader />
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateUser onEditSuccess={handleEditSuccess} user={user} onSuccess={handleSuccess} />
      <ToastContainer />
    </div>
  );
}

export default App;
