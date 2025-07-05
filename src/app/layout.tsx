import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: "Personal Finance Tracker",
  description: "Personal Finance Tracker - Visualize and manage your finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${rubik.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
