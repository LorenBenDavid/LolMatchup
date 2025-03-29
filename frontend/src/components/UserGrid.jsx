import { Grid, Spinner, Text, Flex, useToast } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

const UserGrid = ({ users, setUsers, selectedRole, selectedServer }) => {
	const [isLoading, setIsLoading] = useState(true);
	const toast = useToast();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await fetch(BASE_URL + "/friends");
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error);
				}
				setUsers(data);
			} catch (error) {
				console.error("❌ Error fetching users:", error);
				toast({
					title: "Error",
					description: "Failed to fetch users.",
					status: "error",
					duration: 4000,
					isClosable: true,
				});
			} finally {
				setIsLoading(false);
			}
		};
		getUsers();
	}, [setUsers]);

	
	if (!users || !Array.isArray(users)) {
		console.error("❌ Invalid users data:", users);
		return null; 
	}


	const filteredUsers = users.filter((user) => {
		const roleMatch = selectedRole ? user.role === selectedRole : true;
		const serverMatch = selectedServer ? user.server === selectedServer : true;
		return roleMatch && serverMatch;
	});

	return (
		<>
			<Grid
				templateColumns={{
					base: "1fr",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
				}}
				gap={4}
			>
				{filteredUsers.map((user) => (
					<UserCard key={user.id} user={user} setUsers={setUsers} />
				))}
			</Grid>
		
			{!filteredUsers.length && !isLoading && (
				<Flex justifyContent={"center"}>
					<Text fontSize={"xl"}>No matching users found</Text>
				</Flex>
			)}
		</>
	);
};

export default UserGrid;
