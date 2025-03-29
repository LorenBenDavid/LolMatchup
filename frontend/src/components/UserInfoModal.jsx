import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Flex, Avatar, Box } from "@chakra-ui/react";
import AvatarComponent from "./AvatarComponent";

const UserInfoModal = ({ avatar, randomizeAvatar, isOpen, onClose, user }) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center" gap={4}>
            <Text fontSize="2xl">
              <strong>{user.nickname}</strong>
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex direction="column" alignItems="center" mb={4}>
            <AvatarComponent avatar={avatar} randomizeAvatar={randomizeAvatar} size="xl" />
          </Flex>

          <Box mb={4}>
            <Text><strong>Server:</strong> {user.server}</Text>
          </Box>

          <Box mb={4}>
            <Text><strong>Role:</strong> {user.role}</Text>
          </Box>

          <Box mb={4}>
            <Text><strong>Rank:</strong> {user.rank}</Text>
          </Box>

          <Box mb={4}>
            <Text><strong>Discord:</strong> {user.discord}</Text>
          </Box>

          <Box mb={4}>
            <Text><strong>Interest:</strong> {user.interest}</Text>
          </Box>

          <Box>
            <Text><strong>About:</strong> {user.about}</Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserInfoModal;
