import '@/src/styles/global.scss';
import { ToastContainer } from 'react-toastify';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body >
        <ToastContainer/>
        {children}
        </body>
    </html>
  );
}
