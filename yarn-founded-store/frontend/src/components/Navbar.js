import React, { useState, useEffect, useRef } from 'react'; // Added useEffect and useRef
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../theme';

const NavWrapper = styled.nav`
  background-color: ${theme.colors.background || '#F5F5DC'};
  padding: 10px 20px; /* Adjusted padding for mobile */
  border-bottom: 2px solid ${theme.colors.secondary_light || '#B0C08B'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${theme.fonts.body};
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  position: relative;

  @media (min-width: 769px) {
    padding: 15px 30px;
  }
`;

const NavLogo = styled(Link)`
  font-family: ${theme.fonts.headings};
  color: ${theme.colors.primary || '#E2725B'};
  font-size: 1.5em; /* Adjusted for mobile */
  text-decoration: none;
  font-weight: bold;
  z-index: 101;

  @media (min-width: 769px) {
    font-size: 1.8em;
  }
`;

const NavLinksContainer = styled.div`
  display: none;

  @media (min-width: 769px) {
    display: flex;
    align-items: center;
    .navlink { /* Using class for NavLink */
      color: ${theme.colors.secondary || '#8A9A5B'};
      text-decoration: none;
      margin-left: 25px;
      font-size: 1.1em;
      padding-bottom: 5px;
      border-bottom: 2px solid transparent;
      transition: color 0.3s ease, border-color 0.3s ease;

      &:hover,
      &.active {
        color: ${theme.colors.accent || '#FFDB58'};
        border-bottom-color: ${theme.colors.accent || '#FFDB58'};
      }
      &.active { /* Specific active style if different from hover */
         color: ${theme.colors.primary || '#E2725B'};
         border-bottom-color: ${theme.colors.primary || '#E2725B'};
      }
    }
  }
`;

const MobileNavIcon = styled.button` /* Changed to button for accessibility */
  display: block;
  cursor: pointer;
  z-index: 101;
  font-size: 1.8em;
  color: ${theme.colors.secondary || '#8A9A5B'};
  background: none;
  border: none;
  padding: 5px; /* Easier to tap */

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.background || '#F5F5DC'};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 10px 0; /* Adjusted padding */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 100;
  border-top: 1px solid ${theme.colors.secondary_light || '#B0C08B'};

  .navlink-mobile { /* Using class for NavLink */
    color: ${theme.colors.secondary || '#8A9A5B'};
    text-decoration: none;
    font-size: 1.2em;
    padding: 12px 0; /* Increased padding for touch targets */
    width: 100%;
    text-align: center;
    border-bottom: 1px solid ${theme.colors.secondary_light || '#E0E8D5'}; /* Separator */

    &:last-child {
      border-bottom: none;
    }

    &:hover,
    &.active { /* Consistent hover/active for mobile */
      color: ${theme.colors.accent || '#FFDB58'};
      background-color: ${theme.colors.secondary_light || '#E0E8D5'};
    }
     &.active { /* Specific active style if different from hover */
         color: ${theme.colors.primary || '#E2725B'};
         font-weight: bold;
      }
  }
`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null); // Ref for clicking outside

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  }

  return (
    <NavWrapper ref={navRef}>
      <NavLogo to="/" onClick={closeMobileMenu}>Yarn-Founded</NavLogo>
      <MobileNavIcon onClick={toggleMobileMenu} aria-label="Toggle navigation"> {/* Aria label */}
        {mobileMenuOpen ? '✕' : '☰'}
      </MobileNavIcon>
      <NavLinksContainer> {/* Renamed from NavLinks */}
        <NavLink to="/" className={({isActive}) => isActive ? 'navlink active' : 'navlink'} end>Home</NavLink>
        <NavLink to="/gallery" className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Gallery</NavLink>
        <NavLink to="/contact" className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Contact</NavLink>
        <NavLink to="/admin" className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>Admin</NavLink>
      </NavLinksContainer>
      {mobileMenuOpen && (
        <MobileNavMenu>
          <NavLink to="/" className={({isActive}) => isActive ? 'navlink-mobile active' : 'navlink-mobile'} onClick={closeMobileMenu} end>Home</NavLink>
          <NavLink to="/gallery" className={({isActive}) => isActive ? 'navlink-mobile active' : 'navlink-mobile'} onClick={closeMobileMenu}>Gallery</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'navlink-mobile active' : 'navlink-mobile'} onClick={closeMobileMenu}>Contact</NavLink>
          <NavLink to="/admin" className={({isActive}) => isActive ? 'navlink-mobile active' : 'navlink-mobile'} onClick={closeMobileMenu}>Admin</NavLink>
        </MobileNavMenu>
      )}
    </NavWrapper>
  );
};

export default Navbar;
