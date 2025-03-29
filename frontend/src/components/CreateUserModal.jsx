import {
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { BiAddToQueue } from 'react-icons/bi';
import CreateUserFormModalHandy from './CreateUserFormModalHandy';

const CreateUserModal = ({ setUsers }) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>

      <CreateUserFormModalHandy isOpen={isOpen} onClose={onClose} setUsers={setUsers} />
    </>
  );
};

export default CreateUserModal;
