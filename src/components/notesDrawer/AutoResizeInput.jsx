import React, {useState, useRef, useEffect} from 'react';
import {
  Box,
  Input,
  VStack,
  HStack,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import avatarSm from '/src/images/avatar.svg';
import {TbSend} from 'react-icons/tb';
import {VscSend} from 'react-icons/vsc';
import {encodeFileToBase64} from 'utils';
import CameraIcon from '/src/images/icons/camera-note.svg';
import AttachIcon from '/src/images/icons/attach-circle.svg';
import CloseIcon from '/src/images/icons/close-icon-blue.svg';
import {useMutation} from '@tanstack/react-query';
import {UpdateNotes} from 'apis/fetchNotes';
import {toastForError} from 'utils/toastForErrors';
import {useFormik} from 'formik';
import {ImAttachment} from 'react-icons/im';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {width: '4px', borderRadius: '16px', display: 'none'},
  '&::-webkit-scrollbar-track': {borderRadius: '16px', WebkitBoxShadow: 'inset 0 0 6px #fafafa'},
  '&::-webkit-scrollbar-thumb': {borderRadius: '16px', backgroundColor: '#cbcbcb'},
};

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 36px;
  padding: 10px;
  border: 0.5px solid #e4e4e7;
  border-radius: 4px;
  resize: none;
  font-size: 14px;
  white-space: break-spaces;
  // word-break: break-all;

  line-height: 1.5;
  overflow-y: auto;
  color: transparent;
  caret-color: #191919;
  position: relative;

  z-index: 2;
  background: #FAFAFA;

  &:focus {
    outline: none;
    border-color: #4545fe;
  }
`;

const HighlightOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 45px;
  max-height: 150px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
  // white-space: pre-wrap;
  white-space: break-spaces;
  word-wrap: break-word;
  // word-break: break-all;
  pointer-events: none;
  z-index: 1;
  color: #191919;

  .highlight {
    color: #4545fe;
    // background: rgba(0,0,255,0.5);
  }
`;

const AutoResizeInput = ({
  value,
  onChange,
  userId,
  refetch,
  drawermarginTop,
  onSubmit,
  customScrollStyle,
  toast,
  suggestions,
}) => {
  const [menuPosition, setMenuPosition] = useState({top: 0, left: 0});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const textAreaRef = useRef(null);
  const sugListRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const [highlightedContent, setHighlightedContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [email, setEmail] = useState([]);

  const formik = useFormik({
    initialValues: {notes: ''},
    onSubmit: async values => {
      let newEmail = email.length < 1 ? [] : email;
      const body = {
        id: userId,
        email: newEmail,
        ...values,
      };
      if (uploadedImages.length > 0) {
        try {
          const imageBase64Array = await Promise.all(
            uploadedImages.map(image => encodeFileToBase64(image))
          );
          body.files = imageBase64Array;
        } catch (error) {
          toastForError(error, true, toast);
        }
      }
      return mutation.mutate(body);
    },
  });

  useEffect(() => {
    if (textAreaRef.current) {
      console.log(textAreaRef.current.scrollHeight);
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${Math.min(Math.max(textAreaRef.current.scrollHeight, 36), 150)}px`;
    }
  }, [formik.values.notes]);

  useEffect(() => {
    // Sync scroll position between textarea and overlay
    if (textAreaRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  }, [formik.values.notes]);

  useEffect(() => {
    let taggedUsersEmail = [];
    let content = formik.values.notes;

    // Replace tagged users with highlighted spans
    formik.values.notes.split(' ').forEach((word, idx) => {
      const textArray = formik.values.notes.split(' ');
      if (word.startsWith('@')) {
        const firstName = word.replace('@', '');
        const lastName = textArray[idx + 1];
        const name = `${firstName} ${lastName}`;
        const taggedUser = suggestions?.find(item => item.name === name);
        if (taggedUser) {
          taggedUsersEmail.push(taggedUser.email);
          const taggedText = `@${taggedUser.name}`;
          content = content.replaceAll(
            taggedText,
            `<span class=\"highlight\">${taggedText}</span>`
          );
        }
      }
    });

    setEmail(taggedUsersEmail);
    setHighlightedContent(content);
  }, [formik.values.notes, suggestions]);

  const handleKeyDown = e => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredSuggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(
          prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length
        );
      } else if (e.key === 'Enter' && filteredSuggestions.length > 0) {
        e.preventDefault();
        handleSuggestionSelect(filteredSuggestions[selectedIndex]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleInput = e => {
    const text = e.target.value;
    const cursorPosition = e.target.selectionStart;
    formik.setFieldValue('notes', text);

    // Find the word containing the cursor
    const textBeforeCursor = text.slice(0, cursorPosition);
    const wordsBeforeCursor = textBeforeCursor.split(/\s/);
    const currentWord = wordsBeforeCursor[wordsBeforeCursor.length - 1];
    const precedingWord = wordsBeforeCursor[wordsBeforeCursor.length - 2] ?? '';

    // Check if current word starts with @
    if (currentWord && (currentWord.startsWith('@') || precedingWord.startsWith('@'))) {
      const searchTerm = `${currentWord.startsWith('@') ? '' : precedingWord} ${currentWord}`
        .slice(1)
        .replace('@', '')
        .toLowerCase();

      const filtered = searchTerm
        ? suggestions.filter(suggestion => suggestion.name.toLowerCase().includes(searchTerm))
        : suggestions;
      setFilteredSuggestions(filtered);

      const textArea = e.target;
      const rect = textArea.getBoundingClientRect();

      // Create a mirror div to calculate cursor position
      const mirror = document.createElement('div');
      mirror.style.cssText = window.getComputedStyle(textArea).cssText;
      mirror.style.height = 'auto';
      mirror.style.width = `${textArea.offsetWidth}px`;
      mirror.style.position = 'absolute';
      mirror.style.visibility = 'hidden';
      mirror.style.fontSize = '14px';
      mirror.style.lineHeight = ' 1.5';
      mirror.style.padding = '10px';
      mirror.style.whiteSpace = 'pre-wrap';
      mirror.style.wordWrap = 'break-word';
      mirror.textContent = textBeforeCursor;

      const textAreaLineHeight = 27;
      document.body.appendChild(mirror);

      const cursorTop = mirror.offsetHeight - textArea.scrollTop - textAreaLineHeight;
      document.body.removeChild(mirror);

      const cursorLeft = rect.left + 10; // Add small offset

      setTimeout(() => {
        const listHeight = sugListRef.current.offsetHeight;
        const top = Math.max(0, rect.top - listHeight + cursorTop);

        setMenuPosition({
          top: `calc(${top}px - ${drawermarginTop})`,
          left: Math.max(0, Math.min(cursorLeft, window.innerWidth - 352)),
        });

        setShowSuggestions(filtered.length ? true : false);
        setSelectedIndex(0);
      });
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = suggestion => {
    const text = formik.values.notes;
    const cursorPosition = textAreaRef.current.selectionStart;
    const textBeforeCursor = text.slice(0, cursorPosition);
    const textAfterCursor = text.slice(cursorPosition);

    // Find the start of the current @mention before cursor
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    const wordStart = lastAtIndex;

    // Find the end of the current word
    const wordEnd = textBeforeCursor.slice(lastAtIndex).search(/\s/) + lastAtIndex;
    const finalWordEnd = wordEnd === lastAtIndex - 1 ? cursorPosition : wordEnd;

    // Construct the new text by replacing only the @mention portion
    const newText = text.slice(0, wordStart) + `@${suggestion.name} ` + text.slice(finalWordEnd);

    formik.setFieldValue('notes', newText);
    setShowSuggestions(false);

    // Set cursor position after the inserted mention
    setTimeout(() => {
      const newPosition = wordStart + suggestion.name.length + 2; // +2 for @ and space
      textAreaRef.current.setSelectionRange(newPosition, newPosition);
      textAreaRef.current.focus();
    }, 0);
  };

  const mutation = useMutation(data => UpdateNotes(data), {
    onSuccess: async res => {
      const endOfListRef = document.getElementById('endOfListRef');

      showSuggestions && setShowSuggestions(false);

      await refetch();
      formik.resetForm();
      setTimeout(() => {
        endOfListRef?.scrollIntoView({behavior: 'smooth'});
      }, 50);

      removeImage(null);
      setEmail([]);
      setUploadedImages([]);
    },
    onError: err => {
      return toastForError(err, true, toast);
    },
  });

  const addImage = images => {
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const validImages = Array.from(images).filter(image => validExtensions.includes(image.type));
    setUploadedImages(prev => [...prev, ...validImages]);
  };

  const handleImageChange = e => {
    if (e.target.files?.length) {
      addImage(e.target.files);
    }
  };

  const removeImage = index => {
    if (index === null) {
      setUploadedImages([]);
    } else {
      setUploadedImages(prev => prev.filter((_, i) => i !== index));
    }
    if (uploadedImages.length === 1) {
      imageRef.current.value = '';
    }
  };

  const selectImage = () => {
    if (imageRef.current !== null) {
      imageRef.current.click();
    }
  };

  const isValid = formik.values.notes.trim() || uploadedImages.length;
  return (
    <Stack p='12px 20px' w="full" spacing="none">
      <HStack
        as="form"
        onSubmit={formik.handleSubmit}
        spacing="8.7px"
        w="full"
        alignItems={`stretch`}
        p="8px"
      >
        <HStack position="relative" w="fit-content" justifyContent="center">
        <Image
            boxSize='20px'
            src={AttachIcon.src}
            alt="attachment icon"
            cursor="pointer"
            onClick={selectImage}
          />
          <Input
            ref={imageRef}
            onChange={handleImageChange}
            type="file"
            accept="image/jpeg, image/jpg, image/png, application/pdf"
            hidden
            multiple
          />
          <Image
            boxSize='20px'
            src={CameraIcon.src}
            alt="camera icon"
            cursor="pointer"
            onClick={selectImage}
          />
         
        </HStack>
        <Box position="relative" zIndex={2} w="100%">
          <HighlightOverlay
            ref={overlayRef}
            dangerouslySetInnerHTML={{__html: highlightedContent}}
          />
          <StyledTextArea
            ref={textAreaRef}
            // value={value}
            value={formik.values.notes}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onScroll={e => {
              if (overlayRef.current) {
                overlayRef.current.scrollTop = e.target.scrollTop;
              }
              if (textAreaRef.current && overlayRef.current) {
                overlayRef.current.scrollTop = textAreaRef.current.scrollTop;
              }
            }}
            placeholder="Drop a note"
          />

          <Box
            position="fixed"
            top={menuPosition.top}
            ref={sugListRef}
            left={0}
            right={0}
            mx="auto"
            sx={customScrollbarStyles}
            zIndex={99999}
            bg="white"
            boxShadow="lg"
            borderRadius="md"
            maxH="180px"
            overflowY="auto"
            border="1px solid"
            borderColor="gray.200"
            width={textAreaRef?.current?.offsetWidth ?? '100%'}
            opacity={showSuggestions ? 1 : 0}
            pointerEvents={showSuggestions ? 'initial' : 'none'}
            visibility="visible"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <Box
                key={suggestion.id}
                px={4}
                py={2}
                cursor="pointer"
                bg={selectedIndex === index ? '#F5F5F5' : 'transparent'}
                _hover={{bg: '#F5F5F5'}}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <HStack spacing="10px">
                  <Image
                    alt="profile picture"
                    borderRadius="full"
                    src={suggestion.img || avatarSm}
                    boxSize="24px"
                    objectFit="cover"
                  />
                  <Text fontSize="14px">{suggestion.name}</Text>
                </HStack>
              </Box>
            ))}
          </Box>
        </Box>
        <IconButton
          variant="unstyled"
          type="submit"
          isLoading={mutation.isLoading}
          isDisabled={!isValid}
          minW="fit-content"
          display="flex"
          alignItems="center"
          // bg='red'
          alignSelf="center"
          justifyContent="center"
        >
          <VscSend />
        </IconButton>
      </HStack>
      <Flex overFlowX="auto" gap="10px" sx={customScrollStyle} w="full">
        {uploadedImages.map((image, index) => (
          <Box
            key={index}
            display="flex"
            gap={1}
            bg="rgba(69, 69, 254, 0.10)"
            p="8px"
            borderRadius="8.02px"
            alignItems="center"
            w="fit-content"
            minW="fit-content"
          >
            <Text color="#4545FE" fontSize="9.62px" fontWeight="500">
              {image.name}
            </Text>
            <Image
              w="15px"
              h="15px"
              src={CloseIcon.src}
              alt="attach icon"
              cursor="pointer"
              onClick={() => removeImage(index)}
            />
          </Box>
        ))}
      </Flex>
    </Stack>
  );
};

export default AutoResizeInput;
