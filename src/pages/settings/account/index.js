import {useRouter} from 'next/router';
import React from 'react';
import {RecipientDetails} from './recipient/recipientDetails';

export default function Account() {
  const router = useRouter();
  return <RecipientDetails />;
}
