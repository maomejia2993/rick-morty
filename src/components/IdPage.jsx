import {
    Box,
    Heading,
    Text,
  } from "@chakra-ui/react";

  import { Grid, GridItem } from "@chakra-ui/react";
  import Cards from "./Cards.jsx";
  import { AnimatePresence, motion } from "framer-motion";
  import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

  

const IdPage = ( { apiResponse, filterBy  } ) => {
  return (
    <>
           {filterBy === "id_search" && apiResponse ? (
            
            <Box
              id="Location_info"
              color="white"
              display="grid"
              placeItems="center"
              w="99vw"
              h="250px"
            >
              <Box
                w="50%"
                h="70%"
                bgColor="#072226"
                boxShadow="2px 2px 5px black"
                borderRadius="25px"
                pt="20px"
              >
                <Heading textAlign="center" mb="15px" color="green.500">
                  {apiResponse.name}
                </Heading>
                <Box display="flex" justifyContent="space-evenly" gap="">
                  <Box display="flex" flexDirection="column">
                    <Heading fontSize="16px" mb="5px">
                      Type
                    </Heading>
                    <Text>{apiResponse.type}</Text>
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <Heading fontSize="16px" mb="5px">
                      Dimension
                    </Heading>
                    <Text>{apiResponse.dimension}</Text>
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <Heading fontSize="16px" mb="5px">
                      Population
                    </Heading>
                    <Text>{apiResponse?.residents?.length}</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <p>no hay respuesta aun</p>
          )}
          {apiResponse && apiResponse?.residents?.length > 0 ? (
            <Grid
              w="99vw"
              mt="100px"
              px="100px"
              templateColumns="repeat(4, 1fr)"
              gap={"1px"}
              display="grid"
              placeItems="center"
            >
              <AnimatePresence>
                {Array(apiResponse?.residents?.length)
                  .fill(null)
                  .map((_, index) => (
                    <GridItem
                      as={motion.div}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      w="80%"
                      h="100%"
                      key={index}
                    >
                      <Cards planetInfo={apiResponse} index={index} />
                    </GridItem>
                  ))}
              </AnimatePresence>
            </Grid>
          ) : (
            <Heading textAlign="center" color="white" marginX="25px" mt="150px">
              Unfortunately there are not results for this search yet, please
              try to search for a different location.
            </Heading>
          )}
          {apiResponse?.residents?.length > 4 && (
            <Box color="white" w="99vw" pb="25px">
              <Box
                id="pagination"
                display="flex"
                justifyContent="center"
                gap="15px"
              >
                <GoTriangleLeft fontSize="2em" cursor="pointer" />
                <Box display="flex">
                  <Box
                    w="25px"
                    display="grid"
                    placeItems="center"
                    aspectRatio="1"
                    bgColor="#072226"
                    boxShadow="1px 1px 1px black"
                    lineHeight="1"
                    fontSize="2em"
                  >
                    1
                  </Box>
                </Box>
                <GoTriangleRight fontSize="2em" cursor="pointer" />
              </Box>{" "}
            </Box>
          )}
        </>
  )
}

export default IdPage