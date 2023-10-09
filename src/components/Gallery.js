import { Box, Image, Text, VStack ,ChakraProvider} from '@chakra-ui/react';
import Posts from './AdminView';
import theme from '../config/theme';


const Profile = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="2xl" m="3rem auto" p={5} maxW={700}>
      <VStack p={7} m="auto" width="fit-content" borderRadius={6} bg="gray.700">
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://github.com/cs0931.png"
          alt="Profile"
        />
        <Text>John's Photography</Text>
      
      </VStack>

      <Posts />
      </Box>
    </ChakraProvider>
    
  );
};
export default Profile;