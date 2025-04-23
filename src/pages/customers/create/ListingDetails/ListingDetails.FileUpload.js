import {Box, HStack, Tooltip, VStack} from '@chakra-ui/react';
import React from 'react';
import {MultipleFileUploads} from '../../../../ui-lib';

import imageIcon from '../../../../images/icons/image-upload.png';
import reelIcon from '../../../../images/icons/reel-upload.png';

export default function ListingDetailsFileUpload({
  files,
  setFiles,
  reelFiles,
  setReelFiles,
  ...rest
}) {
  return (
    <HStack w="full" justify="space-between" align="baseline">
      <MultipleFileUploads
        title={`You can easily add images to your listing by uploading them or simply dragging & dropping. Please note that the maximum number of images allowed is 10`}
      
        icon={imageIcon.src}
        files={files}
        setFiles={setFiles}
        type="image/*"
        {...rest}
      />
      {/* <Tooltip label='Drag and Drop files /Click to select' aria-label='Drag and Drop files /Click to select'>
				<MultipleFileUploads
					title='Upload Reel'
					icon={reelIcon.src}
					files={reelFiles}
					setFiles={setReelFiles}
					type='video/*'
					maxFiles={1}
				/>
			</Tooltip> */}
    </HStack>
  );
}
