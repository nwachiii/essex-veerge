import SmallCloseIcon from '/src/images/icons/cancleBig.png';
import {HStack, Icon, Image, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {themeStyles} from '../../../../theme';
import {formatAmount} from '../../../../utils';
import {formatToCurrency} from 'utils/formatAmount';

export const PreviewOtherFees = ({otherFees, index, showPreview, setFieldValue}) => {
  const removeFee = indx => {
    let copy = [...otherFees];
    if (copy.length === 1) {
      copy = [
        {
          name: '',
          amount: '',
        },
      ];
    } else {
      for (let i = 0; i < copy.length; i++) {
        if (i == indx) {
          copy?.splice(i, 1);
          i = copy?.length;
        }
      }
    }

    setFieldValue(`units.${index}.fees`, copy);
  };
  return (
    <div>
      {showPreview == 'true' && otherFees[0].name !== '' && otherFees.length > 0
        ? otherFees.map((fee, num) => (
            <Stack
              key={num}
              {...themeStyles.componentStyles.cardOne}
              mt={0}
              maxW="1203px"
              h="93px"
              bg="#F5F5F5"
            >
              <HStack justify="space-between" h="62px" align="center">
                <Text flex={1} color="#191919" fontWeight={400} fontSize="20px" lineHeight="25px">
                  {fee.name}
                </Text>
                <HStack spacing={4}>
                  {fee?.amount && (
                    <Text color="#191919" fontWeight={500} fontSize="20px" lineHeight="30px">
                      {
                        // formatAmount(fee?.amount) == '0.00'
                        //   ? `₦ ${formatAmount(fee?.amount)}`
                        //   : `₦ ${formatAmount(fee?.amount)}.00`
                        formatToCurrency(fee?.amount)
                      }
                    </Text>
                  )}
                  {/* <Icon
									width='30px'
									height='30px'
									color='red'
									cursor='pointer'
									alt='cancel_icon'
									as={SmallCloseIcon}
									onClick={() => removeFee(fee)}
								/> */}
                </HStack>
                <HStack
                  spacing={4}
                  justify="space-between"
                  align="center"
                  onClick={() => removeFee(num)}
                >
                  <Image
                    src={SmallCloseIcon.src}
                    cursor="pointer"
                    width="30px"
                    height="30px"
                    alt="cancel_icon"
                    color="red"
                  />
                </HStack>
              </HStack>
            </Stack>
          ))
        : null}
    </div>
  );
};

export default PreviewOtherFees;
