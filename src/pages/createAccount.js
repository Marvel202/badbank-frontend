import React, { useState, useContext } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import { createAccount } from "../firebaseapp/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LedgerContext } from "../contexts/LedgerProvider";

export const CreateAccount = () => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  const { balance, setBalance } = useContext(LedgerContext);

  return (
    <div>
      <Card
        bgcolor="secondary"
        header="Create Account"
        status={status}
        body={
          show ? (
            <CreateForm setShow={setShow} setBalance={setBalance} />
          ) : (
            <CreateMsg setShow={setShow} />
          )
        }
      />
    </div>
  );
};

function CreateMsg(props) {
  return (
    <>
      <h2>Success</h2>
      <Link style={{ textDecoration: "none", color: "white" }} to="/home">
        <span>Welcome to Bad Bank! Start your banking activities here</span>
        <i className="bi bi-arrow-right-short"></i>
        <i className="bi bi-bank2"></i>
      </Link>
    </>
  );
}

function CreateForm(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    criteriaMode: "all",
  });

  const navigate = useNavigate();

  const handleErr = (e) => {
    const errType = Object.keys(e);
    const required = Object.entries(e).filter(
      ([k, v], i) => v.type === "required"
    );

    let validitychecks = {
      password: " Password field should be at least 8 alphanumeric characters.",
      username: "Username field must be between 4 and 20 characters.",
      email: "Must provide a valid email address with '@' sign.",
    };
    return required.length > 0 ? (
      <i className="bi bi-exclamation-circle">All fields must be completed!</i>
    ) : (
      errType.map((item, i) => validitychecks[item])
    );
  };

  const onSubmit = async (data) => {
    console.log("Data", data);

    let newUser;
    // setLoading(true);
    try {
      newUser = await createAccount(data);
      console.log("new user", newUser);
      if (newUser) {
        console.log("newUser", newUser);
        console.log("then", props);

        // const url = "https://bad-bank-backend.herokuapp.com/account/create";
        const url = "http:localhost:3003/account/create";
        let body = {
          username: data.username,
          email: data.email,
          firebaseId: "",
          balance: 0,
        };
        var authOptions = {
          method: "post",
          url: url,
          data: body,
          headers: {
            "Content-Type": "application/json",
          },
          json: true,
        };

        axios(authOptions)
          .then((resp) => {
            console.log("response: ", resp);
          })
          .catch((error) => {
            console.log(error);
          });
        reset();
        props.setShow(false);
        setTimeout(() => {
          navigate("/");
        }, 3000);
        props.setBalance(0);
      } else if (!newUser) {
        // setLoading(false);
        console.log("network problem");
      }
    } catch (error) {
      alert("email already in use", error.message);
      reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, props)}>
        <div className="field">
          <label>
            Username
            <br />
            <input
              type="input"
              {...register("username", {
                required: true,
                minLength: 4,
                maxLength: 20,
              })}
            />
            <br />
          </label>
        </div>
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
            className="btn-outline-info btn btn-default btn-sm signup"
            type="submit"
          >
            Create Account
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
          <Link style={{ color: "white", textDecoration: "none" }} to="/login">
            Log In{" "}
          </Link>
        </div>
      </form>
      <p>{props.message}</p>
    </>
  );
}
