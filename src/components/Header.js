"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import "../styles/Header.css";

import {
  HomeIcon,
  EnvelopeClosedIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

const Header = () => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <a href="/">
              {" "}
              <HomeIcon /> Home
            </a>
          </NavigationMenu.Link>
          <NavigationMenu.Link asChild>
            <a href="/post">
              {" "}
              <InfoCircledIcon /> Post
            </a>
          </NavigationMenu.Link>
          <NavigationMenu.Link asChild>
            <a href="/createpost">
              {" "}
              <EnvelopeClosedIcon />
              Create Post
            </a>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Header;
