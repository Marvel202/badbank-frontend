import React, { useState, useContext } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import { useSession, UserProvider } from "../firebaseapp/UserProvider";
import axios from "axios";

export const Deposit = (session) => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

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
  const ctx = useSession();

  // const userBalance = ctx.userBalance;
  // console.log("...", userBalance);
  const [deposit, setDeposit] = useState(0);
  // const [balance, setBalance] = useState(0);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  function onSubmit() {
    let val = getValues().depositamt;
    let email = getValues.email;
    console.log("!-!-!", ctx.userBalance);
    console.log("val", val);
    // console.log("from ctx", Number(userBalance));
    let newTotal = Number(val) + ctx.userBalance;
    console.log("vvv", newTotal);

    try {
      axios.get("http://localhost:3003/account/update/john@email.com", {
        balance: val,
      });
    } catch (error) {
      console.error(error);
    }

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
