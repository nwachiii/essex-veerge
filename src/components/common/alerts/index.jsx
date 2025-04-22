    import React, {useState, useEffect} from 'react';
    import {Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton} from '@chakra-ui/react';
    import {motion, AnimatePresence} from 'framer-motion';

    export const MyxelliaAlert = ({
    alertTitle,
    alertText,
    status,
    variant,
    onClose,
    description,
    ...rest
    }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
        }, 6000); // 6 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleAlertClose = () => {
        setIsVisible(false);
        if (onClose) onClose(); // Trigger the optional onClose callback, if any
    };

    return (
        <AnimatePresence>
        {isVisible && (
            <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            transition={{duration: 0.3}}
            >
            <Alert
                status={status || 'warning'}
                variant={variant || 'left-accent'}
                w="full"
                h="70px"
                rounded={'lg'}
                {...rest}
            >
                <AlertIcon />
                <AlertTitle fontSize="md">{alertTitle || `Myxellia Alert:`}</AlertTitle>
                <AlertDescription fontSize="sm">
                {alertText || `Something doesn't seem right, please check your details and try again`}
                </AlertDescription>
                <CloseButton top={1.5} right={2} position="absolute" onClick={handleAlertClose} />
            </Alert>
            </motion.div>
        )}
        </AnimatePresence>
    );
    };
