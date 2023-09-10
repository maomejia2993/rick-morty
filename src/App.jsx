import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormHelperText,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import bgRickAndMorty from "./assets/wp3277657-rick-and-morty-4k-wallpapers.jpg";
import useFetch from "./hooks/useFetch";
import getRandomNumber from "./functions/getRandomNumber";
import IdPage from "./components/IdPage";
import CharPage from "./components/CharPage";

function App() {
  const inputRef = useRef();

 
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState(getRandomNumber(126));
  const [filterBy, setFilterBy] = useState("id_search");
  const [errorDisplayed, setErrorDisplayed] = useState({
    id_search: false,
    name_search: false,
  });
  const [sectionDisplayed, setSectionDisplayed] = useState({
    paginationIndicator: 1,
    start: 0,
    end: 8,
  });

  const url = {
    id_search: `https://rickandmortyapi.com/api/location/${searchValue}`,
    name_search: `https://rickandmortyapi.com/api/location/?name=${searchValue}`,
  };
  const [apiResponse, getApiResponse, hasError] = useFetch(url[filterBy]);

  useEffect(() => {
    getApiResponse();
  }, [searchValue]);

  useEffect(() => {
    inputRef.current.focus(); 
  }, []);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    console.log(value);
  };

  const handleSelectOnChange = (e) => {
    const value = e.target.value;
    setFilterBy(value);
    setSearchValue('')
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
          let newSectionDisplayed = {
            paginationIndicator: 1,
            start: 0,
            end: 8,
          };
          setSectionDisplayed(newSectionDisplayed);
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

  const increaseSectionDisplayed = () => {
    if (sectionDisplayed.end < apiResponse?.residents?.length + 1) {
      let newSectionDisplayed = {
        paginationIndicator: sectionDisplayed.paginationIndicator + 1,
        start: sectionDisplayed.start + 8,
        end: sectionDisplayed.end + 8,
      };
      setSectionDisplayed(newSectionDisplayed);
    }
  };

  const decreseSectionDisplayed = () => {
    if (sectionDisplayed.start > 0) {
      let newSectionDisplayed = {
        paginationIndicator: sectionDisplayed.paginationIndicator - 1,
        start: sectionDisplayed.start - 8,
        end: sectionDisplayed.end - 8,
      };
      setSectionDisplayed(newSectionDisplayed);
    }
  };
  
  const realtimeSearch = (e) => { 
    const value = e.target.value;
    setSearchValue(value);
    console.log(value);
   }

  return (
    <Box bgColor="#05292e">
      <Box
        id='imagen_principal'
        h="350px"
        w="99vw"
        bgImage={bgRickAndMorty}
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
      ></Box>
      <Box display="flex" w="100%" justifyContent="center" alignItems="center">
        <FormControl
          as="form"
          w="30em"
          onSubmit={handleSubmit}
          display="grid"
          placeItems="center"
        >
          <InputGroup mt="50px" w="80%">
            <Input
              w="50%"
              ref={inputRef}
              borderLeftRadius="10px"
              borderRightRadius="0px"
              placeholder={"search"}
              bgColor="white"
              type="text"
              onChange={filterBy === "id_search" ? handleOnChange : realtimeSearch}
              onClick={handleResetForm}
              value={filterBy === "id_search" ? inputValue : searchValue}
              list="locations"
              id="options"
            />
            <datalist id="locations">
  {apiResponse?.results?.map((location, index) => (
    <option key={index} value={location.name}>
      {location.name}
    </option>
  ))}
</datalist>
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
                Loc name
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
      <IdPage
        apiResponse={apiResponse}
        filterBy={filterBy}
        searchValue={searchValue}
        sectionDisplayed={sectionDisplayed}
        increaseSectionDisplayed={increaseSectionDisplayed}
        decreseSectionDisplayed={decreseSectionDisplayed}
      />
      {/* Render the page for the Charname search */}
      <CharPage
        filterBy={filterBy}
        hasError={hasError}
        apiResponse={apiResponse}
      />
    </Box>
  );
}

export default App;
