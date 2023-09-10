import { Box, Heading, Text } from "@chakra-ui/react"


const CharPage = ({filterBy, hasError, apiResponse}) => {
  return (
    <> {filterBy === "name_search" && apiResponse.results ? (
        <Box color="white">
          <Box
            color="white"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Heading>Look for a location by name</Heading>
          </Box>
          <Text>Nombre:</Text>
          <Box color="white">
           
            {!hasError ? apiResponse?.results.map((loc, index) => (
              <Box key={index}>{loc.name}</Box>
            )) : <Text color="red">There are no results</Text> }
          </Box>
        </Box>
      ) : (
        <Box>
          <Heading mt="50px" color="white" textAlign="center">
            --
          </Heading>
        </Box>
      )}</>
  )
}

export default CharPage