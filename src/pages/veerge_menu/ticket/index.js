import React from 'react';
import {LayoutView} from '../../../components';
import {Box, VStack, Stack, Text, Flex, Image, useToast, Center} from '@chakra-ui/react';
import ticket1 from '../../../images/veerge-menu/ticket/ticket1.png';
import ticket2 from '../../../images/veerge-menu/ticket/ticket2.png';
import ticket3 from '../../../images/veerge-menu/ticket/ticket3.png';
import ticket4 from '../../../images/veerge-menu/ticket/ticket4.png';
import ticket5 from '../../../images/veerge-menu/ticket/ticket5.png';
import ticket6 from '../../../images/veerge-menu/ticket/ticket6.png';
import ticket7 from '../../../images/veerge-menu/ticket/ticket7.png';
import ticket8 from '../../../images/veerge-menu/ticket/ticket8.png';
import ticket9 from '../../../images/veerge-menu/ticket/ticket9.png';
import ticket10 from '../../../images/veerge-menu/ticket/ticket10.png';
import ticket11 from '../../../images/veerge-menu/ticket/ticket11.png';
import ticket12 from '../../../images/veerge-menu/ticket/ticket12.png';
import ticket13 from '../../../images/veerge-menu/ticket/ticket13.png';
import ticket14 from '../../../images/veerge-menu/ticket/ticket14.png';
import ticket15 from '../../../images/veerge-menu/ticket/ticket15.png';
import ticket16 from '../../../images/veerge-menu/ticket/ticket16.png';
import ticket17 from '../../../images/veerge-menu/ticket/ticket17.png';
import {BiChevronRight} from 'react-icons/bi';
import {CreateToast} from 'ui-lib/ui-lib.components';
import {CreateCustomToast} from '@/components/veergeMenu/ticket/CreateCustomToast';

const VeergeMenuTicket = () => {
  const toast = useToast();
  const toaster = CreateCustomToast({position: 'top-right', heading: 'Ticket Unavailable'});

  const ticketsData = [
    {
      title: 'Service Desk',
      description:
        'Centralized support system for handling internal and external inquiries related to property development projects. Efficiently manages communication and issue resolution.',
      image: ticket1.src,
    },
    {
      title: 'Procurement',
      description:
        'Streamlines the procurement process for construction materials, services, and equipment. Ensures timely acquisition and cost-effective sourcing.',
      image: ticket2.src,
    },
    {
      title: 'Budget Creation',
      description:
        'Facilitates the creation and management of budgets for property development projects. Helps allocate funds judiciously and ensures financial control.',
      image: ticket3.src,
    },
    {
      title: 'Event Planning',
      description:
        'Comprehensive tool for planning and coordinating property-related events, such as project launches and community engagement activities.',
      image: ticket4.src,
    },
    {
      title: 'Lead Tracking',
      description:
        'Tracks potential leads and opportunities for property development projects. Provides insights into market trends and customer preferences.',
      image: ticket5.src,
    },
    {
      title: 'Top Level Management',
      description:
        'Dashboard offering a high-level overview of ongoing property development projects. Presents key performance indicators and strategic insights for top management.',
      image: ticket6.src,
    },
    {
      title: 'General Service Management',
      description:
        'Versatile module for managing various services related to property development, such as landscaping, maintenance, and utilities.',
      image: ticket7.src,
    },
    {
      title: 'Project Management',
      description:
        'Tailored project management platform for overseeing the lifecycle of property development projects. Supports collaboration, task management, and milestone tracking.',
      image: ticket8.src,
    },
    {
      title: 'Process Control',
      description:
        'Optimizes and regulates processes specific to property development. Enhances efficiency in planning, approvals, and construction workflows.',
      image: ticket9.src,
    },
    {
      title: 'Sales Pipeline',
      description:
        'Manages the sales process for property units. Visualizes the sales pipeline from lead generation to closing deals.',
      image: ticket10.src,
    },
    {
      title: 'Kanban',
      description:
        'Implements Kanban methodology for visualizing and managing tasks related to property development projects. Enhances project flow and team collaboration.',
      image: ticket11.src,
    },
    {
      title: 'Scrum',
      description:
        'Supports agile development practices in property development projects. Facilitates sprint planning, backlog management, and iterative progress.',
      image: ticket12.src,
    },
    {
      title: 'Go to Market',
      description:
        'Coordinates the strategic approach to bringing property projects to market. Integrates marketing, sales, and customer engagement efforts.',
      image: ticket13.src,
    },
    {
      title: 'Document Approval',
      description:
        'Facilitates the approval of crucial documents related to property development, such as plans, permits, and contracts.',
      image: ticket14.src,
    },
    {
      title: 'Campaign Management',
      description:
        'Manages marketing campaigns specific to property development projects. Coordinates efforts to create awareness and attract potential buyers.',
      image: ticket15.src,
    },
    {
      title: 'Content Management',
      description:
        'Centralized platform for managing and distributing content related to property developments. Ensures consistency in branding and messaging.',
      image: ticket16.src,
    },
    {
      title: 'Personal Task Planning',
      description:
        'Empowers individuals within the property development team to manage their tasks and responsibilities. Enhances personal productivity and project contributions.',
      image: ticket17.src,
    },
  ];

  const handle_click = () => {
    return toaster(
      'Unfortunately, you are ineligible to use this feature. Kindly contact support for assistance',
      {
        w: 'fit-content',
        whiteSpace: 'nowrap',
        position: 'fixed',
        right: '5px',
        top: '70px',
      }
    );
  };

  return (
    <Stack minH="100vh" bg="#F9FAFB" pb="60px">
      <LayoutView />
      <Box mt="-83vh" color="#191919" fontFamily="Euclid Circular B" w="1283px" mx="auto">
        <Text fontSize="32px" fontStyle="normal" fontWeight="700" lineHeight="normal" mb={'28px'}>
          Ticket
        </Text>
        <VStack spacing={'24px'} px="49px">
          {ticketsData.map(ticket => (
            <Flex
              cursor={'pointer'}
              key={ticket.title}
              align={'center'}
              shadow={'sm'}
              justify={'flex-start'}
              bg="#fff"
              h="188px"
              borderRadius={'8px'}
              onClick={handle_click}
              border={`1px solid #EAECF0`}
              gap={`10px`}
              w={`100%`}
              // shadow={`0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F2F4F7`}
            >
              {/* <Center
                position={`relative`}
                aspectRatio={`146 / 188`}
                minW={`146px`}
                overflow={`hidden`}
              > */}
              <Image alt="veerge ticket" src={ticket.image} h="full" />
              {/* </Center> */}
              <Flex w="90%" px="24px" py="32px" align={'center'} justify={'space-between'}>
                <VStack w="80%" align={'stretch'}>
                  <Text fontSize={'28px'} fontWeight={500} color="#3d3d3d" lineHeight={'normal'}>
                    {ticket.title}
                  </Text>
                  <Text fontSize={'16px'} fontWeight={400} color="#4b4b4b" lineHeight={'28px'}>
                    {ticket.description}
                  </Text>
                </VStack>
                <BiChevronRight size={24} />
              </Flex>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Stack>
  );
};

export default VeergeMenuTicket;
