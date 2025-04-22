import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {LayoutView} from '../../../components/PageLayout/LayoutView';

export const AllAccountTransactions = () => {
  return (
    <div className="relative">
      <Head>
        <title>Veerge | Account Transactions</title>
        <meta name="description" content="Navigating the future of technology" />
        <meta name="theme-color" content="#191919" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutView activePage={'account'} />
    </div>
  );
};

export default AllAccountTransactions;
