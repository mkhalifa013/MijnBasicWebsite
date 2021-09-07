import { useState, useEffect } from "react";
import { callApi } from "../utils";
import { useCurrentUser } from "../Context/CurrentUser";

function useUser(defaultState, triggerDeleteInHeader) {
  const [user, setUser] = useState(defaultState);
  const [error, setError] = useState(null);
  const { retriggerGetUser } = useCurrentUser();

  /* Retrieve data from Strapi / And Set in state */
  useEffect(() => {
    async function getData() {
      try {
        const data = await callApi("/users/me", "GET");

        if (data.error) {
          throw data;
        }

        setUser(data);
      } catch (error) {
        setError(error);
      }
    }
      getData();
  }, []);

  const deleteProfilePicture = async (profi) => {
    // DELETE request using fetch with async/await
    await callApi(`upload/files/${profi}`, "DELETE");

    retriggerGetUser()
  };

 

  return { user, error, deleteProfilePicture };
}

export default useUser;
