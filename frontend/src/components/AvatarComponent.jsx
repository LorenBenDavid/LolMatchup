import React from "react";
import { Avatar, Button, Flex } from "@chakra-ui/react";
import { GoSync } from "react-icons/go";

const AvatarComponent = ({ avatar, randomizeAvatar }) => {
  return (
    <Flex direction="column" alignItems="center" gap={3}>
      <Avatar src={avatar} size="2xl" />
      <Button  size= "sm" onClick={randomizeAvatar}><GoSync  /></Button>
    </Flex>
  );
};

export default AvatarComponent;
