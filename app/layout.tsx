import type { Metadata } from 'next';
import './globals.css';
import { roboto, dancingScript } from './_fonts/fonts';
import ReactToastifyProvider from './_components/ReactToastifyProvider';
import { draftMode } from 'next/headers';
import VisualEditing from './_components/VisualEditing';
import { baseUrl } from './utils/baseUrl';
import Navbar from './_components/NavBar';
import FooterComponent from './_components/FooterComponent';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ecommerce Main Page',
    template: '%s | Ecommerce',
  },
  description: 'Main',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${dancingScript.variable}`}>
        <ReactToastifyProvider>
          <UserProvider>
            <Navbar />
            {children}
            {draftMode().isEnabled && <VisualEditing />}
            <FooterComponent />
          </UserProvider>
        </ReactToastifyProvider>
      </body>
    </html>
  );
}
