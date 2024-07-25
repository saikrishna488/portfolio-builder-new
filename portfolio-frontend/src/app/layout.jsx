import './globals.css'
import { Inter } from 'next/font/google'
import GlobalContext from '../contextApi/GlobalContext';
import Header from '../components/Header';
import Toastify from '../components/Toastify';
import Title from '../components/Title'
import './local.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default : 'Resume | Portfolio',
    template : '%s'
  },
  description: 'Build your own portfolio with this free tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" />
      </head>
      <body className={inter.className}>
        <script src="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
        <GlobalContext>
          <Toastify/>
          <Header/>
          <Title/>
          {children}
        </GlobalContext>
      </body>
    </html>
  )
}
