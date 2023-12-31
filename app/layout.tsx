import type { Metadata } from 'next';
import './globals.css';
import { roboto, dancingScript } from './_fonts/fonts';
import ReactToastifyProvider from './_components/ReactToastifyProvider';
import { draftMode } from 'next/headers';
import VisualEditing from './_components/VisualEditing';
import { baseUrl } from './utils/baseUrl';
import Navbar from './_components/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'TravelsMate Main Page',
    template: '%s | TravelsMate',
  },
  description: 'This page is used for gathering user information',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${dancingScript.variable} antialiased`}
      >
        <ReactToastifyProvider>
          <Navbar />
          {children}
          {draftMode().isEnabled && <VisualEditing />}
        </ReactToastifyProvider>
      </body>
    </html>
  );
}
