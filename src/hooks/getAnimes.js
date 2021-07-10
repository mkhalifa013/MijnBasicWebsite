import { useState, useEffect } from "react";
import { callApi } from "../utils";

function useAnimes(defaultState) {
  const [animes, setAnimes] = useState(defaultState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* Retrieve data from Strapi / And Set in state */
  useEffect(() => {
    async function getData() {
      try {
        const data = await callApi("/animes", "GET");

        if (data.error) {
          throw data;
        }

        setAnimes(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      getData();
    }, 3000);
  }, []);

  // Remove data from Strapi server
  const removeAnime = async (id) => {
    // DELETE request using fetch with async/await
    await callApi(`animes/${id}`, "DELETE");
    removeAnimeFromReactState(id);
  };

  // Filter deleted anime from local state in browser.
  const removeAnimeFromReactState = (id) => {
    // Make copy of current animes in react state
    const oldAnimeArray = animes;

    // Create new array with anime to be deleted filtered away from the new array
    const newAnimeArray = oldAnimeArray.filter((anime) => anime.id !== id);

    // Update local react state with new array
    setAnimes(newAnimeArray);
  };

  return { isLoading, animes, removeAnime, error };
}

export default useAnimes;
