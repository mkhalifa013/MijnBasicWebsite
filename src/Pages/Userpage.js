import React, { useState, useEffect} from "react";
import { callApi } from "../utils";
import { Formik, Form } from "formik";
import FormData from "form-data";
import { useCurrentUser } from "../Context/CurrentUser";
import useWish from "../hooks/getWish";

const UserPage = (props) => {
  const { user, addProfilePicture,  deleteProfilePicture } = useCurrentUser()
  const { wish, error,  } = useWish([]);
   
  return user  ? (
    <div className="container ctn mb-5 pb-5 mt-5">
      <div className="row">
        {user.profi ? (
          <div className="card-body text-center col-4">
            <img
              src={user.profi.url}
              className="col-3"
            />
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center text-dark">
                afbeelding
                <span>
                  <a
                    href="#"
                    onClick={() => deleteProfilePicture(user.profi.id)}
                    className="btn btn-primary"
                  >
                    X
                  </a>
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="FileUpload">
            <Formik
              initialValues={{ photo1: "" }}
              onSubmit={(values) => {
                let data = new FormData();
                data.append("files", values.photo1);
                data.append("ref", "user");
                data.append("refId", user.id);
                data.append("field", "profi");
                data.append("source", "users-permissions");

           addProfilePicture(data)
              }}
      
            >
              {(formProps) => (
                <Form>
                  <input
                    type="file"
                    name="photo1"
                    onChange={(event) =>
                      formProps.setFieldValue("photo1", event.target.files[0])
                    }
                    required
                  />
                  <button type="submit">Send</button>
                </Form>
              )}
            </Formik>
          </div>
        )}
        <div className="container">
          <div className="my-3 py-3">
            <h2 className="display-5 text-center">UserName: {user.username}</h2>
            <p className="lead"></p>
          </div>
          <div className="container">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center text-dark">
                Email
                <span class="badge badge-primary badge-pill text-dark">
                  {user.email}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body text-center">
          
          
          
        
            
          
            <div className="my-3 py-3" >
              {user.animes && (
                  <p className="lead">vcv{user.animes.title}</p>
               )}
                  </div>

          <div className="bg-light shadow-sm mx-auto w-80 mb-5 col-4">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center text-dark">
                Email
                <span class="badge badge-primary badge-pill text-dark">
                  {user.email}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Geen data</p>
  );
};


export default UserPage;
