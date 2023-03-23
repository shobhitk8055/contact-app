import React from "react";
import IUser from "../types/User";
import AvatarImage from "./AvatarImage";

interface Props {
  user: IUser; // Current user
  setCurrentUser: (user: IUser) => void; //Sets this user as current for edit and delete
}

function User(props: Props) {
  const { user, setCurrentUser } = props;

  return (
    <div className="user-card">
      <AvatarImage image={user.avatar} />
      <div className="names">
        <p className="name">{user.name}</p>
        <p className="mb-0">{user.email}</p>
      </div>
      <div className="actions">
        <span
          data-bs-toggle="modal"
          data-bs-target="#createUser"
          onClick={() => setCurrentUser(user)}
          title="Edit"
        >
          <i className="fa-solid fa-pen"></i>
        </span>
        <span
          data-bs-toggle="modal"
          data-bs-target="#deleteUser"
          title="Delete"
          onClick={() => setCurrentUser(user)}
        >
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>
    </div>
  );
}

export default User;
