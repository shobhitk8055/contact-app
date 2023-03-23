import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../api/user";
import IUser from "../types/User";
import BackdropLoader from "./loaders/BackdropLoader";

interface Props {
  user?: IUser;
  deleteSuccess: (id: string) => void;
}

const DeleteUser = (props: Props) => {
  const { user, deleteSuccess } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const onDelete = async () => {
    try {
      if (user && user.id) {
        setLoading(true);
        await deleteUser(user.id);
        deleteSuccess(user.id);
        closeBtnRef?.current?.click();
        toast.success("User updated successfully!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="deleteUser"
        tabIndex={-1}
        aria-labelledby="deleteUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you sure?
              </h5>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this user?
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
              <button
                type="button"
                onClick={onDelete}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <BackdropLoader open={loading} />
    </>
  );
};

export default DeleteUser;
