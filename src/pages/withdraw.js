import React, { useState } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";
import { useSession } from "../firebaseapp/UserProvider";

export const Withdraw = (session) => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  return (
    !!session.user.user && (
      <Card
        bgcolor="success"
        header="Withdraw"
        status={status}
        body={
          show ? (
            <WithdrawForm setShow={setShow} setStatus={setStatus} />
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
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  // const ctx = React.useContext(UserContext);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  function onSubmit() {
    console.log(email, amount);
    //   const user = ctx.users.find((user) => user.email == email);
    //   if (!user) {
    //     props.setStatus('fail!')
    //     return;
    //   }

    //   user.balance = user.balance - Number(amount);
    //   console.log(user);
    props.setStatus("");
    props.setShow(false);
  }

  return (
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
      Amount
      <br />
      <input
        type="number"
        placeholder="Enter amount"
        min="0"
        {...register("amount", {
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
