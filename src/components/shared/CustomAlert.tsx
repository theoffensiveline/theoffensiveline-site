import React from "react";
import styled from "styled-components";

interface CustomAlertProps {
  message: string;
  onClose: () => void;
  isOpen: boolean;
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: ${({ theme }) => theme.background || "#fff"};
  color: ${({ theme }) => theme.text || "#000"};
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Message = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  onClose,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Message>{message}</Message>
        <CloseButton onClick={onClose}>OK</CloseButton>
      </Modal>
    </Backdrop>
  );
};

export default CustomAlert;
