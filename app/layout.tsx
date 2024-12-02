import Navbar from './_components/Navbar';
import QueryProvider from './_providers/QueryProvider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        <QueryProvider>
          <div id='modal'></div>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
