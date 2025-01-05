import MSWComponent from './_components/MSWComponent';
import QueryProvider from './_providers/QueryProvider';
import './globals.css';
import GNB from '@/components/GNB';
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <Head>
        <meta
          http-equiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
      </Head>
      <body>
        <MSWComponent />
        <QueryProvider>
          <div id='modal'></div>
          <GNB />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
