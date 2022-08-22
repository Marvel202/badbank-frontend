import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalBackground = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
`;
const ModalBody = styled.div`
  background-color: #ff7065;
  margin: 10% auto;
  padding: 20px;
  width: 50%;
  justify-content: center;
`;

export const Modal = ({ children }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const handle = () => {
    setShow(false);
    // navigate("/");
  };
  return (
    <>
      {show && (
        <ModalBackground onClick={handle}>
          <ModalBody>{children}</ModalBody>
        </ModalBackground>
      )}
    </>
  );
};
