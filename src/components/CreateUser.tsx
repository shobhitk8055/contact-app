import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { avatars } from "../constants/avatars";
import useInput from "../hooks/useInput";
import { ToastContainer, toast } from "react-toastify";
import User from "../types/User";
import { createUser, updateUser } from "../api/user";
import { v4 as uuid } from "uuid";
import BackdropLoader from "./loaders/BackdropLoader";

interface Props {
  onSuccess: (user: User) => void; //Created successfully
  onEditSuccess: (id: string, user: User) => void; //Edited successfully
  user?: User; //Current user
}

function CreateUser(props: Props) {
  const { onSuccess, onEditSuccess, user } = props;
  const [avatar, setAvatar] = useState<string>("user1");
  const [loading, setLoading] = useState<boolean>(false);
  const [flag, setFlag] = useState<string>("create");
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Hook for input forms
  const {
    value: nameValue,
    handleValue: handleNameValue,
    error: nameError,
    setError: setNameError,
    setValue: setNameValue,
  } = useInput();

  const {
    value: emailValue,
    handleValue: handleEmailValue,
    error: emailError,
    setError: setEmailError,
    setValue: setEmailValue,
  } = useInput();

  //Set avatar image 
  const handleAvatarChange = (icon: string) => () => {
    setAvatar(icon);
  };

  // Handle submit form (both create and edit)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      let formInvalid = false;
      if (!nameValue) {
        setNameError(true);
        formInvalid = true;
      }
      if (!emailValue) {
        setEmailError(true);
        formInvalid = true;
      }
      if (formInvalid) {
        setLoading(false);
        return;
      }
      const payload = { name: nameValue, email: emailValue, avatar };
      if (flag === "create") {
        await createUser(payload);
        const unique_id = uuid();
        const small_id = unique_id.slice(0, 8);
        const userData: User = { ...payload, id: small_id };
        onSuccess(userData);
        toast.success("User added successfully!");
      } else {
        if (user && user.id) {
          await updateUser(user.id, payload);
          onEditSuccess(user.id, payload);
          toast.success("User updated successfully!");
        }
      }
      resetForm();
      closeBtnRef?.current?.click();
    } finally {
      setLoading(false);
    }
  };

  // Reset the form
  const resetForm = () => {
    setNameValue("");
    setEmailValue("");
    setAvatar("user1");
  };

  useEffect(() => {
    if (user) {
      const { name, email, avatar } = user;
      setNameValue(name);
      setEmailValue(email);
      setAvatar(avatar);
      setFlag("edit");
    } else {
      setFlag("create");
      resetForm();
    }
  }, [user]);

  return (
    <>
      <div
        className="modal fade"
        id="createUser"
        tabIndex={-1}
        aria-labelledby="createUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {flag === "create" ? "Create User" : "Edit User"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={clsx(
                      "form-control",
                      nameError ? "is-invalid" : ""
                    )}
                    id="name"
                    aria-describedby="nameHelp"
                    value={nameValue}
                    onChange={handleNameValue}
                  />
                  {nameError && (
                    <p className="error-message">Name is required</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={clsx(
                      "form-control",
                      emailError ? "is-invalid" : ""
                    )}
                    id="email"
                    aria-describedby="nameHelp"
                    value={emailValue}
                    onChange={handleEmailValue}
                  />
                  {emailError && (
                    <p className="error-message">Email is required</p>
                  )}
                </div>
                <div className="mb-3 avatars">
                  <label className="form-label d-block">Choose Avatar</label>
                  <div className="avatar-images">
                    {Object.entries(avatars).map(([key, value]) => (
                      <div
                        key={key}
                        onClick={handleAvatarChange(key)}
                        className="image-wrapper"
                      >
                        <img src={value} className="choosen" />
                        {key === avatar && (
                          <div className="overlay">
                            <i className="fa-solid fa-check"></i>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <BackdropLoader open={loading} />
    </>
  );
}

export default CreateUser;
