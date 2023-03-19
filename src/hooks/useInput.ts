import React, { useState } from "react";

function useInput() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setValue(e.target.value);
  };
  return { value, handleValue, error, setError };
}

export default useInput;
