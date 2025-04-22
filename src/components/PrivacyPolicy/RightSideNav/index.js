import React, {useState} from 'react';
import {Flex, Image, Text} from '@chakra-ui/react';
// import file from '../../assets/icons/file.png';
import styles from './Rightsidenav.module.css';
import Link from 'next/link';

export const PrivacyPolicyRightSideNav = () => {
  const [style, setStyle] = useState('navigation');
  const handleClick = () => {
    setStyle('bluenav');
  };
  return (
    <div className={styles.rightsidenav}>
      {/* <Text className='article_text'>In this article</Text> */}
      <a target="_blank" href="https://veerge-support.myxellia.io/terms">
        <Text
          color="#4545FE"
          fontSize="14px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
        >
          Terms of service
        </Text>
      </a>
    </div>
  );
};

export default PrivacyPolicyRightSideNav;
