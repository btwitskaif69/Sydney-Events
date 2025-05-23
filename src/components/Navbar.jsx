"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
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
} from "@/components/ui/resizable-navbar"; // Ensure this path is correct

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
        <NavbarLogo /> {/* NavbarLogo will use Link internally */}
        <NavItems items={navItems} onItemClick={closeMobileMenu} /> {/* NavItems will use Link internally */}
        {/* Use 'as={Link}' and 'to' prop for NavbarButton navigation */}
        <NavbarButton as={Link} to="/subscribe">Subscribe</NavbarButton>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo /> {/* NavbarLogo will use Link internally */}
          <MobileNavToggle isOpen={mobileOpen} onClick={toggleMobileMenu} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={mobileOpen} onClose={closeMobileMenu}>
          {navItems.map((item, idx) => (
            <Link // Use Link for mobile navigation items
              key={`mobile-link-${idx}`}
              to={item.link} // Use 'to' prop
              onClick={closeMobileMenu}
              className="w-full px-4 py-2 text-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded"
            >
              {item.name}
            </Link>
          ))}
          {/* Use 'as={Link}' and 'to' prop for NavbarButton in mobile menu */}
          <NavbarButton as={Link} to="/subscribe" className="w-full mt-4">
            Subscribe
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
};

export default Navbar;