import React from 'react';
import avatar from '/src/images/avatar.svg';
import styled from '@emotion/styled';
import {Image} from '@chakra-ui/react';
import {useMutation} from '@tanstack/react-query';
import {UpdateMessages} from '../../apis/fetchMessage';

const MessageBox = ({direction, data}) => {
  const mutation = useMutation(data => UpdateMessages(data), {
    onSuccess: res => {
      console.log(res);
      setEmail([]);
      return refetch();
    },
    onError: err => {
      console.log(err);
      return toast({
        title: 'An error occured',
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handd = () => {
    mutation.mutate({
      body: 'ko shi lo',
      feedback_id: 27,
      id: 179,
    });
  };
  return (
    <MessageWrap direction={direction}>
      <ProfWrap direction={direction}>
        <Image
          alt=""
          width="32px"
          height="32px"
          objectFit="cover"
          borderRadius="full"
          src={data.user.avatar ?? avatar.src}
        />
        <h2>{`${data.user.first_name} ${data.user.last_name}`}</h2>
      </ProfWrap>
      {data.feedback && (
        <HighlightWrap>
          <div className="box"></div>
          <Wrap>
            <h2>Project Feedback</h2>
            <p>
              Donec consectetur vulputate nisi in vestibulum. Nam vel arcu quis massa semper
              pretium. Sed ac dui ac ex convallis commodo. Duis consequat tempor porta
            </p>
            <DateWrap direction={direction}>July 28, 2022 | 12:45 AM</DateWrap>
          </Wrap>
        </HighlightWrap>
      )}
      <MsgWrap direction={direction}>
        <p>{data.body}</p>
        <DateWrap onClick={handd} direction={direction}>
          {data.time}
        </DateWrap>
      </MsgWrap>
    </MessageWrap>
  );
};

export default MessageBox;

const MessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  background: #f3fdfa;
  padding: 13px 40px 23px;
  border-radius: 16px;
  margin-bottom: 17px;
  align-self: ${prop => (prop.direction === 'sent' ? 'flex-start' : 'flex-end')};
  width: 82%;
`;
const ProfWrap = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 13px;
  // align-self:flex-end;
  align-self: ${prop => (prop.direction === 'sent' ? 'flex-start' : 'flex-end')};

  h2 {
    font-size: 16px;
    font-weight: 500;
  }
`;

const HighlightWrap = styled.section`
  border-radius: 12px;
  display: flex;
  background: #ffffff;

  .box {
    width: 24px;
    height: 100%;
    background: #12d8a0;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 9px 25px;

  h2 {
    text-align: start;
    width: 100%;
    font-size: 24px;
    font-weight: 600;
  }
  p {
    font-size: 16px;
    font-weight: 300;
    color: #19191;
  }
`;
const DateWrap = styled.span`
  align-self: ${prop => (prop.direction === 'sent' ? 'flex-start' : 'flex-end')};
  font-size: 14px;
  font-weight: 400;
`;

const MsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${prop => (prop.direction === 'sent' ? '28px' : '43px')};
  padding: 0 25px;
  border-radius: 16px;
  position: relative;
  gap: 14px;
  width: 100%;

  p {
    font-size: 16px;
    font-weight: 300;
    color: #191919;
  }
`;
