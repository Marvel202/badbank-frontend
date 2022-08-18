import { Link } from "react-router-dom";
import React from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebaseapp/auth";
import { useSession } from "../firebaseapp/UserProvider";
// import { UserContext } from "../contexts/userContext";

export const NavBar = () => {
  const auth = getAuth();
  const user = useSession().user;
  console.log("load Navbar", user);
  const disable = user ? "nav-link disabled" : "nav-link";
  const removeDisable = user ? "nav-link" : "nav-link disabled";
  const navigate = useNavigate();
  console.log("useUser", user);

  const handle = () => {
    logout();
    navigate("/*");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={disable} to="/createaccount">
                Sign Up / Sign In
              </Link>
            </li>

            <li className="nav-item">
              <Link className={removeDisable} to="/deposit">
                Deposit
              </Link>
            </li>
            <li className="nav-item">
              <Link className={removeDisable} to="/withdraw">
                Withdraw
              </Link>
            </li>
            <li className="nav-item">
              <Link className={removeDisable} to="/balance">
                Balance
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto p-2">
            <li
              className="nav-item"
              style={{ color: "magenta", listStyle: "none" }}
            >
              {!!user && (
                <div>
                  <span>Current User:</span>
                  {user.displayName}

                  <button
                    className="secondary btn btn-default btn-sm logout"
                    onClick={handle}
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
