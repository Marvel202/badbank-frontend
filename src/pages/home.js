import React from "react";
import { Card } from "../components/Card";
import bankImg from "./bank.png";

const Home = () => {
  return (
    <Card
      txtcolor="white"
      bgcolor="primary"
      header="Bad Bank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      // body={<img src="./bank.png" className="img-fluid" alt="responsive" />}
      body={<img src={bankImg} className="img-fluid" alt="" />}
    />
  );
};

export default Home;
