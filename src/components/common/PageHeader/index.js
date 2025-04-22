import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export const PageHeader = ({pageTitle}) => {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="" />
        <meta name="theme-color" content="#191919" />{' '}
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default PageHeader;
