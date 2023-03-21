import clsx from "clsx";
import React, { useRef, useState } from "react";
import { avatars } from "../constants/avatars";
import useInput from "../hooks/useInput";
import { ToastContainer, toast } from "react-toastify";
import User from "../types/User";
import { createUser } from "../api/user";
import { v4 as uuid } from "uuid";
import BackdropLoader from "./loaders/BackdropLoader";

interface Props {
  handleSuccess: (user: User) => void;
  user: User;
}

function CreateUser(props: Props) {
  const { handleSuccess, user } = props;
  const [avatar, setAvatar] = useState<string>("user1");
  const [loading, setLoading] = useState<boolean>(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const {
    value: nameValue,
    handleValue: handleNameValue,
    error: nameError,
    setError: setNameError,
  } = useInput();

  const {
    value: emailValue,
    handleValue: handleEmailValue,
    error: emailError,
    setError: setEmailError,
  } = useInput();

  const handleAvatarChange = (icon: string) => () => {
    setAvatar(icon);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    try {
      e.stopPropagation();
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
      await createUser(payload);
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      const user: User = { ...payload, id: small_id };
      handleSuccess(user);
      closeBtnRef?.current?.click();
    } finally {
      setLoading(false);
    }
  };

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
                  Create User
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
      <BackdropLoader show={loading} />
    </>
  );
}

export default CreateUser;
