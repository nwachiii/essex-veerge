import {Box, HStack, Tooltip, VStack} from '@chakra-ui/react';
import React from 'react';
import {MultipleFileUploads} from '../../../../ui-lib';
import imageIcon from '../../../../images/icons/image-upload.png';

export default function ListingDetailsFileUpload({handleEditImages, files, setFiles}) {
  return (
    <HStack w="full" justify="space-between" align="baseline">
      <MultipleFileUploads
        type="image/*"
        files={files}
        setFiles={setFiles}
        icon={imageIcon.src}
        handleEditImages={handleEditImages}
        title={`You can easily add images to your listing by uploading them or simply dragging & dropping. Please note that the maximum number of images allowed is 10`}
      />
    </HStack>
  );
}
