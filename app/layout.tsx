import type { Metadata } from "next";
import "./globals.css";
import { roboto, dancingScript } from "./_fonts/fonts";

export const metadata: Metadata = {
  title: {
    default: "TravelsMate Form Page",
    template: "%s | TravelsMate",
  },
  description: "This page is used for gathering user information",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${dancingScript.variable}`}>
        {children}
      </body>
    </html>
  );
}
