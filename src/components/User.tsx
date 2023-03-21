import React from "react";
import IUser from "../types/User";
import AvatarImage from "./AvatarImage";

interface Props {
  user: IUser;
  handleEdit: (user: IUser) => void;
}

function User(props: Props) {
  const { user, handleEdit } = props;

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
          onClick={() => handleEdit(user)}
          title="Edit"
        >
          <i className="fa-solid fa-pen"></i>
        </span>
        <span title="Delete">
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>
    </div>
  );
}

export default User;
