import {VStack, Text} from '@chakra-ui/react';
import {WarningTwoIcon} from '@chakra-ui/icons';

export const EmptyStateComponent = ({description, ...rest}) => {
	return (
		<VStack spacing='none' mx='auto' w='full' h='full' py='70px' {...rest}>
			<WarningTwoIcon alt='empty warning icon' boxSize={'120px'} />
			<Text fontSize={'20px'} mt='16px' color='#3D3D3D' fontWeight={'700'}>
				{rest.title || 'No Favorites Found'}
			</Text>
			<Text w='full' textAlign='center' fontSize='14px' fontWeight='400' mx='auto' color='#919191' mt='12px'>
				{description || 'You do not have any favs yet...'}
			</Text>
		</VStack>
	);
};
