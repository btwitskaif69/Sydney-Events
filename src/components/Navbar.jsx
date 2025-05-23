"use client";

import React, { useState } from "react";
import {
  ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton
} from "@/components/ui/resizable-navbar"; // update with actual relative path

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <ResizableNavbar>
      {/* Desktop Navbar */}
      <NavBody>
        <NavbarLogo />
        {/*
          Assuming NavItems also uses <a> tags internally or you'll modify it
          to simply render <a> tags for its items.
        */}
        <NavItems items={navItems} onItemClick={closeMobileMenu} />
        {/* NavbarButton uses href, which means it will act as a standard <a> tag */}
        <NavbarButton href="/subscribe">Subscribe</NavbarButton>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={mobileOpen} onClick={toggleMobileMenu} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={mobileOpen} onClose={closeMobileMenu}>
          {navItems.map((item, idx) => (
            <a // This is the <a> tag you requested
              key={`mobile-link-${idx}`}
              href={item.link} // The href attribute is used for the link destination
              onClick={closeMobileMenu}
              className="w-full px-4 py-2 text-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded"
            >
              {item.name}
            </a>
          ))}
          {/* NavbarButton uses href, which means it will act as a standard <a> tag */}
          <NavbarButton href="/subscribe" className="w-full mt-4">
            Subscribe
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
};

export default Navbar;