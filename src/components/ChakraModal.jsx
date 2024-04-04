import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const ChakraModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent className="h-[500px]">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody isCentered={true}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChakraModal;
