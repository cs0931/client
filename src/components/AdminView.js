import {
    Box,
    Button,
    CircularProgress,
    Image,
    Input,
    SimpleGrid,
    Text,
    Checkbox,
  } from '@chakra-ui/react';


  import { useState } from 'react';
  import useMutation from '../hooks/useMutation';
  import useQuery from '../hooks/useQuery';
  
  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  const URL='https://t0212a38y0.execute-api.us-west-2.amazonaws.com';
  const getImagesURL = URL + '/getImages';
  const uploadImageURL= URL +'/uploadImage';


  // const newURL='https://l5srjsq2kb.execute-api.us-west-2.amazonaws.com/photoUploadStage';
  // const newUploadImageURL= newURL +'/ImageUpload';

  
  const ErrorText = ({ children, ...props }) => (
    <Text fontSize="lg" color="red.300" {...props}>
      {children}
    </Text>
  );
  
  const AdminView = () => {
    const [refetch, setRefetch] = useState(0);
    const [isPublic, setIsPublic] = useState(false);
    const {
      mutate: uploadImage,
      isLoading: uploading,
      error: uploadError,
    } = useMutation({ url: uploadImageURL });
  
    const {
      data: imageUrls = [],
      isLoading: imagesLoading,
      error: fetchError,
    } = useQuery(getImagesURL, refetch);
  
    const [error, setError] = useState('');

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };


    const handleIsPublicChange = () => {
      setIsPublic((prevIsPublic) => !prevIsPublic);
    };
  
    const handleUpload = async e => {
      const file = e.target.files[0];
  
      if (!validFileTypes.find(type => type === file.type)) {
        setError('File must be in JPG/PNG format');
        return;
      }
  
  
      const form = new FormData();
      form.append('image', file);
      form.append('isPublic', isPublic);

      const jsonPayload = {};

      const base64 = await convertToBase64(file);
      jsonPayload['image']=base64;
      jsonPayload['isPublic']=isPublic;
   
  
      await uploadImage(jsonPayload);
      setTimeout(() => {
        setRefetch(s => s + 1);
      }, 3000);
    };
  
    return (
        
      <Box mt={6}>
        <Input id="imageInput" type="file" hidden onChange={handleUpload} />
          {/* <Stack  direction='row'> */}
          <Checkbox
          m={[2, 3]}
          isChecked={isPublic}
          onChange={handleIsPublicChange}
          size="lg"
          colorScheme="blue"
         >
         Public
        </Checkbox>
        <Button
          as="label"
          htmlFor="imageInput"
          colorScheme="blue"
          variant="outline"
          mb={4}
          cursor="pointer"
          isLoading={uploading}
        >
          Upload
        </Button>
        {/* </Stack> */}
          
        {error && <ErrorText>{error}</ErrorText>}
        {uploadError && <ErrorText>{uploadError}</ErrorText>}
  
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
        {!fetchError && imageUrls && imageUrls.presignedUrls?.length === 0 && (
          <Text textAlign="left" fontSize="lg" color="gray.500">
            No images found
          </Text>
        )}
  
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {imageUrls && imageUrls.presignedUrls?.length > 0 &&
            imageUrls.presignedUrls.map(url => (
              <Image borderRadius={5} src={url} alt="Image" key={url}  />
            ))}
        </SimpleGrid>
      </Box>
     
      
    );
  };
  export default AdminView;