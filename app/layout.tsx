import type { Metadata } from "next";
// import "./globals.css"
import Navbar from "./components/Navbar";
// import Player from "./components/Player";
// import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Melodify | Afrobeat streaming platform",
  description:
    "This is an app that gives you access to top afrobeat songs and artiste",
};
//

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />

        <div className="pt-10 min-h-[90vh]">{children}</div>

        {/* Bottom */}
        <div className="sticky bottom-0 mt-12 bg-slate-200 p-4 text-primary text-center">
          <h2 className="xl font-bold">
            Copyright © 2024 EliteDev. All Rights Reserved.
          </h2>
        </div>
        {/*  */}
      </body>
    </html>
  );
}
