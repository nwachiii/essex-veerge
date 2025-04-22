import {Center} from '@chakra-ui/react';
import React from 'react';
import {AnimatedLoader} from '../common/loaders/AnimatedLoader';
import {LayoutView} from './LayoutView';

export const PageLoader = () => {
  return (
    <div style={{color: '#FAFAFA', minHeight: '100vh'}}>
      <LayoutView hideProgressBarLoader initial_status="true" isActive="" isPending="true">
        <Center bg="#FAFAFA" w="100vw">
          <AnimatedLoader />
        </Center>
      </LayoutView>
    </div>
  );
};

export default PageLoader;
