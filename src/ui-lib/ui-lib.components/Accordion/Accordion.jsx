import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import {BiMinusCircle, BiPlusCircle} from 'react-icons/bi';

export const CustomAccordion = ({
  isLast,
  isCustomIcon,
  headerColor,
  expandedBg,
  header,
  defaultCheckedIndex,
  noHeaderArrow,
  children,
  ...rest
}) => {
  return (
    <Box w="87%" bg="#FFFFFF" {...rest}>
      <Accordion
        defaultIndex={defaultCheckedIndex ?? ''}
        allowToggle
        allowMultiple={false}
        {...rest}
      >
        {isCustomIcon ? (
          <AccordionItem
            pb={'25px'}
            borderTop={'none'}
            borderBottom={isLast ? 'none' : '1px solid rgba(208, 213, 221, 0.20)'}
          >
            {({isExpanded}) => (
              <>
                <h2>
                  <AccordionButton
                    _active={{
                      borderColor: 'none',
                    }}
                    _visited={{
                      borderColor: 'none',
                    }}
                    _expanded={{bg: expandedBg || '#EAEAEA', borderRadius: '5px'}}
                  >
                    <Box
                      color={headerColor || '#000'}
                      fontFamily="Euclid Circular B"
                      fontSize="18px"
                      fontStyle="normal"
                      fontWeight="500"
                      lineHeight="normal"
                      as="span"
                      flex="1"
                      textAlign="left"
                    >
                      {header}
                    </Box>
                    {isExpanded ? <BiMinusCircle size={18} /> : <BiPlusCircle size={18} />}
                  </AccordionButton>
                </h2>
                <AccordionPanel py={0} px={expandedBg ? '0' : 'auto'}>
                  {children}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ) : (
          <AccordionItem borderTop={'none'}>
            <h2>
              <AccordionButton
                px={expandedBg && '0'}
                _active={{
                  borderColor: 'none',
                }}
                _visited={{
                  borderColor: 'none',
                }}
                _expanded={{bg: expandedBg || '#EAEAEA', borderRadius: '5px'}}
              >
                <Box
                  color={headerColor || '#000'}
                  fontFamily="Euclid Circular B"
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="normal"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  {header}
                </Box>
                {noHeaderArrow ? null : <AccordionIcon />}
              </AccordionButton>
            </h2>
            <AccordionPanel>{children}</AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </Box>
  );
};

export default CustomAccordion;
