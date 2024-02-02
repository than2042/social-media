"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import "../styles/Header.css";

// import { HomeIcon, InfoCircledIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <img className="logo" src="/TTelebook-logos.png" alt=" logo" />
          </NavigationMenu.Link>
          <NavigationMenu.Link asChild>
            <a href="/">
              {}
              {/* <HomeIcon /> */}
            </a>
          </NavigationMenu.Link>
          {/* <NavigationMenu.Link asChild>
            <a href="/posts">
              <InfoCircledIcon /> Post
            </a>
          </NavigationMenu.Link> */}
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Header;
