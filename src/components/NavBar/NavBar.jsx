import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  const navOption = (
    <>
      <li className="font-golos font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="font-golos font-semibold">
        <Link to="/college">Colleges</Link>
      </li>
      <li className="font-golos font-semibold">
        <Link to="/admission">Admission</Link>
      </li>
      <li className="font-golos font-semibold">
        <Link to="/myCollege">My College</Link>
      </li>

      {user ? (
        <>
          <li className="font-golos flex flex-row font-semibold">
            <Link className="bg-stone-700" to={`/profileRoute`}>{user.displayName || user.email}</Link>
            <button onClick={handleLogOut}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li className="font-golos font-semibold">
            <Link to="/login">
              <button>Login</button>
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-50 max-w-screen-xl text-white  bg-black ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 bg-black shadow bg-opacity-50 rounded-box w-52"
            >
              {navOption}
            </ul>
          </div>
          <Link
            to="/"
            className="font-semibold ml-8 font-rubik text-xl font-golos"
          >
            College Hive
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal  px-1">{navOption}</ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
