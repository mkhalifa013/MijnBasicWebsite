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
              <img
                src={`http://localhost:1337${user.profi.url}`}
                className="user mb-2 rounded-circle"
                alt="profile-image"
              />
            )}

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};