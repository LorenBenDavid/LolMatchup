import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateUserModal from "./CreateUserModal";
import { useState } from "react";
import { GoSync } from "react-icons/go";

const Navbar = ({ users = [], setUsers }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedServer, setSelectedServer] = useState("");

  const handleFilter = () => {
    const filtered = users.filter((user) => {
      const roleMatch = selectedRole ? user.role === selectedRole : true;
      const serverMatch = selectedServer ? user.server === selectedServer : true;
      return roleMatch && serverMatch;
    });
    setUsers(filtered);
  };

  const handleReset = () => {
    fetch(import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api/friends" : "/api/friends")
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  return (
    <Container maxW="900px">
      <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "gray.700")}>
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap={4}>
            <img src="/League_of_Legends_Icon.png" alt="lol logo" width={50} />
            <Text
              as="span"
              bgGradient="linear(to-r, cyan.400, blue.500)"
              bgClip="text"
              fontSize="lg"
              fontWeight="bold"
            >
              LoLMatchup
            </Text>
          </Flex>

          <Flex gap={3} alignItems="center">
            <Select
              placeholder="Select Role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              width="150px"
              bg="gray.700"
              color="white"
            >
              <option value="Top">Top</option>
              <option value="Mid">Mid</option>
              <option value="ADC">ADC</option>
              <option value="Supp">Support</option>
              <option value="Jung">Jungle</option>
            </Select>

            <Select
              placeholder="Select Server"
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              width="150px"
              bg="gray.700"
              color="white"
            >
              <option value="NA">North America</option>
              <option value="EUW">Europe West</option>
              <option value="EUNE">Europe Nordic & East</option>
            </Select>

            <Button onClick={handleFilter} colorScheme="blue">
              Filter
            </Button>

            <Button onClick={handleReset} colorScheme="gray">
            <GoSync />
            </Button>

            <CreateUserModal setUsers={setUsers} />

            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun />}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
