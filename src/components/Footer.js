import Link from "next/link";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footerContainer">
      <p className="footerText">&copy; thanthan2024</p>
      <Link href="https://twitter.com/?lang=en" replace prefetch={false}>
        <TwitterLogoIcon />
      </Link>
      <Link href="https://www.instagram.com/" replace prefetch={false}>
        <InstagramLogoIcon />
      </Link>
    </div>
  );
};

export default Footer;
