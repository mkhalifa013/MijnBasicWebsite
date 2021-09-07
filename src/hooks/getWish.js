import { useState, useEffect } from "react";
import { callApi } from "../utils";
import useUser from "./getuser";


function useWish(defaultState) {
  const { user, error,} = useUser([defaultState]);
  const [wish, setWish] = useState([defaultState]);


  /* Retrieve data from Strapi / And Set in state */
  useEffect(() => {
    async function getDat() {
      try {
        const res = await callApi(`/wishlists/${user.wishlist}`, "GET");

        if (res.error) {
          throw res;
        }

        setWish(res);
      } catch (error) {
        
      }
    }
      getDat();
  }, []);

 

  return { wish, error,};
}

export default useWish;
