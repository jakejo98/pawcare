import "@/css/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "PawCare",
  description: "This is PawCare Page",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="pt-[64px] md:pt-[81px] lg:pt-0 px-[20px] md:px-[24px] lg:px-0 max-w-[1200px] mx-auto">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
