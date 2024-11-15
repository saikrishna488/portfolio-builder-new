
import './globals.css';
import { Inter } from 'next/font/google';
import GlobalContext from '../contextApi/GlobalContext';
import Navbar from '../components/Navbar';
import Toastify from '../components/Toastify';
import Title from '../components/Title';
import './local.css';
import Render from '../components/Render';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Resume | Portfolio',
    template: '%s',
  },
  description: 'Build your own portfolio with this free tool',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" />
      </head>
      <body className={`${inter.className} h-[100vh]`}>
        <GlobalContext>
          <Toastify />
          <Render/>
          <Navbar />
          {children}
        </GlobalContext>
      </body>
    </html>
  );
}
