import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  createContext,
} from "react";
import { callApi } from "../utils";

const CurrentUserStateContext = createContext();
const CurrentUserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.user, isAuthenticated: true };
    case "LOGOUT":
      return { isAuthenticated: false };
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { isAuthenticated: false });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await callApi("/users/me", "GET");
      if (user.id) {
        dispatch({ type: "LOGIN", user });
        setIsLoading(false);

        return;
      }
    };

    console.log("USER ME");
    setIsLoading(true);

    setTimeout(() => {
      fetchUser();
    }, 1000);
  }, []);

  const { isAuthenticated, ...user } = state;

  return (
    <CurrentUserDispatchContext.Provider value={dispatch}>
      <CurrentUserStateContext.Provider
        value={{ isLoading, isAuthenticated, user }}
      >
        {children}
      </CurrentUserStateContext.Provider>
    </CurrentUserDispatchContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserStateContext);
export const useDispatchCurrentUser = () =>
  useContext(CurrentUserDispatchContext);
