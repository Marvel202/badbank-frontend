import React, { useState, useContext } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LedgerContext } from "../contexts/LedgerProvider";
import "dotenv/config";
import { ledgerAPI } from "../Ledger";

export const Deposit = (session) => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  console.log("from deposit", session.user.session);
  const { loading, email, firebaseId, user } = session.user.session;
  const authEmail = email;
  const { balance, setBalance } = useContext(LedgerContext);

  return (
    !!user && (
      <Card
        bgcolor="warning"
        header="Deposit"
        status={status}
        body={
          show ? (
            <DepositForm
              setShow={setShow}
              setStatus={setStatus}
              balance={balance}
              setBalance={setBalance}
              authEmail={authEmail}
            />
          ) : (
            <DepositMsg setShow={setShow} />
          )
        }
      />
    )
  );
};

function DepositMsg(props) {
  return (
    <>
      <h5>Success </h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  console.log("props inside deposit form", props);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    let val = Number(getValues().depositamt);
    let email = getValues().email;

    console.log("inside submit", props);

    console.log("val", val);
    console.log("OnSubmit", props.balance);

    if (props.authEmail !== email) {
      console.log("T/F", props.authEmail === email);
      props.setStatus("incorrect email!");
      return;
    } else {
      const prevBalance = props.balance;
      let newTotal = Number(val) + Number(prevBalance);
      props.setBalance(newTotal);
      console.log("vvv", newTotal);

      const url =
        process.env.REACT_APP_API_URL + `account/update/${props.authEmail}`;
      console.log("url in deposit", url);
      let body = {
        balance: newTotal,
        $push: { deposits: [{ tran_date: Date.now(), amount: val }] },
      };

      var authOptions = {
        method: "put",
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

      props.setStatus("");
      props.setShow(false);
    }
  }
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
        <br />
        Deposit Amount
        <br />
        <input
          type="number"
          placeholder="Enter amount"
          min="0"
          {...register("depositamt", {
            required: true,
            min: 0,
          })}
        />
        <br />
        <br />
        <button type="submit" className="btn btn-light btn-sm">
          Deposit
        </button>
        <br />
        {errors["amount"] ? (
          <i className="bi bi-exclamation-circle">
            {" "}
            please input a correct number{" "}
          </i>
        ) : (
          ""
        )}
      </form>
    </>
  );
}
