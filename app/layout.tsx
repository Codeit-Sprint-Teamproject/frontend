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
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
