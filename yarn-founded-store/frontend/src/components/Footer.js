import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import { Link } from 'react-router-dom'; // Import Link for internal navigation

const FooterWrapper = styled.footer`
  background-color: ${theme.colors.secondary || '#8A9A5B'}; /* Moss Green - fallback */
  color: ${theme.colors.white || '#FFFFFF'}; /* Fallback */
  padding: 30px 20px;
  text-align: center;
  font-family: ${theme.fonts.body};
  margin-top: auto; /* Pushes footer to bottom in flex layout */
  background-image: url('/knitted-texture.png');
  background-blend-mode: overlay;
  background-color: rgba(138, 154, 91, 0.9);
`;

const FooterText = styled.p`
  margin: 5px 0; /* Adjusted margin */
  font-size: 0.9em;
`;

const FooterLink = styled(Link)` /* Use Link for internal routes */
  color: ${theme.colors.accent || '#FFDB58'}; /* Mustard Yellow for links - fallback */
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ExternalFooterLink = styled.a` /* For external links if any */
  color: ${theme.colors.accent || '#FFDB58'};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterText>
        © ${new Date().getFullYear()} Yarn-Founded Knitted Goods. All Rights Reserved.
      </FooterText>
      <FooterText>
        Inspired by Nature, Crafted by Hand.
      </FooterText>
      <FooterText>
        <FooterLink to="/contact">Contact Us</FooterLink>
      </FooterText>
    </FooterWrapper>
  );
};

export default Footer;
