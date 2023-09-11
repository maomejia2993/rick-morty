import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Circle,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";

const Cards = ({ planetInfo, index }) => {
  console.log(planetInfo);
  const url = planetInfo?.residents[index];
  const [resident, getResident] = useFetch(url);

  useEffect(() => {
    getResident();
  }, [url]);

  return (
    resident && (
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="elevated"
        display="flex"
        flexDirection="column"
        color="white"
        w="100%"
        bgColor="#072226"
        boxSizing="border-box"
      >
        <Image
          objectFit="cover"
          w="100%"
          h="250px"
          src={resident.image}
          alt="Caffe Latte"
        />
        <Box
          position="absolute"
          top="7"
          display="flex"
          alignItems="center"
          gap="5px"
          bgColor="white"
          px="10px"
          borderRightRadius="10px"
        >
          {" "}
          <Circle
            bg={
              (resident.status === "Dead" && "red") ||
              (resident.status === "Alive" && "green") ||
              (resident.status === "unknown" && "gray")
            }
            w="3"
            h="3"
          ></Circle>
          <Text color="black">{resident.status}</Text>
        </Box>

        <Stack>
          <CardBody>
            <Heading size="md" textAlign='center' mb='5px'>{resident.name}</Heading>
            <hr />
            <Box id="text_container" pt="25px" >
              <Text fontSize="13px" color="gray.400" ml="15px">
                Specie
              </Text>
              <Text> {resident.species} </Text>
              <Text fontSize="13px" color="gray.400" ml="15px">
                Origin
              </Text>
              <Text> {resident.origin.name} </Text>
              <Text fontSize="13px" color="gray.400" ml="15px">
                Episodes where appear
              </Text>
              <Text> {resident.episode.length} </Text>
            </Box>
          </CardBody>
          <CardFooter></CardFooter>
        </Stack>
      </Card>
    )
  );
};

export default Cards;
