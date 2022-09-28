import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const BasicUsage = () => {
  const [event, setEvent] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    console.log(event);
    onClose();
  };
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please Entered Your Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Entered Your Event"
              onChange={(e) => setEvent(e.target.value)}
              size="md"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              OKE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default BasicUsage;
