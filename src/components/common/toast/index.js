    import React, {useState} from 'react';
    import {Box, IconButton, Text} from '@chakra-ui/react';
    import {CloseIcon} from '@chakra-ui/icons';

    export const MyxelliaToast = ({
    title,
    onClose,
    description,
    titleStyle = {},
    background = '#191919',
    position = 'top-right',
    ...rest
    }) => {
    const [isVisible, setIsVisible] = useState(true);

    // Position styles based on the `position` prop
    const getPositionStyles = pos => {
        const offset = '0';
        switch (pos) {
        case 'top-left':
            return {top: offset, left: offset};
        case 'top-right':
            return {top: offset, right: offset};
        case 'bottom-left':
            return {bottom: offset, left: offset};
        case 'bottom-right':
            return {bottom: offset, right: offset};
        default:
            return {top: offset, left: offset};
        }
    };

    // Base text styles for the toast
    const toastTextStyles = {
        textAlign: 'left',
        color: '#FFFFFF',
        fontFamily: 'Syne',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'normal',
        py: 1,
    };

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose(); // Trigger the optional onClose callback
    };

    if (!isVisible) return null;

    return (
        <Box
        position="fixed" // Use fixed positioning to reference the viewport
        px={5}
        py={2}
        w="420px"
        zIndex={9999}
        color="white"
        h="fit-content"
        bg={background}
        borderRadius="md"
        {...getPositionStyles(position)}
        {...rest}
        >
        <IconButton
            aria-label="Close toast"
            icon={<CloseIcon />}
            size="sm"
            position="absolute"
            top="8px"
            right="8px"
            color="white"
            bg="transparent"
            _hover={{bg: 'rgba(255, 255, 255, 0.1)'}}
            onClick={handleClose}
        />
        {title && (
            <Text {...toastTextStyles} style={titleStyle}>
            {title}
            </Text>
        )}
        <Text {...toastTextStyles} fontSize="14px" fontWeight="normal" fontFamily="Euclid Circular B">
            {description}
        </Text>
        </Box>
    );
    };
