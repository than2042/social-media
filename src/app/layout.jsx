import { Inter, Roboto } from "next/font/google";
import { sql } from "@vercel/postgres";
import { ClerkProvider, auth, UserButton, SignIn } from "@clerk/nextjs";
import Link from "next/link";
import Header from "@/components/Header";
import CreateProfile from "@/components/CreateProfile";
import Footer from "@/components/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["greek"], weight: "400" });

export const metadata = {
  title: "TTelebook",
  description: "This is create with nextJs",
};

export default async function RootLayout({ children }) {
  const { userId } = auth();
  const profileCreate =
    await sql`SELECT * FROM sm_user WHERE clerk_user_id = ${userId}`;

  const rowCount = profileCreate?.rowCount || 0;

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
            <Header />
          </div>
          {rowCount !== 0 && (
            <main className={roboto.className}>{children}</main>
          )}
          {!userId && <SignIn />}
          {userId && rowCount === 0 && <CreateProfile />}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
