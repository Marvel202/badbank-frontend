import React, { useState } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import { login } from "../firebaseapp/auth";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
};

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <Link style={{ textDecoration: "none", color: "white" }} to="/home">
        <span>Welcome Back! Continue your banking activities here</span>
        <i className="bi bi-arrow-right-short"></i>
        <i className="bi bi-bank2"></i>
      </Link>
    </>
  );
}

function LoginForm(props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // const ctx = React.useContext(UserContext);

  const handleErr = (e) => {
    const errType = Object.keys(e);

    const required = Object.entries(e).filter(
      ([k, v], i) => v.type === "required"
    );

    let validitychecks = {
      password: "Hint: Your Password has at least 8 alphanumeric characters.",
    };
    return required.length > 0 ? (
      <i className="bi bi-exclamation-circle">All fields must be completed!</i>
    ) : (
      errType.map((item, i) => validitychecks[item])
    );
  };

  const onSubmit = async (data) => {
    let user;

    try {
      user = await login(data);
      console.log("user", user);
      reset();
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.log(error);
    }
    if (user) {
      props.setShow(false);
    } else {
      alert("Account or/and password incorrect!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>
            Email
            <br />
            <input type="email" {...register("email", { required: true })} />
          </label>
          <br />
        </div>
        <div className="field">
          <label>
            Password
            <input
              type="password"
              {...register("password", { required: true, minLength: 8 })}
            />
          </label>
          <br />
        </div>
        <br />
        <div className="field actions">
          <button
            className="btn-outline-info btn btn-default btn-sm login"
            type="submit"
          >
            Log In
          </button>
          <p
            style={{
              fontSize: "0.8em",
              fontStyle: "italic",
              paddingTop: "0.5em",
            }}
          >
            {errors ? handleErr(errors) : ""}
          </p>
          <span className="p-2">or </span>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/createAccount"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </>
  );
}
