import { useState } from "react";

const useFetching = (callback: Function): [Function, boolean, string] => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetching = async (...data: any) => {
    try {
      const response = await callback(...data);

      if (typeof response !== "object") {
        throw Error(response);
      }
    } catch (mesError: any) {
      setError(mesError.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};

export default useFetching;
