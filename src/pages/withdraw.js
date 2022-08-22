import React, { useState, useContext } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import { useSession } from "../firebaseapp/AuthProvider";
import axios from "axios";
import { LedgerContext } from "../contexts/LedgerProvider";

export const Withdraw = (session) => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  console.log("from withdraw", session.user.session);
  const { loading, email, firebaseId, user } = session.user.session;
  const { balance, setBalance, ledger } = useContext(LedgerContext);
  const authEmail = email;

  return (
    !!user && (
      <Card
        bgcolor="success"
        header="Withdraw"
        status={status}
        body={
          show ? (
            <WithdrawForm
              setShow={setShow}
              setStatus={setStatus}
              balance={balance}
              setBalance={setBalance}
              authEmail={authEmail}
              ledger={ledger}
            />
          ) : (
            <WithdrawMsg setShow={setShow} />
          )
        }
      />
    )
  );
};

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const ctx = useSession();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  function onSubmit() {
    let val = Number(getValues().withdrawAmt);
    let email = getValues().email;
    const prevBalance = props.balance;

    if (props.authEmail !== email) {
      console.log("T/F", props.authEmail === email);
      props.setStatus("incorrect email!");
      reset();
      return;
    }

    if (val > prevBalance) {
      alert("insufficient funds, withdrawal cannot be processed");
      reset();
      return;
    }

    let newTotal = Number(prevBalance) - Number(val);
    props.setBalance(newTotal);
    console.log("xxx", newTotal);

    const params = props.authEmail;
    // const url =
    // `https://bad-bank-backend.herokuapp.com/account/update/` + params;
    const url = `http://localhost:3003/account/update/` + params;

    // get previous transactions

    // set current transaction
    let body = {
      balance: newTotal,
      $push: { withdrawal: [{ tran_date: Date.now(), amount: val }] },
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

  return (
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
      Amount
      <br />
      <input
        type="number"
        placeholder="Enter amount"
        min="0"
        {...register("withdrawAmt", {
          required: true,
          min: 0,
        })}
      />
      <br />
      <br />
      <button type="submit" className="btn btn-light">
        Withdraw
      </button>
      {errors["amount"] ? (
        <i className="bi bi-exclamation-circle">
          {" "}
          please input a correct number{" "}
        </i>
      ) : (
        ""
      )}
    </form>
  );
}
