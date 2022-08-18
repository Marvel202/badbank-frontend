import React, { useState } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";

export const Balance = (session) => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  console.log("bal page", session);
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
            <BalanceMsg setShow={setShow} />
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
  const [balance, setBalance] = useState("");
  // const ctx = React.useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function displayDetails(data) {
    console.log("!data", data);

    //   const user = ctx.users.find((user) => user.email == email);
    //   if (!user) {
    //     props.setStatus('fail!')
    //     return;
    //   }

    //   setBalance(user.balance);
    //   console.log(user);

    // props.setStatus("Your balance is: " + props.user.balance);
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
