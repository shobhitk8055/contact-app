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
import DeleteUser from "./components/DeleteUser";
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

  // User is successfully created in the server
  const handleSuccess = (user: IUser) => {
    setLoading(true);
    setTimeout(() => {
      const userList = [...users];
      userList.unshift(user);
      setUsers(userList);
      setLoading(false);
    }, 300);
  };

  // User is successfully edited in the server
  const handleEditSuccess = (id: string, payload: IUser) => {
    setLoading(true);
    setTimeout(() => {
      const userList = [...users];
      const user = userList.find((i) => i.id === id);
      if (user) {
        user.name = payload.name;
        user.email = payload.email;
        user.avatar = payload.avatar;
      }
      setUsers(userList);
      setUser(undefined);
      setLoading(false);
    }, 300);
  };

  // For handling edit modal and delete modal
  const setCurrentUser = (user: IUser) => {
    setUser(user);
  };

  // When user is succesfully delete from the database
  const deleteSuccess = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      let userList = [...users];
      userList = userList.filter((i) => i.id !== id);
      setUsers(userList);
      setLoading(false);
    }, 300);
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
                    <User
                      key={index}
                      user={i}
                      setCurrentUser={setCurrentUser}
                    />
                  ))}
                </>
              ) : (
                <UserListLoader />
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateUser
        onEditSuccess={handleEditSuccess}
        user={user}
        onSuccess={handleSuccess}
      />
      <ToastContainer />
      <DeleteUser user={user} deleteSuccess={deleteSuccess} />
    </div>
  );
}

export default App;
