import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function UserLoader() {
  return (
    <div className="d-flex">
      <Skeleton variant="circular" width={70} height={70} />
      <Stack spacing={1}>
        <div className="d-flex flex-column ms-4 mt-2">
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={200} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
      </Stack>
      <div className="actions-loader">
        <Skeleton
          variant="text"
          width={40}
          height={60}
          sx={{ marginLeft: "5px" }}
        />
        <Skeleton
          variant="text"
          width={40}
          height={60}
          sx={{ marginLeft: "5px" }}
        />
      </div>
    </div>
  );
}
export default function UserListLoader() {
  return (
    <Stack spacing={1}>
      <UserLoader />
      <UserLoader />
      <UserLoader />
      <UserLoader />
      <UserLoader />
      <UserLoader />
      <UserLoader />
      <UserLoader />
      {/* <Skeleton variant="rounded" width={210} height={60} /> */}
    </Stack>
  );
}
