import '@/src/styles/global.scss';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
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
        <AuthProvider>
             {children}
        </AuthProvider>
        </body>
    </html>
  );
}
