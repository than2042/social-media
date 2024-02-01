import { Inter, Roboto } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider, auth, UserButton, SignIn } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import "./globals.css";
import Link from "next/link";
import Footer from "@/components/Footer";
import CreateProfile from "@/components/CreateProfile";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["greek"], weight: "400" });

export const metadata = {
  title: "Social Network",
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
          {rowCount === 0 && <CreateProfile />}

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

{
  /* {!signedIn && <Link href="/sign-in">Sign In</Link>} */
}
{
  /* {!userId && <Link href="/sign-in">Sign In</Link>} */
}
{
  /* <main className={roboto.className}>{children}</main> */
}

// signedIn
