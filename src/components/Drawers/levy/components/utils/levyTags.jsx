import {Avatar, Icon, Tag, TagLabel} from '@chakra-ui/react';
import React from 'react';
import clientTagIcon from '/src/images/icons/clientTagIcon.svg';
import profileIcon from '/src/images/icons/levyprofileIcon.svg';
import houseIcon from '/src/images/icons/houseIcon.svg';
import modernHomeIcon from '/src/images/icons/modernHomeIcon.svg';
import {RxCross2} from 'react-icons/rx';
import {motion} from 'framer-motion';

const LevyTags = ({text, avatar, canDelete, type}) => {
  const imageObj = {
    unit: modernHomeIcon.src,
    listing: houseIcon.src,
    everyone: clientTagIcon.src,
    client: profileIcon.src,
    avatar,
  };
  return (
    <Tag
      display="flex"
      as={motion.div}
      layout
      p="8px"
      w="fit-content"
      minW="fit-content"
      bg="#f4f4f5"
      border="0.5px solid #e4e4e5"
      borderRadius="34px"
      h="32px"
      alignItems="center"
      gap="4px"
    >
      {type ? <Avatar boxSize="16px" src={imageObj[type || 'everyone']} /> : null}
      <TagLabel fontSize="12px" fontWeight={400} color="#000000">
        {text}
      </TagLabel>
      {canDelete ? <Icon as={RxCross2} color="#dc2626" /> : null}
    </Tag>
  );
};

export default LevyTags;
