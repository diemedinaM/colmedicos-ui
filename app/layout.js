import { Roboto } from "next/font/google";
import "./globals.css";
import LateralMenu from "@/components/LateralMenu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prestador de servicios | SOFIA"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        <LateralMenu />
        <Header /> 
        <main className="[grid-area:main] p-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
