import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";

/*
  Component: MenuActions
  Description: Responsible for rendering a set of actions like logout, profile images
  etc in the main menu.
*/
export default ({ user, isLoading, handleLogout }) => {
  return (
    <div className="row justify-content-center">
      <div className="col">
        {isLoading ? (
          <>
            <p className="text-light m-0 p-1 float-end">Laden...</p>

            <ClipLoader color="white" loading={user.isLoading} size={50} />
          </>
        ) : (
          <>
            <p className="text-light m-0 p-1 float-end">{user.username}</p>

            {user.profi && (
              <Link to="/user"><img
              src={user.profi.url}
              className="user mb-2 rounded-circle float-end"
              alt="profile-image"
            /></Link>
              
            )}

            <button className="btn btn-danger float-end" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
