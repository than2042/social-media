import { Inter, Roboto } from "next/font/google";
import { ClerkProvider, auth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["greek"], weight: "400" });

export const metadata = {
  title: "Social Network",
  description: "This is create with nextJs",
};

export default function RootLayout({ children }) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="header">
            {userId ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link className="signIn" href="/sign-in">
                Sign In
              </Link>
            )}
            {/* {!userId && <Link href="/sign-in">Sign In</Link>} */}
            <Header />
          </div>
          <main className={roboto.className}>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
