import {Avatar, Box, Flex, Image, Stack, StackDivider, Text} from '@chakra-ui/react';
import React, {useState} from 'react';
import profileIcon from '/src/images/icons/levyprofileIcon.svg';
import houseIcon from '/src/images/icons/houseIcon.svg';
import modernHomeIcon from '/src/images/icons/modernHomeIcon.svg';
import rightArrow from '/src/images/icons/RightArrowForListingScheduledInspection.svg';
import {motion} from 'framer-motion';
import CustomCheckBox from '../utils/CustomCheckBox';
import SourceCheck from '../checkbox/sourceCheck';
import SourceOptions from './sourceOptions';
import UserOptionsMenu from './userOptionsMenu';

const GroupMenu = ({isFocus, userRef}) => {
  return isFocus ? (
    <UserOptionsMenu userRef={userRef} isFocus={isFocus} />
  ) : (
    <SourceOptions isFocus={isFocus} />
  );
};

export default GroupMenu;
