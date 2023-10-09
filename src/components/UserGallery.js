import {
    Box,
    CircularProgress,
    Image,
    SimpleGrid,
    Text,
  } from '@chakra-ui/react';


  import { useState } from 'react';
  import useQuery from '../hooks/useQuery';
  
  const URL='https://t0212a38y0.execute-api.us-west-2.amazonaws.com';
  const getImagesURL = URL + '/getGuestImages';
  
  const ErrorText = ({ children, ...props }) => (
    <Text fontSize="lg" color="red.300" {...props}>
      {children}
    </Text>
  );
  
  const UserGallery = () => {
    const [refetch, setRefetch] = useState(0);
    
  
    const {
      data: imageUrls = [],
      isLoading: imagesLoading,
      error: fetchError,
    } = useQuery(getImagesURL, refetch);
  
    const [error, setError] = useState('');
  

  
    return (
        
      <Box mt={6}>
  
        <Text textAlign="left" mb={4}>
          Posts
        </Text>
        {imagesLoading && (
          <CircularProgress
            color="gray.600"
            trackColor="blue.300"
            size={7}
            thickness={10}
            isIndeterminate
          />
        )}
        {fetchError && (
          <ErrorText textAlign="left">Failed to load images</ErrorText>
        )}
        {!fetchError &&  imageUrls && imageUrls.presignedUrls?.length === 0 && (
          <Text textAlign="left" fontSize="lg" color="gray.500">
            No images found
          </Text>
        )}
  
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {imageUrls&& imageUrls.presignedUrls?.length > 0 &&
            imageUrls.presignedUrls.map(url => (
              <Image borderRadius={5} src={url} alt="Image" key={url} />
            ))}
        </SimpleGrid>
      </Box>
     
      
    );
  };
  export default UserGallery;