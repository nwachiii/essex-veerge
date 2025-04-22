/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import unchecked from '/src/images/icons/quick_start_unchecked_icon.svg';
import checked from '/src/images/icons/quick_start_checked_icon.svg';
import arrowUpDown from '/src/images/icons/quick_start_arrow_up_icon.svg';
import crossedCircle from '/src/images/icons/crossd_circle_veerge_assistance.svg';
import bulbIcon from '/src/images/icons/bulb_veerge_assistance.svg';
import {AnimatePresence, motion} from 'framer-motion';
import React, {useRef, useState} from 'react';
import {quickStartArray} from '../../constants/quickstart';
import chatIcon from '/src/images/icons/chatMessageIcon.svg';

import styled from '@emotion/styled';
import btnStyles from 'ui-lib/ui-lib.components/Button/Btn.module.css';
import {useMutation} from '@tanstack/react-query';
import {updateVeergeAssistant} from 'apis/FetchDashboard';
import {toastForError} from 'utils/toastForErrors';
import {useEffect} from 'react';

export const QuickStart = ({first_name, last_name, in_review}) => {
  let quickTourInfo;

  const toast = useToast();

  const mutation = useMutation(() => updateVeergeAssistant(), {
    onSuccess: res => {
      localStorage.setItem('quickStart', JSON.stringify(res?.data?.quick_start));
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const updateQuickStart = () => {
    mutation.mutate();
  };

  try {
    quickTourInfo =
      typeof window !== 'undefined' &&
      localStorage &&
      JSON.parse(localStorage.getItem('quickStart'));
  } catch (err) {
    console.log(err);
  }
  useEffect(() => {
    const handleStorageChange = event => {
      if (event.key === 'quickStart') {
        try {
          quickTourInfo = JSON.parse(event.newValue);
        } catch (err) {
          console.log(err);
          return;
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [tourIndex, setTourIndex] = useState(
    quickStartArray(first_name, last_name).findIndex(item => !quickTourInfo?.[item.type])
  );

  const [isQuickStartOpen, setQuickStartOpen] = useState(true);
  const [willDisplay, setWillDisplay] = useState(true);

  const hasQuickStartBeenCompleted = () => {
    return quickStartArray(first_name, last_name).every((item, idx) => {
      return quickTourInfo?.[item.type];
    });
  };
  const listRef = useRef([]);

  const quickStartData = quickStartArray(
    first_name,
    last_name,
    updateQuickStart,
    mutation.isLoading
  ).map((item, idx) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef(null);
    listRef.current[idx] = ref;

    const client = listRef.current[idx].current?.getBoundingClientRect();

    return quickTourInfo?.[item.type] ? (
      ''
    ) : (
      <Stack bg="#ffffff" spacing="15px" key={idx} w="full" p="14px">
        <HStack
          cursor="pointer"
          onClick={() => setTourIndex(tourIndex === idx ? '' : idx)}
          align="flex-start"
          w="full"
          justify="space-between"
        >
          <Box>
            {quickTourInfo?.[item.type] ? (
              <Image alt="check state" src={checked.src} />
            ) : (
              <Image alt="uncheck state" src={unchecked.src} />
            )}
          </Box>
          <Text w="270px" lineHeight="18px" fontSize="16px" fontWeight="500" color="#000000">
            {item.topic}
          </Text>
          <Box>
            <motion.div
              animate={{rotate: tourIndex === idx ? 540 : 0}}
              transition={{duration: 0.6}}
            >
              <Image
                transform="rotate(180deg)"
                alt="direction icon"
                fontSize="9px"
                src={arrowUpDown.src}
              />
            </motion.div>
          </Box>
        </HStack>
        <AnimatePresence initial="true" mode="wait">
          <Box
            transition="ease-in-out 0.5s "
            h={tourIndex !== idx ? '0px' : `${client?.height}px`}
            style={{overflow: 'hidden'}}
          >
            <Box ref={ref} color="#3D3D3D">
              {item.content}
            </Box>
          </Box>
        </AnimatePresence>
      </Stack>
    );
  });

  return (
    <AnimatePresence initial="true" mode="wait">
      {
        // willDisplay ? (
        hasQuickStartBeenCompleted() ? (
          ''
        ) : (
          <Wrapped>
            <VeergeAssistanceWidget setWillDisplay={setWillDisplay} willDisplay={willDisplay} />

            <VStack
              as={motion.div}
              transition={{type: 'tween', duration: 0.9}}
              w="380px"
              spacing="none"
              // zIndex="500"
              zIndex={2445}
              position="fixed"
              className={`${!willDisplay ? 'veergeout' : 'veergein'}`}
            >
              <HStack
                overflow="hidden"
                justify="center"
                bg="#4545FE"
                h="72px"
                w="full"
                borderRadius="8px 8px 0 0"
                position="relative"
              >
                <HStack
                  position="absolute"
                  bottom="-35px"
                  left="-35px"
                  p="5px"
                  borderRadius="full"
                  border="solid 1px #FFFFFF66"
                >
                  {' '}
                  <Box boxSize="62px" bg="#FFFFFF1A" borderRadius="full"></Box>
                </HStack>
                <HStack
                  position="absolute"
                  bottom="-45px"
                  right="7%"
                  p="5px"
                  borderRadius="full"
                  border="solid 1px #FFFFFF66"
                >
                  {' '}
                  <Box boxSize="62px" bg="#FFFFFF1A" borderRadius="full"></Box>
                </HStack>
                <HStack
                  position="absolute"
                  top="-52%"
                  left="13%"
                  p="5px"
                  borderRadius="full"
                  border="solid 1px #FFFFFF66"
                >
                  {' '}
                  <Box boxSize="62px" bg="#FFFFFF1A" borderRadius="full"></Box>
                </HStack>
                <HStack
                  position="absolute"
                  top="-50%"
                  right="12%"
                  p="5px"
                  borderRadius="full"
                  border="solid 1px #FFFFFF66"
                >
                  {' '}
                  <Box boxSize="62px" bg="#FFFFFF1A" borderRadius="full"></Box>
                </HStack>

                <Box
                  position="absolute"
                  w="50px"
                  h="50px"
                  bg="blue.300"
                  pointerEvents="none"
                  opacity="0"
                  borderRadius="50%"
                  animation={`${btnStyles.pulseAnimation} 1.5s 0.5s forwards `}
                />

                <Text
                  fontFamily="DM Sans"
                  as="span"
                  fontSize="20px"
                  fontWeight="700"
                  color="#ffffff"
                >
                  Veerge Assistant
                </Text>
              </HStack>
              <AnimatePresence initial="true" mode="wait">
                {isQuickStartOpen ? (
                  <QuickWrap
                    initial={{y: '50px', opacity: 0}}
                    animate={{y: '0', opacity: 1}}
                    transition={{type: 'tween', duration: 0.4}}
                    exit={{height: 0}}
                  >
                    <VStack
                      divider={<StackDivider borderColor="gray.200" />}
                      as="ul"
                      w="full"
                      bg="#F6F6F6"
                      borderRadius="0 0 10px"
                      px="11px"
                      pb="12px"
                      spacing="none"
                      border="1px solid gray.200"
                    >
                      {quickStartData}
                    </VStack>
                  </QuickWrap>
                ) : (
                  ''
                )}
              </AnimatePresence>
            </VStack>
          </Wrapped>
        )
      }
      ;
    </AnimatePresence>
  );
};

export default QuickStart;

const VeergeAssistanceWidget = ({setWillDisplay, willDisplay}) => {
  const [displayWidget, setDisplayWidget] = useState(true);

  const handleWidgetToggle = () => {
    !willDisplay ? setWillDisplay(!willDisplay) : setWillDisplay(false);
  };
  return (
    <Box
      as={motion.div}
      layout
      onClick={handleWidgetToggle}
      initial={{width: '46px'}}
      zIndex={2445}
      spacing="10px"
      bottom="3.2%"
      right="5%"
      position="fixed"
      cursor={'pointer'}
      animate={{width: !willDisplay ? '236px' : '46px', transition: {type: 'string'}}}
      exit={{width: '46px', opacity: 1}}
      // transition={{type: 'spring'}}
      overflow="hidden"
      bg="#4545FE"
      borderRadius="70px"
    >
      <HStack as={motion.div} h="46px" px="15px" py="15px" spacing="8px">
        {!willDisplay ? (
          <>
            {' '}
            <Image
              animation={`${btnStyles.wobbleAnimation} 4s  infinite`}
              alt="bulb icon"
              src={bulbIcon.src}
            />
            <Text
              cursor="pointer"
              fontSize="18px"
              whiteSpace="nowrap"
              fontWeight="400"
              color="#FFFFFF"
            >
              Veerge Assistant
            </Text>
          </>
        ) : (
          <Image alt="crossed circle icon" src={crossedCircle.src} />
        )}
      </HStack>
    </Box>
  );
};

const Wrapped = styled.div`
  position: relative;
  z-index: 2445;
  .veergein {
    opacity: 1;
    right: 6%;
    transform: scaleY(1);
    transform: scaleX(1);
    transition: ease-in 0.5s;
    transform-origin: 100% 0%;
    bottom: 9.6%;
  }

  .veergeout {
    transition: ease-in 0.3s;
    right: 6%;
    transform: scaleY(0);
    transform: scaleX(0);
    transform-origin: 100% 0%;
    opacity: 0;
    bottom: 7vh;
  }
`;

const QuickWrap = styled(motion.div)`
  overflow: auto;

  width: 100%;
  max-height: 500px;
  box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 16px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;

    background-color: #aaaaaa;
    // outline: 1px solid slategrey;
  }
`;
