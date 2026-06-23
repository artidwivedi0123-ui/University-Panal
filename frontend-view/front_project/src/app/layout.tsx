import '@/src/styles/global.scss';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body>
        <NextIntlClientProvider locale={locale} 
        messages={messages}>
           <ToastContainer/>
        <AuthProvider>
             {children}
        </AuthProvider>
        </NextIntlClientProvider>
       
        </body>
    </html>
  );
}
