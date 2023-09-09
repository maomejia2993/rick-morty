import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Image,
  Stack,
  Text,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Cards from "./components/Cards";
import bgRickAndMorty from "./assets/wp3277657-rick-and-morty-4k-wallpapers.jpg";
import useFetch from "./hooks/useFetch";
import getRandomNumber from "./functions/getRandomNumber";
import { AnimatePresence, motion } from "framer-motion";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import IdPage from "./components/IdPage";
import CharPage from "./components/CharPage";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState(getRandomNumber(126));
  const [filterBy, setFilterBy] = useState("id_search");
  const [errorDisplayed, setErrorDisplayed] = useState({
    id_search: false,
    name_search: false,
  });

  const url = {
    id_search: `https://rickandmortyapi.com/api/location/${searchValue}`,
    name_search: `https://rickandmortyapi.com/api/character/?name=${searchValue}`,
  };
  const [apiResponse, getApiResponse, hasError] = useFetch(url[filterBy]);

  useEffect(() => {
    getApiResponse();
  }, [searchValue]);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    console.log(value);
  };

  const handleSelectOnChange = (e) => {
    const value = e.target.value;
    setFilterBy(value);
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (filterBy) {
      case "id_search":
        if (inputValue < 126 && inputValue > 0) {
          setSearchValue(inputValue.trim());
          const newErrorDisplay = {
            id_search: false,
            name_search: false,
          };
          setErrorDisplayed(newErrorDisplay);
          console.log(inputValue);
        } else {
          const newErrorDisplay = {
            id_search: true,
            name_search: false,
          };
          setErrorDisplayed(newErrorDisplay);
        }
        break;
      case "name_search":
        if (inputValue.length > 1) {
          setSearchValue(inputValue.trim());
          const newErrorDisplay = {
            id_search: false,
            name_search: false,
          };
          setErrorDisplayed(newErrorDisplay);
          console.log(inputValue);
          console.log(apiResponse);
        } else {
          const newErrorDisplay = {
            id_search: false,
            name_search: true,
          };
          setErrorDisplayed(newErrorDisplay);
        }
        break;
      default:
        break;
    }
  };

  const handleResetForm = () => {
    setInputValue("");
    const newErrorDisplay = {
      id_search: false,
      name_search: false,
    };
    setErrorDisplayed(newErrorDisplay);
  };

  return (
    <Box bgColor="#05292e">
      <Box
        h="350px"
        w="99vw"
        bgImage={bgRickAndMorty}
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
      ></Box>
      <Box display="flex" w="100%" justifyContent="center" alignItems="center">
        <FormControl as="form" w="30em" onSubmit={handleSubmit}>
          <InputGroup mt="50px" w="100%" position="relative" gap="">
            <Input
              w="50%"
              borderLeftRadius="10px"
              borderRightRadius="0px"
              placeholder={"search"}
              bgColor="white"
              type="text"
              onChange={handleOnChange}
              onClick={handleResetForm}
              value={inputValue}
            />
            <Select
              onChange={(e) => handleSelectOnChange(e)}
              as="select"
              id="searchSelector"
              name="planet"
              w="30%"
              bgColor="white"
              borderRadius="none"
              fontSize="14px"
            >
              <option id="planet" value="id_search">
                Universe Id
              </option>
              <option id="planet" value="name_search">
                Char name
              </option>
            </Select>
            <InputRightElement
              cursor="pointer"
              minW="20%"
              children={
                <Button
                  borderLeftRadius="none"
                  borderRightRadius="10px"
                  colorScheme="green"
                  border="none"
                  outline="none"
                  onClick={handleSubmit}
                  minW="20%"
                >
                  Search
                </Button>
              }
            />
            <FormHelperText
              color={errorDisplayed.id_search && "red"}
              position="absolute"
              bottom="-20px"
            >
              {" "}
              {errorDisplayed.id_search &&
                "Please enter a number between 1 and 126"}{" "}
            </FormHelperText>
          </InputGroup>
        </FormControl>
      </Box>
      {/* Render the page for the ID search */}
      <IdPage apiResponse={apiResponse} filterBy={filterBy}  searchValue={searchValue}   />
      {/* Render the page for the Charname search */}
      <CharPage filterBy={filterBy} hasError={hasError} apiResponse={apiResponse} />
    </Box>
  );
}

export default App;
