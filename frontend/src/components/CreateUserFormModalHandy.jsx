import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { GoArrowDown } from "react-icons/go";
import { BASE_URL } from "../App";

const CreateUserFormModalHandy = ({ isOpen, onClose, setUsers }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [inputs, setInputs] = useState({
    nickname: '',
    role: '',
    about: '',
    gender: '',
    server: '',
    rank: '',
    discord: '',
    riotID: '',
    interest: '',
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const missingFields = Object.entries(inputs).filter(([_, val]) => !val.trim());
    if (missingFields.length > 0) {
      toast({
        status: 'error',
        title: 'Missing fields',
        description: `Please fill in: ${missingFields.map(([key]) => key).join(', ')}`,
        duration: 4000,
        position: 'top-center',
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(BASE_URL + '/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast({
        status: 'success',
        title: 'Summoner created successfully',
        description: 'Yayy 🎉',
        duration: 2000,
        position: 'top-center',
      });

      onClose();
      setUsers((prevUsers) => [...prevUsers, data]);

      setInputs({
        nickname: '',
        role: '',
        about: '',
        gender: '',
        server: '',
        rank: '',
        discord: '',
        riotID: '',
        interest: '',
      });
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error',
        description: error.message,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <form onSubmit={handleCreateUser}>
        <ModalContent>
          <ModalHeader>Welcome to the Rift! 🌟</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex direction="column" gap={4}>
              
              <Flex gap={4}>
                <FormControl>
                  <FormLabel>Nickname</FormLabel>
                  <Input
                    placeholder="Summoner's name"
                    value={inputs.nickname}
                    onChange={(e) => setInputs({ ...inputs, nickname: e.target.value })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Riot ID</FormLabel>
                  <Input
                    placeholder="Enter your Riot ID"
                    value={inputs.riotID}
                    onChange={(e) => setInputs({ ...inputs, riotID: e.target.value })}
                  />
                </FormControl>
              </Flex>

              
              <Flex gap={4}>
                <FormControl>
                  <FormLabel>Server</FormLabel>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<GoArrowDown />} width="100%">
                      {inputs.server || "Select Server"}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => setInputs({ ...inputs, server: "NA" })}>North America</MenuItem>
                      <MenuItem onClick={() => setInputs({ ...inputs, server: "EUW" })}>Europe West</MenuItem>
                      <MenuItem onClick={() => setInputs({ ...inputs, server: "EUNE" })}>Europe Nordic & East</MenuItem>
                    </MenuList>
                  </Menu>
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<GoArrowDown />} width="100%">
                      {inputs.role || "Select Role"}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => setInputs({ ...inputs, role: "Top" })}>Top Lane</MenuItem>
                      <MenuItem onClick={() => setInputs({ ...inputs, role: "Mid" })}>Mid Lane</MenuItem>
                      <MenuItem onClick={() => setInputs({ ...inputs, role: "ADC" })}>Bot Lane (ADC)</MenuItem>
                      <MenuItem onClick={() => setInputs({ ...inputs, role: "Supp" })}>Bot Lane (Supp)</MenuItem>
                      <MenuItem onClick={() => setInputs({ ...inputs, role: "Jung" })}>Jungle</MenuItem>
                    </MenuList>
                  </Menu>
                </FormControl>
              </Flex>

              
              <Flex gap={4}>
                <FormControl>
                  <FormLabel>Rank</FormLabel>
                  <Input
                    placeholder="Not a pro yet? noob..."
                    value={inputs.rank}
                    onChange={(e) => setInputs({ ...inputs, rank: e.target.value })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Discord</FormLabel>
                  <Input
                    placeholder="Drop your Discord here"
                    value={inputs.discord}
                    onChange={(e) => setInputs({ ...inputs, discord: e.target.value })}
                  />
                </FormControl>
              </Flex>

             
              <FormControl>
                <FormLabel>Interest</FormLabel>
                <Input
                  placeholder="Choose your battleground"
                  value={inputs.interest}
                  onChange={(e) => setInputs({ ...inputs, interest: e.target.value })}
                />
              </FormControl>

              
              <FormControl>
                <FormLabel>About</FormLabel>
                <Textarea
                  placeholder="Looking for teammates for ranked or just a duo for fun?"
                  value={inputs.about}
                  onChange={(e) => setInputs({ ...inputs, about: e.target.value })}
                />
              </FormControl>

             
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  onChange={(val) => setInputs({ ...inputs, gender: val })}
                  value={inputs.gender}
                >
                  <Flex gap={5}>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="IDK">IDK</Radio>
                  </Flex>
                </RadioGroup>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3} isLoading={isLoading}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default CreateUserFormModalHandy;
