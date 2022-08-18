import React, { useState } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useSession } from "../firebaseapp/UserProvider";

export const Deposit = (session) => {
  console.log("###", session);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  console.log("+++", session);
  const dataRec = axios
    .get("http://localhost:3003/account/john@email.com")
    .then(function(response) {
      console.log("hhh", response).catch(function(error) {
        console.log("err", error);
      });
    });

  console.log("zzzz", dataRec);

  return (
    !!session.user.user && (
      <Card
        bgcolor="warning"
        header="Deposit"
        status={status}
        body={
          show ? (
            <DepositForm setShow={setShow} setStatus={setStatus} />
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

const handleErr = (err) => {
  console.log(err);
};

function DepositForm(props) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  // const ctx = useContext(LedgerContext);
  // const userBalance = ctx.userBalance;
  const [deposit, setDeposit] = useState(0);
  const [balance, setBalance] = useState(0);

  // console.log("ttt", ctx);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  function onSubmit() {
    let val = getValues().amount;
    let email = getValues.email;
    console.log(val);
    let newTotal = Number(val) + balance;
    // setBalance(newTotal);
    // ctx.setUserBalance(newTotal);

    props.setStatus("");
    props.setShow(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>
            Email
            <br />
            <input
              type="email"
              value={useSession().user ? useSession().user.email : ""}
              {...register("email", { required: true })}
            />
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
