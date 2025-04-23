/* eslint-disable react-hooks/exhaustive-deps */
import {AddIcon, SmallCloseIcon} from '@chakra-ui/icons';
import {
  Box,
  Image,
  Icon,
  Stack,
  Text,
  VStack,
  Wrap,
  SimpleGrid,
  IconButton,
  Button,
  Center,
  Flex,
} from '@chakra-ui/react';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import Dropzone, {useDropzone} from 'react-dropzone';
import {encodeFileToBase64, extractBase64} from '/src/utils';
import Carousel, {consts} from 'react-elastic-carousel';
import UploadIcon from '@/components/assets/UploadIcon';
import imageFallback from '/src/images/image-fallback.png';
import {IoChevronBack, IoChevronForward} from 'react-icons/io5';

export const FileUploads = ({
  type,
  title,
  componentTitle,
  icon,
  maxFiles,
  isDocs,
  setFiles,
  files,
  index,
  photoUrls,
  photoString,
  setPhotoUrl,
  setPhotoString,
  values,
  setFieldValue,
  imageColumns,
  editUnitInfo,
  ...rest
}) => {
  const [slider, setSlider] = useState('');

  const breakPoints = [{width: 1, itemsToShow: 3}];
  const {isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles} =
    useDropzone({
      accept: type ? type : {'image/*': ['.jpg', '.png']},
      minSize: 0,
      multiple: true,
      maxFiles: {maxFiles},
      onDrop: useCallback(acceptedFiles => {
        acceptedFiles.forEach(file =>
          encodeFileToBase64(file)
            .then(res => {
              setFiles(prevValue => [
                ...prevValue,
                Object.assign({image: res}, file, {
                  preview: URL.createObjectURL(file),
                }),
              ]);
              setFieldValue(`${values.units[index].photos}`, {
                old_photos: photoUrls,
                new_photos: extractBase64(photoString),
              });
            })
            .catch(err => {
              return err;
            })
        );
      }, []),
    });

  const removeFile = indx => {
    const copy = [...files];
    for (let i = 0; i < copy.length; i++) {
      if (i == indx) {
        copy?.splice(i, 1);
        i = copy?.length;
      }
    }
    setFiles(copy);
  };

  const isFileTooLarge =
    rejectedFiles && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  const isLen = files?.length > 4;

  const thumbs =
    files &&
    files?.map((file, index) => (
      <Center
        key={index}
        alignItems={'center'}
        justifyContent={'center'}
        pos="relative"
        borderRadius="12.3px"
        bg="#606060"
        ml={'10px'}
        height={'75px'}
        overflow="hidden"
      >
        <Flex pos="absolute" top={'0'} left={'0'} right={'0'} bottom={'0'} zIndex={'1'}></Flex>
        <Icon
          bg="#E9E9E9"
          borderRadius="full"
          as={SmallCloseIcon}
          cursor="pointer"
          onClick={() => removeFile(index)}
          pos="absolute"
          right="41%"
          zIndex={2}
          bottom="7px"
          width="20px"
          height="20px"
          alt="cancel_icon"
          color="#191919"
        />

        {!type ? (
          <video controls>
            <source src={file.preview} type="video/mp4" />
            <source src={file.preview} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            alt=""
            objectFit="cover"
            src={file?.image || file || imageFallback?.src}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file?.preview);
            }}
            minH={'100%'}
            minW={'100%'}
          />
        )}
      </Center>
    ));

  const showSliderButtons = thumbs.length > 4;

  useEffect(() => {
    () =>
      setFieldValue(`${values?.units[index]?.photos}`, {
        old_photos: photoUrls,
        new_photos: extractBase64(photoString),
      });
    files.length && setPhotoUrl(files?.filter(file => typeof file == 'string'));
    files.length &&
      setPhotoString(files?.filter(file => typeof file == 'object' && extractBase64([file])));
  }, [files]);

  useEffect(() => {
    return () => files && files?.forEach(file => URL.revokeObjectURL(file?.preview));
  }, []);

  return (
    <Box {...rest} w="full" h="full">
      <Stack my="5px" w="full" h={'auto'}>
        {componentTitle}

        {/* Validation response */}
        {isDragReject && <Text color="red">File type not accepted, sorry!</Text>}
        {isFileTooLarge && <Text color="red">File is too large.</Text>}
        {!isDocs && !setFieldValue && (
          <Box position="relative" w={showSliderButtons ? '100%' : 'full'} mx="auto" py="10px">
            {!!showSliderButtons && (
              <Center
                cursor={isLen ? 'pointer' : 'not-allowed'}
                opacity={isLen ? 1 : 0.5}
                bg="transparent"
                pos="absolute"
                top={'0px'}
                left={'-5px'}
                height={'100%'}
                fontWeight={'700'}
                onClick={() => slider.slidePrev()}
                fontSize="20px"
              >
                {/* &lt; */}
                <IoChevronBack />
              </Center>
            )}

            <Carousel
              showArrows={false}
              pagination={false}
              enableAutoPlay={false}
              autoPlaySpeed={1500}
              // breakPoints={breakPoints}
              showEmptySlots={true}
              ref={slider => setSlider(slider)}
              // itemPosition={!!showSliderButtons ? 'CENTER' : 'START'}
              itemPosition={consts.START}
              outerSpacing={0}
              itemsToShow={4}
            >
              {index ? thumbs[index] : thumbs}
              {files?.length < 4 &&
                Array(4 - files.length)
                  .fill('')
                  .map((el, i) => (
                    <Center
                      key={i}
                      alignItems={'center'}
                      justifyContent={'center'}
                      pos="relative"
                      borderRadius="12.3px"
                      // bg="lightgray"
                      ml={'10px'}
                      height={'75px'}
                      overflow="hidden"
                    >
                      <Flex
                        pos="absolute"
                        top={'0'}
                        left={'0'}
                        right={'0'}
                        bottom={'0'}
                        zIndex={'1'}
                      ></Flex>
                      <Image alt="Empty Image" objectFit="cover" src={imageFallback?.src} />
                    </Center>
                  ))}
            </Carousel>
            {!!showSliderButtons && (
              <Center
                cursor={isLen ? 'pointer' : 'not-allowed'}
                borderRadius={'full'}
                opacity={isLen ? 1 : 0.5}
                pos="absolute"
                top={'0px'}
                right={'-15px'}
                height={'100%'}
                fontSize="20px"
                fontWeight={'700'}
                onClick={() => slider.slideNext()}
              >
                {/* &gt; */}
                <IoChevronForward />
              </Center>
            )}
          </Box>
        )}
        <Flex
          w="full"
          pt="15px"
          {...getRootProps({className: 'dropzone'})}
          justifyContent={editUnitInfo ? 'start' : 'center'}
          ml={'20px'}
        >
          <input {...getInputProps()} />
          <Center
            cursor={'pointer'}
            type="button"
            color={editUnitInfo ? '#191919' : '#4545FE'}
            w="165px"
            bg={editUnitInfo ? 'transparent' : 'rgba(69, 69, 254, 0.1)'}
            borderRadius={'full'}
            // h="55px"
            border={editUnitInfo && '1px solid #191919'}
            position={editUnitInfo && 'absolute'}
            bottom={editUnitInfo && '6.5%'}
            p="12px 20px"
            fontSize={'13.4px'}
            fontWeight={'400'}
          >
            {editUnitInfo && (
              <Box mr="2">
                <UploadIcon />
              </Box>
            )}
            {editUnitInfo ? 'Upload image' : 'Add photos'}
          </Center>
        </Flex>
      </Stack>
    </Box>
  );
};

export default FileUploads;

// Styles
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
};

const thumb = {
  // borderRadius: '12.3px',
  // background: '#606060',
  // marginBottom: 8,
  // width: 'fit-content',
  // height: 77,
  // width: 77,
  // height: 75,
  // aspecRatio: '77 /75',
  // minWidth: '77px',
  // overflow: 'hidden',
  // position: 'relative',
};

const thumbInner = {
  display: 'flex',
  // width: 77,
  // height: 75,
  // minWidth: 0,
  // overflow: 'hidden',
};

const img = {
  display: 'flex',
  // width: '100%',
  // height: '100%',
  // background: '#606060',
  // borderRadius: 15,
};
