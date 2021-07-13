import { useState, useEffect } from "react";
import { callApi } from "../utils";
import Loading from "../elements/Loading";

function useLogo() {
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getLogoFromStrapi() {
      try {
        const data = await callApi("/logo", "GET");

        if (data.error) {
          throw data;
        }

        setLogo(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      getLogoFromStrapi();
    }, 2000);
  }, []);

  return { isLoading, logo, error };
}

export default useLogo;
