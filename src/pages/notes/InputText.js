import send from '/src/images/icons/send-icon-2.svg';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import CameraIcon from '/src/images/icons/camIcon.svg';
import CloseIcon from '/src/images/icons/close-icon-blue.svg';

import {
  VStack,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Box,
  Input,
  Text,
  Spinner,
  Flex,
  Textarea,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import {fetchNotes, fetchSuggestions, UpdateNotes} from '../../apis/fetchNotes';
import {useQuery, useMutation} from '@tanstack/react-query';

import React, {useEffect, useRef, useState} from 'react';
import {Button, Form} from '../../ui-lib/ui-lib.components';
import {set} from 'react-hook-form';
import styled from '@emotion/styled';
import {toastForError} from '../../utils/toastForErrors';
import TextareaAutosize from 'react-autosize-textarea';
import {TbSend} from 'react-icons/tb';
import {VscSend} from 'react-icons/vsc';
import {encodeFileToBase64} from 'utils';

const InputText = ({id, toast, refetch, Ref}) => {
  const {data: sugData, isError: err, isLoading: load} = useQuery(['sugs'], fetchSuggestions);

  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [email, setEmail] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [sentence, setSentence] = useState('');
  const imageRef = useRef(null);

  const [val, setVal] = useState('svsd svsdsvsd svsdsvsd svsdsvsd svsd');
  // const textAreaRef = useRef(null);

  // const resizeTextArea = () => {
  //   textAreaRef.current.style.height = 'auto';
  //   textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  // };

  // useEffect(resizeTextArea, [val]);

  const onChange = e => {
    setVal(e.target.value);
  };

  console.log('email', email);
  // console.log(refetch);

  // useEffect = () => {

  let inputNotes = document.getElementById('inputnotes');
  // let highlightNotes = document.getElementById('highlight_notes');
  let boxedNotes = document.getElementById('boxednotes');
  let regex = /@\w+/g;

  const handleScroll = e => {
    console.log(e, 'scrolling');
    let left = inputNotes.scrollLeft;
    console.log(left, boxedNotes);
    boxedNotes.scrollLeft = inputNotes.scrollLeft;
    highlightText();
    console.log(boxedNotes.scrollLeft, left, inputNotes.scrollRight);
    return;
  };
  useEffect(() => {
    inputNotes ? inputNotes?.addEventListener('scroll', handleScroll) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputNotes]);

  const highlightText = text => {
    const checkForSuggestion = word => {
      let txt = word;
      filtered.forEach(mentionObj => {
        let name = mentionObj.name;
        const mention = word.substring(1); // Remove "@" symbol
        if (name.toLowerCase().includes(mention.toLowerCase())) {
          txt = `<mark>${word}</mark>`;
        } else {
        }
      });
      return txt;
    };

    const highlighted = inputNotes.value.replace(/@\w+/g, `<mark>@${/$1/}</mark>`);
    const words = inputNotes.value.split(' ');
    const formatted = words.map(word =>
      regex.test(word) && filtered
        ? (console.log(checkForSuggestion(word)), checkForSuggestion(word))
        : // : word
          word
    );
    console.log(formatted.join(' '));
    // return (highlightNotes.innerHTML = formatted);
    return;
  };

  inputNotes?.addEventListener('input', highlightText);
  // };

  const boxRef = useRef(null);
  const menuRef = useRef(null);

  const inspectText = (text, val) => {
    const regex = /@(\w+)\s?([\w,;:\.'"\(\)\[\]\{\}\-\+\=\!\?]+)?/g; // regex to match "@" followed by at least one word character and an optional letter or word with any non-letter characters
    let newText;
    let match;
    while ((match = regex.exec(val))) {
      const matchedWord = match[1]; // get the word that comes after "@"
      const nextLetterOrWord = match[2] ? match[2].replace(/[^a-zA-Z]/g, '') : ''; // get the next letter or word if it exists, remove any non-letter characters
      console.log(text);
      console.log(val);
      console.log(
        sugData,
        sugData?.data?.data?.response?.users.find(data => {
          return 'okonkwoemeka1000@gmail.com' === Object.values(data)[0];
        })
      );

      let textEmail = sugData?.data?.data?.response?.users.find(data => {
        return matchedWord + ' ' + nextLetterOrWord === Object.keys(data)[0];
      });
      // item ===
      // sugData?.data?.data?.response?.users[
      //   matchedWord + " " + nextLetterOrWord
      // ]

      // "okonkwoemeka1000@gmail.com"
      // console.log(
      //   sugData?.data?.data?.response?.users.some((data) => {
      //     === Object.values(data)[0];
      //   })
      // );
      console.log(textEmail);
    }
    console.log(newText);

    return newText;
  };

  useEffect(() => {
    const listed = sugData?.data?.data?.response?.users?.map((item, id) => {
      return {name: Object.keys(item)[0], img: item.img};
    });
    setFiltered(listed ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(sugData?.data?.data?.response);
  const handleErr = () => {
    return;
  };
  const formik = useFormik({
    initialValues: {notes: ''},
    onSubmit: async values => {
      // let new_email = inspectText(email, values.notes);
      console.log('values', values);
      console.log(email, 'email');
      let newEmail = email.length < 1 ? [] : email;
      console.log(newEmail, id);
      const body = {
        id: id,
        email: newEmail,

        ...values,
      };
      if (uploadedImage) {
        try {
          // Encode the uploaded image to base64
          const ImageBase64 = await encodeFileToBase64(uploadedImage);
          body.files = [ImageBase64];
        } catch (error) {
          toastForError(error, true, toast);
        }
      }
      return mutation.mutate(body);
    },
  });

  const handledd = e => {
    const text = e.target.value;
    console.log('uu');
    const index = text.indexOf('@');
    let highlightText;
    if (index !== -1) {
      const highlightedText = text.substring(index + 1);
      const newText =
        text.substring(0, index + 1) + "<span style='color:red'>" + highlightedText + '</span>';
      highlightText = newText;
    } else {
      highlightText = text;
    }

    const caretPosition = e.target.selectionStart;
    let textBeforeCaret = text.substring(caretPosition - 2, caretPosition);

    const distanceOfCursor = () => {
      let textsBeforeCaret = text.substring(0, caretPosition);
      let span = document.createElement('span');
      console.log(span.offsetWidth);
      let el = document.getElementById('inputnotes');
      let font = parseFloat(window.getComputedStyle(el, null).getPropertyValue('font-size'));
      span.style.fontSize = font + 'px';
      span.setAttribute('id', 'span');

      span.textContent = textsBeforeCaret;

      document.body.appendChild(span);

      let distance = span.offsetWidth
        ? document.getElementById('span').offsetWidth - menuRef.current.clientWidth / 2
        : document.getElementById('span').offsetWidth + menuRef.current.clientWidth / 2;
      boxRef.current.style.left = String(distance) + 'px';
      return document.body.removeChild(span);
    };

    if (textBeforeCaret?.trim()?.length > 0 && textBeforeCaret.startsWith('@')) {
      err && formik.setValues({notes: text});
      // distanceOfCursor();
      const prop = sugData?.data?.data?.response?.recent?.length ? 'recent' : 'users';
      const listed = sugData?.data?.data?.response?.[prop]?.map(item => {
        return {name: Object.keys(item)[0], img: item.img};
      });
      setOpen(true);
      setFiltered(listed);
      return formik.setValues({notes: text});
    }
    if (/\s+$/.test(textBeforeCaret) || text.trim() === '') {
      setOpen(false);
      return formik.setValues({notes: text});
    }
    if (open) {
      const listed = sugData.data.data.response.users.map(item => {
        return {name: Object.keys(item)[0], img: item.img};
      });
      e.target.focus();
      const list = listed.filter(item => {
        return item.name.toLowerCase().includes(
          text
            .substr(text.lastIndexOf('@') + 1)
            .split(' ')[0]
            .toLowerCase()
        );
      });

      setFiltered(list);
    }

    return formik.setValues({notes: text});
  };

  const handleHover = () => {
    return document.getElementById('inputnotes')?.focus();
  };

  const handleSelect = (idx, name, e) => {
    let splitt = name.split(' ')[0];
    console.log('uu');

    if (email.find(item => item === Object.values(sugData.data.data.response.users[idx])[0])) {
      setEmail(email);
    } else {
      setEmail([...email, Object.values(sugData.data.data.response.users[idx])[0]]);
    }
    let caret = document.getElementById('inputnotes')?.selectionStart;
    const backToAt = formik.values.notes.substring(0, caret).lastIndexOf('@');
    setOpen(false);
    document.getElementById('inputnotes')?.focus();
    console.log(
      formik.values.notes.substring(0, caret).lastIndexOf('@'),
      formik.values.notes.substring(0, backToAt + 1)
    );

    if (formik.values.notes.substring(~~caret - 1, caret) !== '@') {
      return formik.setValues({
        notes:
          formik.values.notes.substring(0, backToAt + 1) +
          splitt +
          formik.values.notes.substring(caret),
      });
    }

    console.log(formik.values.notes.substring(0, caret).lastIndexOf('@'));
    formik.setValues({
      notes:
        formik.values.notes.substring(0, backToAt + 1) +
        splitt +
        formik.values.notes.substring(caret),
    });

    // caret = backToAt + ~~splitt.length + 1;
    caret = 10;
    document.getElementById('inputnotes').focus();

    return (boxedNotes.scrollLeft = boxedNotes.scrollWidth - boxedNotes.offsetWidth);
  };

  const mutation = useMutation(data => UpdateNotes(data), {
    onSuccess: async res => {
      const endOfListRef = document.getElementById('endOfListRef');
      console.log(res);
      console.log('uu');
      open && setOpen(false);
      // highlightNotes.innerHTML = '';
      await refetch();
      formik.resetForm();
      setTimeout(() => {
        endOfListRef?.scrollIntoView({behavior: 'smooth'});
      }, 50);

      removeImage();
      setEmail([]);
    },
    onError: err => {
      console.log(err);
      return toastForError(err, true, toast);
    },
  });
  console.log(filtered);

  // image part
  const addImage = image => {
    let imageType = image.type;
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    if (validExtensions.includes(imageType)) {
      setUploadedImage(image);
    }
  };
  // useEffect(resizeTextArea, [formik.values.notes]);
  const handleImageChange = e => {
    if (e.target.files !== null) {
      let image = e.target.files[0];

      addImage(image);
    }
  };

  const selectImage = () => {
    if (imageRef.current !== null) {
      imageRef.current.click();
    }
  };

  const removeImage = () => {
    if (imageRef.current) {
      imageRef.current.value = '';
      setUploadedImage(null);
    }
  };

  const isValid = formik.values.notes.trim() || uploadedImage;
  return (
    <VStack
      // position="absolute"
      // ref={Ref}
      // bottom="0px"
      spacing="none"
      h="fit-content"
      // bg="yellow"
      // _after={{
      //   content: `""`,
      //   position: "absolute",
      //   height: "98px",
      //   width: "100%",
      //   bottom: "0px",
      //   right: "0px",
      //   background: "#ffffff",
      //   zIndex: "-1",
      // }}

      pt="0"
      w="full"
    >
      <HStack position="relative" w="full">
        <Box position="absolute" ref={boxRef} mx="auto" left="50%">
          {!err && (
            <Menu placement="top" autoSelect={false} w="50%" isOpen={open}>
              <MenuButton w="full" h="0px" isDisabled></MenuButton>
              <MenuList
                ref={menuRef}
                // tabIndex={-1}
                sx={filtered?.length < 1 ? {p: '0px', 'border-width': '0'} : ''}
              >
                <Wrap>
                  {load ? (
                    <Spinner />
                  ) : (
                    filtered?.map((item, idx) => (
                      <MenuItem
                        onMouseMove={handleHover}
                        _hover={{background: 'rgba(0,0,0,0.03)'}}
                        onClick={e => handleSelect(idx, item.name, e)}
                        key={idx}
                        tabIndex={-1}
                      >
                        {err ? (
                          'oops something went wrong'
                        ) : (
                          <>
                            {/* {console.log(item)} */}
                            <HStack spacing="10px">
                              <Image
                                alt="profile picture"
                                borderRadius="full"
                                fontSize="6px"
                                src={item?.img ?? ''}
                                boxSize="36px"
                                objectFit="cover"
                              />
                              <Text fontSize="14px" fontWeight="400">
                                {item.name}
                              </Text>
                            </HStack>
                          </>
                        )}
                      </MenuItem>
                    ))
                  )}
                </Wrap>
              </MenuList>
            </Menu>
          )}{' '}
        </Box>
      </HStack>
      <Stack w="full">
        <HStack
          as="form"
          onSubmit={formik.handleSubmit}
          spacing="8.7px"
          w="full"
          alignItems={`stretch`}
          bg='#F5F5F5'
          p='8px'
        >
          <Stack position="relative" w="fit-content" justifyContent="center">
            <Input
              ref={imageRef}
              onChange={handleImageChange}
              type="file"
              accept=".jpeg, .jpg, .png"
              hidden
              multiple
            />
            <Image
              w="20px"
              h="20px"
              src={CameraIcon.src}
              alt="camera icon"
              cursor="pointer"
              color="#3D3D3D"
              onClick={selectImage}
            />
          </Stack>

          <Input
            borderRadius="4px"
            bg="#F9FAFB"
            w="full"
            value={formik.values.notes}
            fontSize="12px"
            fontWeight="400"
            onChange={handledd}
            color="#000"
            placeholder="Drop a note..."
            _placeholder={{
              color: '#606060',
            }}
            border={`0.8px solid #E4E4E4`}
            p='10.25px 0px 11.75px 10.345px'
          />

          <IconButton
            variant="unstyled"
            type="submit"
            isLoading={mutation.isLoading}
            isDisabled={!isValid}
            p={`8px`}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <VscSend />
          </IconButton>
        </HStack>

        {uploadedImage ? (
          <Box
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
              {/* {image?.name} */}
              {uploadedImage?.name}
            </Text>

            <Image
              w="15px"
              h="15px"
              src={CloseIcon.src}
              alt="attach icon"
              cursor="pointer"
              onClick={removeImage}
            />
          </Box>
        ) : null}
      </Stack>
    </VStack>
  );
};

export default InputText;

const Boxed = styled.div`
  position: absolute;
  background: white;
  border: 1px solid transparent;
  top: 0;
  width: calc(100% - 42px);
  width: calc(100%- 16px);
  // width: 100%;
  padding: 16px 16px;
  padding-top: 12px;
  height: 47px;
  overflow-x: hidden;
  scroll-bar: 0px;

  &::-webkit-scrollbar {
    display: none;
  }

  > div {
    font-size: 16px;
    width: 100%;
    // height: 59px;
    // background: red;
    color: transparent;
    word-wrap: normal;
    white-space: nowrap;

    mark {
      background-color: #add8e6;
      color: transparent;
    }
  }
`;

const Wrap = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 200px;

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 16px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;

    background-color: darkgrey;
    // outline: 1px solid slategrey;
  }
`;
