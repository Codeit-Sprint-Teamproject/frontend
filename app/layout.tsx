import MSWComponent from './_components/MSWComponent';
import QueryProvider from './_providers/QueryProvider';
import './globals.css';
import GNB from '@/components/GNB';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
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
