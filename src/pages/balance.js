import React, { useState, useEffect, useContext } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import { useSession, UserProvider } from "../firebaseapp/UserProvider";

export const Balance = (session) => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  console.log("from balance", session);

  return (
    !!session.user.user && (
      <Card
        bgcolor="info"
        header="Balance"
        status={status}
        body={
          show ? (
            <BalanceForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <BalanceMsg setShow={setShow} setStatus={setStatus} />
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
  const [email, setEmail] = useState("");

  const ctx = useSession();
  console.log("ctx from bal", ctx.user);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  function displayDetails(data) {
    console.log("!!!", ctx.user.email);
    //   const user = ctx.users.find((user) => user.email == email);
    let email = data.email;
    if (ctx.user.email !== email) {
      //   if (!user) {
      props.setStatus("fail!");

      return;
    }
    //   }

    // props.setStatus("please enter correct email")
    props.setStatus(`Your balance is: $ ${ctx.userBalance}`);

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
