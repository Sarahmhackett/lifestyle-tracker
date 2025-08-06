import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import "./globals.css";


export const metadata: Metadata = {
  title: "NHS lifestyle tracker",
  description: "Track your lifestyle and improve your health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
