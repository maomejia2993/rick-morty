import { Box, Heading, Text } from "@chakra-ui/react"
import Cards from "./Cards"
import { Center, Wrap, WrapItem } from "@chakra-ui/layout"
import { AnimatePresence, motion } from "framer-motion"



const CharPage = ({filterBy, hasError, apiResponse, sectionDisplayed}) => {
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
          <Text>Name:</Text>
          <Box color="white">
          
          {apiResponse && apiResponse?.residents?.length > 0 ? (
        <Center mx='100px' spacing='30px'   >
          <Wrap spacing='50px' align='center' justify='center'>
            <AnimatePresence>
              {Array(apiResponse?.residents?.length)
                .fill(null)
                .map((_, index) => (
                  <WrapItem
                    as={motion.div}
                    initial={{ x: 150 }}
                    animate={{ x: 0 }}
                    key={index}
                  >
                    <Center>
                      <Cards planetInfo={apiResponse} index={index} />
                    </Center>
                  </WrapItem>
                )).slice(sectionDisplayed.start, sectionDisplayed.end)}
            </AnimatePresence>
          </Wrap>
        </Center>
      ) : (
        <Box textAlign="center" color="white" marginX="5px" mt="5px"></Box>
      )}
                  
            {!hasError ? apiResponse?.results.map((char, index) => (
              <Box key={index}>{char.name}</Box>
            )) : <Text color="red">There are no results 😓</Text> }
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