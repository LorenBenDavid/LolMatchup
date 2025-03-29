import { Container, Stack, Text ,Flex} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";
import { useState } from "react";


export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

function App() {
	const [users, setUsers] = useState([]);

	return (
		<Stack minH={"100vh"}>
			<Navbar users={users} setUsers={setUsers} />


			<Container maxW={"1200px"} my={4}>
				<Text
					fontSize={{ base: "3xl", md: "50" }}
					fontWeight={"bold"}
					letterSpacing={"2px"}
					textAlign={"center"}
					mb={8}
				>
					<Flex alignItems={"center"} justifyContent={"center"} gap={4}>
						<Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
							Find Your Gaming Buddy!
						</Text>
							<img src='/poro2.png' alt='lol logo' width={80} height={100} />
					</Flex>
						</Text>


				<UserGrid users={users} setUsers={setUsers} />
			</Container>
		</Stack>
	);
}

export default App;
