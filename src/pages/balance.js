import React, { useState, useEffect, useContext, useMemo } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LedgerContext } from "../contexts/LedgerProvider";

export const Balance = (session) => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  console.log("from balance", session.user.session);
  const { loading, email, firebaseId, user } = session.user.session;
  console.log("email in withdraw", authEmail);
  const { balance, setBalance } = useContext(LedgerContext);
  const authEmail = email;

  return (
    !!user && (
      <Card
        bgcolor="info"
        header="Balance"
        status={status}
        body={
          show ? (
            <BalanceForm
              setShow={setShow}
              setStatus={setStatus}
              authEmail={authEmail}
              balance={balance}
            />
          ) : (
            <BalanceMsg
              setShow={setShow}
              setStatus={setStatus}
              authEmail={authEmail}
              balance={balance}
            />
          )
        }
      />
    )
  );
};

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  console.log("props inside form", props);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  function displayDetails(data) {
    console.log("data inside display", data.email);
    console.log("props inside display", props.authEmail);
    if (props.authEmail !== data.email) {
      console.log("T/F", props.authEmail === data.email);
      props.setStatus("Incorrect email!");
      return;
    } else {
      // props.setStatus("please enter correct email");
      props.setStatus(`Your balance is: $ ${props.balance}`);
    }
    props.setShow(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit(displayDetails)}>
        <div className="field">
          <label>
            Email
            <br />
            <input type="email" {...register("email", { required: true })} />
          </label>
          <br />
          <br />
        </div>
        <button type="submit" className="btn btn-light">
          Check Balance
        </button>
      </form>
    </>
  );
}
