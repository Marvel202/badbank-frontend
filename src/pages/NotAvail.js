import React from "react";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Msg = styled.h1`
  position: relative;
  padding: 3px;
  color: white;
`;

export const NotAvail = () => {
  return (
    <Modal>
      <Msg>You need to log In again</Msg>
    </Modal>
  );
};
