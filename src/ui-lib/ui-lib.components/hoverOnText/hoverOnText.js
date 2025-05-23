import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {truncateLongText} from '../../../utils/truncateLongText';

const HoverText = ({
  text,
  forPopUp,
  popUpCom,
  lens,
  component,
  pContentStyle,
  pBodyStyle,
  ...rest
}) => {
  const {isOpen, onToggle, onOpen, onClose} = useDisclosure();

  return (
    <Popover placement="top" autoFocus={false} isOpen={isOpen} onClose={onClose}>
      {/* <Button > */}
      <PopoverTrigger>
        {component ? (
          component({
            onMouseLeave: () => (!text ? null : onClose()),
            onMouseEnter: () => (!text ? null : onOpen()),
          })
        ) : (
          <Text
            onMouseLeave={() => (text.length <= (lens ?? 17) ? null : onClose())}
            onMouseEnter={() => (text.length <= (lens ?? 17) ? null : onOpen())}
            fontSize={'16px'}
            fontWeight="500"
            textAlign={'left'}
            pr="7px"
            wordWrap="break-word"
            textTransform="capitalize"
            wordBreak="break-word"
            overflowWrap="break-word"
            whiteSpace="normal"
            {...rest}
          >
            {truncateLongText(text, lens)?.truncatedText}
          </Text>
        )}
      </PopoverTrigger>
      <PopoverContent w="fit-content" {...pContentStyle}>
        <PopoverArrow />

        <PopoverBody
          boxShadow="0 1px 4px rgba(0, 0, 0, 0.08)"
          //   border="solid black 1px"

          borderRadius="8px"
          {...pBodyStyle}
        >
          {popUpCom ? (
            popUpCom
          ) : (
            <Text
              w="fit-content"
              fontSize={'16px'}
              fontWeight="500"
              textAlign="center"
              whiteSpace="break-spaces"
              {...forPopUp}
            >
              {text}
            </Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HoverText;
