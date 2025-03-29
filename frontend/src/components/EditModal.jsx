import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
	useToast,
	RadioGroup,
	Radio,
	Menu,
	MenuButton,
  MenuItem, 
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";
import { GoArrowDown } from "react-icons/go";

function EditModal({ setUsers, user }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		nickname: user.nickname,
		role: user.role,
		about: user.about,
		server: user.server,
		rank: user.rank,
		discord: user.discord,
		riotID: user.riotID,
		interest: user.interest,
	});
	const toast = useToast();

	const handleEditUser = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/friends/" + user.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)));
			toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Sommuner updated successfully.",
				duration: 2000,
				position: "top-center",
			});
			onClose();
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
				position: "top-center",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<IconButton
				onClick={onOpen}
				variant='ghost'
				colorScheme='blue'
				aria-label='See menu'
				size={"sm"}
				icon={<BiEditAlt size={20} />}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleEditUser}>
					<ModalContent>
						<ModalHeader> Edit Your Summoner Details 🔧 </ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<Flex wrap="wrap" gap={4}>
								<Flex gap={6}>
									<FormControl>
										<FormLabel>Nickname</FormLabel>
										<Input
											placeholder='Noob'
											value={inputs.nickname}
											onChange={(e) => setInputs((prev) => ({ ...prev, nickname: e.target.value }))}
											sx={{ width: "190px" }}
										/>
									</FormControl>
									<FormControl>
										<FormLabel>Riot ID</FormLabel>
										<Input
											placeholder='Noob'
											value={inputs.riotID}
											onChange={(e) => setInputs((prev) => ({ ...prev, riotID: e.target.value }))}
											sx={{ width: "190px" }}
										/>
									</FormControl>
									
								</Flex>
								<Flex gap={6}>
								
								<FormControl>
									<FormLabel>Server</FormLabel>
									<Menu>
										<MenuButton as={Button} rightIcon={<GoArrowDown />} sx={{ width: "190px" }}>
											{inputs.server || "Select Server"}  {/* מבטיח שהערך מוצג בתפריט */}
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
											<MenuButton as={Button} rightIcon={<GoArrowDown />} sx={{ width: "190px" }}>
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

									<Flex gap={6}>
									<FormControl>
										<FormLabel>Rank</FormLabel>
										<Input
											placeholder='You are a noob'
											value={inputs.rank}
											onChange={(e) => setInputs((prev) => ({ ...prev, rank: e.target.value }))}
											sx={{ width: "190px" }}
										/>
									</FormControl>

									<FormControl>
										<FormLabel>Discord</FormLabel>
										<Input
											placeholder='Noob discord'
											value={inputs.discord}
											onChange={(e) => setInputs((prev) => ({ ...prev, discord: e.target.value }))}
											sx={{ width: "190px" }}
										/>
										
									</FormControl>
									</Flex>
									

								<FormControl>
									<FormLabel>Interest</FormLabel>
									<Input
										placeholder='Noob Rift'
										value={inputs.interest}
										onChange={(e) => setInputs((prev) => ({ ...prev, interest: e.target.value }))}
										sx={{ width: "403px" }}
									/>
								</FormControl>
							</Flex>
							<FormControl mt={4}>
								<FormLabel>About</FormLabel>
								<Textarea
									placeholder='Im a noob'
									value={inputs.about}
									onChange={(e) => setInputs((prev) => ({ ...prev, about: e.target.value }))}
									sx={{
										width: "403px",
										height: "50px",
									}}
								/>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
								Update
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
}

export default EditModal;
