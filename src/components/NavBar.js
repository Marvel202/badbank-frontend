import { Link } from "react-router-dom";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebaseapp/auth";
import { useSession } from "../firebaseapp/AuthProvider";

export const NavBar = () => {
  const { session, _ } = useSession();
  console.log("load Navbar", session);
  const loading = session.loading;
  const email = session.email;
  console.log("testing", loading);
  console.log("email in NavBar", email);

  const auth = getAuth();
  const navigate = useNavigate();
  const handle = () => {
    logout();
    navigate("/");
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

            {loading ? (
              <li className="nav-item">
                <Link className="nav-link" to="/createaccount">
                  Sign Up / Sign In
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item logout">
                  <Link className="nav-link" to="/" onClick={handle}>
                    LOGOUT
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/deposit">
                    Deposit
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/withdraw">
                    Withdraw
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/balance">
                    Balance
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto p-2">
            <li className="nav-item info active" style={{ listStyle: "none" }}>
              {!loading && (
                <div>
                  <span>Current User:</span>
                  {session.user.displayName
                    ? session.user.displayName.toUpperCase()
                    : ""}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
