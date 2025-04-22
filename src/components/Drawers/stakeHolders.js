import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  ListItem,
  VStack,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import check from '../../images/check-circle.svg';

const StakeHolders = ({ drawerModal }) => {
  return (
    <Drawer isOpen={drawerModal?.isOpen} placement="right" onClose={drawerModal?.onClose} >
      <DrawerOverlay />
      <DrawerContent marginTop='65px' py="22px" maxW="400px" overflowY={'scroll'}>
        <DrawerCloseButton />
        {/* <DrawerBody> */}
        <Flex px={'21px'} justify="center" direction="column" gap="10px">
          <Image
            h="36px"
            w="36px"
            alt=""
            borderRadius={'21px'}
            src={check.src}
            border="6px solid rgba(69, 69, 254, 0.10)"
            bg="rgba(69, 69, 254, 0.10)"
          />
          <Text color="#191919" fontWeight={500} fontSize="18px">
            Stakeholders
          </Text>
        </Flex>
        <VStack
          px={'21px'}
          mt="20px"
          pt="20px"
          align="stretch"
          spacing={'20px'}
          color="#3D3D3D"
          fontSize={'14px'}
          fontWeight={400}
          bg="#FBFCFC"
        >
          <Text>
            {` In the context of fractional ownership, stakeholders from various professional domains
            play crucial roles in managing and facilitating the investment. Here's an explanation of
            what each of these stakeholders—legal, insurance, financial, and asset
            management—entails:`}
          </Text>
          <Text>
            <b>1. Legal Stakeholders:</b>
            <UnorderedList>
              <ListItem>
                Legal stakeholders in fractional ownership include legal professionals such as
                attorneys and legal advisors. They are responsible for ensuring that all legal
                aspects of the fractional ownership arrangement are properly addressed and compliant
                with relevant laws and regulations.
              </ListItem>
              <ListItem>
                Roles and Responsibilities:Drafting and reviewing contracts, agreements, and
                documentation related to the fractional ownership structure.
              </ListItem>
              <ListItem>Ensuring compliance with local real estate and securities laws.</ListItem>
              <ListItem>
                Addressing legal issues related to property ownership, liability, and dispute
                resolution.
              </ListItem>
              <ListItem>
                Providing legal guidance on governance, voting rights, and decision-making within
                the fractional ownership entity.
              </ListItem>
              <ListItem>Facilitating the purchase or sale of ownership shares.</ListItem>
            </UnorderedList>
          </Text>

          <Text>
            <b>2. Insurance Stakeholders:</b>
            <UnorderedList>
              <ListItem>
                Insurance stakeholders are professionals or firms specializing in insurance and risk
                management. Their role is to assess and mitigate risks associated with the
                fractional ownership property and its stakeholders.
              </ListItem>
              <ListItem>
                Roles and Responsibilities:Identifying and assessing potential risks, such as
                property damage, liability, or loss of rental income.
              </ListItem>
              <ListItem>
                Advising on and arranging insurance coverage to protect against identified risks.
              </ListItem>
              <ListItem>
                Managing claims and ensuring that the fractional ownership entity is adequately
                insured.
              </ListItem>
              <ListItem>
                Providing guidance on insurance requirements for investors and property management.
              </ListItem>
            </UnorderedList>
          </Text>

          <Text>
            <b>3. Financial Stakeholders:</b>
            <UnorderedList>
              <ListItem>
                Financial stakeholders encompass financial advisors, accountants, and professionals
                responsible for managing the financial aspects of the fractional ownership entity.
              </ListItem>
              <ListItem>
                Roles and Responsibilities:Financial analysis and modelling to assess the financial
                viability of the investment.
              </ListItem>
              <ListItem>
                Managing funds and financial transactions related to property acquisition,
                renovation, and ongoing expenses.
              </ListItem>
              <ListItem>Accounting, budgeting, and financial reporting to investors.</ListItem>
              <ListItem>
                Advising on tax implications and strategies related to fractional ownership.
              </ListItem>
              <ListItem>
                Evaluating the financial performance of the property and recommending strategies for
                optimizing returns.
              </ListItem>
            </UnorderedList>
          </Text>

          <Text>
            <b>4. Asset Management Stakeholders:</b>
            <UnorderedList>
              <ListItem>
                Asset management professionals are responsible for overseeing the day-to-day
                operations, maintenance, and performance of the fractional ownership property.
              </ListItem>
              <ListItem>
                Roles and Responsibilities:Property management, including tenant leasing, rent
                collection, and maintenance.
              </ListItem>
              <ListItem>Implementing property improvement or renovation plans.</ListItem>
              <ListItem>Monitoring property performance and addressing issues promptly.</ListItem>
              <ListItem>
                Strategic planning to enhance property value and investment returns.
              </ListItem>
              <ListItem>Ensuring compliance with property regulations and standards.</ListItem>
            </UnorderedList>
          </Text>

          <Text>
            {`These stakeholders collectively contribute to the success of a fractional ownership
            investment by providing their expertise in their respective domains. Effective
            collaboration among legal, insurance, financial, and asset management stakeholders is
            essential to manage risks, ensure compliance, optimize financial outcomes, and maintain
            the property's value and performance over time.`}
          </Text>
          <Text>
            Investors and property owners often rely on these professionals to navigate the
            complexities of fractional ownership and maximize the benefits of their investments.
          </Text>
        </VStack>
        {/* </DrawerBody> */}
      </DrawerContent>
    </Drawer >
  );
};

export default StakeHolders;
