import React, {useState, useRef, useEffect} from 'react';
import {
  Box,
  HStack,
  Text,
  Image,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import avatarSm from '/src/images/avatar.svg';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {width: '4px', borderRadius: '16px', display: 'none'},
  '&::-webkit-scrollbar-track': {borderRadius: '16px', WebkitBoxShadow: 'inset 0 0 6px #fafafa'},
  '&::-webkit-scrollbar-thumb': {borderRadius: '16px', backgroundColor: '#cbcbcb'},
};

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 40px;
  max-height: 150px;
  padding: 10px;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
  color: transparent;
  caret-color: #191919;
  position: relative;
  z-index: 2;
  background: transparent;
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
  min-height: 40px;
  max-height: 150px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  pointer-events: none;
  z-index: 1;
  color: #191919;
  .highlight {
    color: #4545fe;
  }
`;

const MentionInput = ({
  value,
  onChange,
  suggestions,
  drawermarginTop,
  onSelect,
  placeholder = 'Type your message here. Use @ to mention someone...'
}) => {
  const [menuPosition, setMenuPosition] = useState({top: 0, left: 0});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightedContent, setHighlightedContent] = useState('');
  
  const textAreaRef = useRef(null);
  const sugListRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 150)}px`;
    }
  }, [value]);

  useEffect(() => {
    if (textAreaRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  }, [value]);

  const handleKeyDown = e => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredSuggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
      } else if (e.key === 'Enter' && filteredSuggestions.length > 0) {
        e.preventDefault();
        handleSuggestionSelect(filteredSuggestions[selectedIndex]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    }
  };

  const handleInput = e => {
    const text = e.target.value;
    const cursorPosition = e.target.selectionStart;
    onChange(text);

    const textBeforeCursor = text.slice(0, cursorPosition);
    const wordsBeforeCursor = textBeforeCursor.split(/\s/);
    const currentWord = wordsBeforeCursor[wordsBeforeCursor.length - 1];
    const precedingWord = wordsBeforeCursor[wordsBeforeCursor.length - 2] ?? '';

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
      const mirror = document.createElement('div');
      mirror.style.cssText = window.getComputedStyle(textArea).cssText;
      mirror.style.height = 'auto';
      mirror.style.width = `${textArea.offsetWidth}px`;
      mirror.style.position = 'absolute';
      mirror.style.visibility = 'hidden';
      mirror.style.fontSize = '14px';
      mirror.style.lineHeight = '1.5';
      mirror.style.padding = '10px';
      mirror.style.whiteSpace = 'pre-wrap';
      mirror.style.wordWrap = 'break-word';
      mirror.textContent = textBeforeCursor;

      const textAreaLineHeight = 27;
      document.body.appendChild(mirror);
      const cursorTop = mirror.offsetHeight - textArea.scrollTop - textAreaLineHeight;
      document.body.removeChild(mirror);

      setTimeout(() => {
        const listHeight = sugListRef.current?.offsetHeight || 0;
        const top = Math.max(0, rect.top - listHeight + cursorTop);

        setMenuPosition({
          top: `calc(${top}px - ${drawermarginTop})`,
          left: Math.max(0, Math.min(rect.left + 10, window.innerWidth - 352)),
        });

        setShowSuggestions(filtered.length > 0);
        setSelectedIndex(0);
      });
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = suggestion => {
    const text = value;
    const cursorPosition = textAreaRef.current.selectionStart;
    const textBeforeCursor = text.slice(0, cursorPosition);
    const textAfterCursor = text.slice(cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    const wordEnd = textBeforeCursor.slice(lastAtIndex).search(/\s/) + lastAtIndex;
    const finalWordEnd = wordEnd === lastAtIndex - 1 ? cursorPosition : wordEnd;

    const newText = text.slice(0, lastAtIndex) + `@${suggestion.name} ` + text.slice(finalWordEnd);
    onChange(newText);
    setShowSuggestions(false);
    onSelect?.(suggestion);

    setTimeout(() => {
      const newPosition = lastAtIndex + suggestion.name.length + 2;
      textAreaRef.current.setSelectionRange(newPosition, newPosition);
      textAreaRef.current.focus();
    }, 0);
  };

  return (
    <Box position="relative" zIndex={2} w="100%">
      <HighlightOverlay
        ref={overlayRef}
        dangerouslySetInnerHTML={{__html: highlightedContent}}
      />
      <StyledTextArea
        ref={textAreaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onScroll={e => {
          if (overlayRef.current) {
            overlayRef.current.scrollTop = e.target.scrollTop;
          }
        }}
        placeholder={placeholder}
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
  );
};

export default MentionInput;