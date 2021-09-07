import React, { useEffect, useRef, useState } from "react";
import { useCurrentUser, useDispatchCurrentUser } from "../Context/CurrentUser";
import { useHistory } from "react-router-dom";
import { callApi } from "../utils";

//een simple pagina
const Login = () => {
  const dispatch = useDispatchCurrentUser();
  const currentUser = useCurrentUser();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (currentUser.isAuthenticated) {
      history.push("/overzicht");
    }
  }, [currentUser, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const data = await callApi("/auth/local", "POST",{
        identifier: emailRef.current.value,
        password: passwordRef.current.value,
      },false);

      if (!data.user) {
        throw "Cannot login. Please try again.";
      }

      dispatch({ type: "LOGIN", user: data.user });
      history.push("/overzicht");
    } catch (err) {
      setErrorMsg(err);
    }
  };

  return (
    <div className="mt-5 mb-5 row align-items-center g-lg-5 container">
      <div className="col-lg-7 text-center text-lg-start">
        <h1 className="display-4 fw-bold lh-1 mb-3">
          Vertically centered hero sign-up form
        </h1>
        <p className="col-lg-10 fs-4">
          Below is an example form built entirely with Bootstrap�s form
          controls. Each required form group has a validation state that can be
          triggered by attempting to submit the form without completing it.
        </p>
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <form
          className="p-4 p-md-5 border rounded-3 bg-light"
          onSubmit={handleSubmit}
        >
          <div className="form-floating mb-3">
            <input
              type="email"
              ref={emailRef}
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              ref={passwordRef}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>
          <hr className="my-4" />
          <small className="text-muted">
            By clicking Sign up, you agree to the terms of use.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
