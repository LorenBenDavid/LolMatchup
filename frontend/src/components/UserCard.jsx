import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
  Button,
  Avatar,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import UserInfoModal from "./UserInfoModal";
import { BASE_URL } from "../App";

const avatars = [
  "/Ahri_is_Calling_WR_profileicon.png",
  "/Beautiful_New_Year_WR_profileicon.png",
  "/Decimated_WR_profileicon.png",
  "/Gamer_In_Training_WR_profileicon.png",
  "/Get_Together_WR_profileicon.png",
  "/Guard_with_me..._WR_profileicon.png",
  "/Lollipop_Poro_profileicon.png",
  "/Macho_fan_WR_profileicon.png",
  "/Meteoric_Descent_WR_profileicon.png",
  "/Poro_Celebration!_WR_profileicon.png",
  "/Rejoice_WR_profileicon.png",
  "/RiotGO_Jeepney_WR_profileicon.png",
  "/Star_of_the_Party_WR_profileicon.png",
  "/Time_Traveler_WR_profileicon.png",
  "/more/April_Fool's_2025_profileicon.jpg",
  "/more/Cat-in-the-Box_Shaco_Border_profileicon.jpg",
  "/more/Jolly_and_Jaded_Emote.webp",
  "/more/Judgment_Passed_Emote.webp",
  "/more/LeBlanc_Champie_II_profileicon.jpg",
  "/more/LeBlanc_Illustration_II_profileicon.jpg",
  "/more/Sahn-Uzal_Mordekaiser_profileicon.jpg"

];

const UserCard = ({ user, setUsers }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

<<<<<<< HEAD
  
=======
 
>>>>>>> f8b9baa9e47c2f17d034432dcd5f08f0ff51c1c4
  const [avatar, setAvatar] = useState("");

  const randomizeAvatar = () => {
		const validAvatars = avatars.filter(Boolean);
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setAvatar(randomAvatar);
  };

  useEffect(() => {
    randomizeAvatar(); 
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      toast({
        status: "success",
        title: "Success",
        description: "Summoner deleted successfully.",
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-center",
      });
    }
  };

  return (
    <Card >
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={"2"} gap={"6"} alignItems={"center"}>
            <Avatar src={avatar} size="lg" />
            <Box>
              <Heading size="sm">{user.nickname}</Heading>
              <Text>{user.riotID}</Text>
            </Box>
          </Flex>

          <Flex>
            <EditModal user={user} setUsers={setUsers} />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size={"sm"}
              aria-label="Delete user"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteUser}
            />
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        
				<Flex alignItems="center" gap={4}>
					<Text>
						<strong>Role:</strong> 
					</Text>
					{user.role === "Top" && (
						<img src='/top-lane.webp' alt='lol logo' width={20} height={20} /> )||
						user.role === "Jung" && (
							<img src='/64px-Jungle_icon.webp' alt='lol logo' width={20} height={20} />) ||
							user.role === "ADC" && (
								<img src='/64px-Bottom_icon.webp' alt='lol logo' width={20} height={20} />) ||
								user.role === "Supp" && (
									<img src='/64px-Support_icon.webp' alt='lol logo' width={20} height={20} />) ||
									user.role === "Mid" && (
										<img src='/64px-Middle_icon.webp' alt='lol logo' width={20} height={20} /> 
					)}
					<Text>{user.role}</Text>
				</Flex>
				<Flex alignItems="center" gap={3}>
				<Text><strong>Rank:</strong> </Text>
				{user.rank.match(/^iron\s*\d*$/i) && (
						<img src='/ranks/240px-Season_2023_-_Iron.webp' alt='lol logo' width={20} height={20} /> )||
						user.rank.match(/^Bronze\s*\d*$/i) &&(
							<img src='/ranks/240px-Season_2023_-_Bronze.webp' alt='lol logo' width={40} height={40} /> )||
							user.rank.match(/^Silver\s*\d*$/i) && (
								<img src='/ranks/240px-Season_2023_-_Silver.webp' alt='lol logo' width={40} height={40} /> )||
								user.rank.match(/^gold\s*\d*$/i) && (
									<img src='/ranks/240px-Season_2023_-_Gold.webp' alt='lol logo' width={40} height={40}/> )||
									user.rank.match(/^Platinum\s*\d*$/i) &&(
										<img src='/ranks/240px-Season_2023_-_Platinum.webp' alt='lol logo'width={40} height={40} /> ) ||
										user.rank.match(/^Emerald\s*\d*$/i) && (
											<img src='/ranks/240px-Season_2023_-_Emerald.webp' alt='lol logo' width={40} height={40} /> )||
											user.rank.match(/^Diamond\s*\d*$/i) && (
												<img src='/ranks/240px-Season_2023_-_Diamond.webp' alt='lol logo' width={40} height={40} /> )||
												user.rank.match(/^Master\s*\d*$/i) && (
													<img src='/ranks/240px-Season_2023_-_Master.webp' alt='lol logo' width={40} height={40} /> )||
													user.rank.match(/^Grandmaster\s*\d*$/i) && (
														<img src='/ranks/240px-Season_2023_-_Grandmaster.webp' alt='lol logo' width={40} height={40} /> )||
														user.rank.match(/^Challenger\s*\d*$/i) && (
															<img src='/ranks/240px-Season_2023_-_Challenger.webp' alt='lol logo' width={40} height={40} /> ) ||
															user.rank.match(/^Unranked\s*\d*$/i) && (
																<img src='/ranks/240px-Season_2023_-_Unranked.webp' alt='lol logo' width={40} height={40} /> )
											
										}
										<Text>{user.rank}</Text>
										</Flex>
      </CardBody>
			<Flex justifyContent="flex-begin" p={3}>
			<Text><strong>Server:</strong> {user.server}</Text>
			</Flex>
      <Flex justifyContent="flex-end" p={4} >
        <Button onClick={onOpen}>See the Stats</Button>
      </Flex>

      <UserInfoModal
        avatar={avatar}
        randomizeAvatar={randomizeAvatar}
        isOpen={isOpen}
        onClose={onClose}
        user={user}
      />
    </Card>
  );
};

export default UserCard;
