import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { roboto, dancingScript } from './_fonts/fonts';
import ReactToastifyProvider from './_components/ReactToastifyProvider';
import { draftMode } from 'next/headers';
import VisualEditing from './_components/VisualEditing';
import { baseUrl } from './utils/baseUrl';
import Navbar from './_components/NavBar';
import FooterComponent from './_components/FooterComponent';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import GlobalStatesContext from './_components/GlobalStatesContext';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Glowy Lab Homepage',
    template: '%s | Glowy Lab',
  },
  description: 'This is the homepage of Glowy Lab website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${dancingScript.variable}`}>
        <ReactToastifyProvider>
          <UserProvider>
            <GlobalStatesContext>
              <Navbar />
              {children}
              {draftMode().isEnabled && <VisualEditing />}
              <FooterComponent />
            </GlobalStatesContext>
          </UserProvider>
        </ReactToastifyProvider>
      </body>
    </html>
  );
}
