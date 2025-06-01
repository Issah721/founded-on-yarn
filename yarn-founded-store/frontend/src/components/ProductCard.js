import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';

const CardWrapper = styled.div`
  background-color: ${theme.colors.white || '#FFFFFF'};
  border: 1px solid ${theme.colors.secondary_light || '#B0C08B'};
  border-radius: 8px;
  padding: 12px; /* Adjusted padding for mobile */
  margin: 8px;
  width: calc(100% - 16px); /* Full width on smallest screens, accounting for margin */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08); /* Softer shadow */
  transition: transform 0.2s ease, border-color 0.2s ease; /* Faster transition */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-3px); /* Lift effect on hover */
    border-color: ${theme.colors.accent || '#FFDB58'};
  }

  @media (min-width: 480px) { /* Adjust breakpoint for 2 columns */
    width: calc(50% - 16px); /* Two columns, accounting for margin */
  }
  @media (min-width: 769px) { /* Three columns */
    width: calc(33.333% - 24px); /* Adjusted for more robust 3-column layout with margin */
    margin: 12px;
    padding: 16px; /* Original padding */
  }
  @media (min-width: 1024px) { /* Optional: 4 columns or adjust 300px width */
     width: 300px; /* Revert to fixed width if preferred on large screens */
     margin: 16px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px; /* Adjusted height for mobile */
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;

  @media (min-width: 769px) {
    height: 200px; /* Original height */
  }
`;

const ProductName = styled.h3`
  font-family: ${theme.fonts.headings};
  color: ${theme.colors.secondary || '#8A9A5B'};
  font-size: 1.2em; /* Adjusted for mobile */
  margin-top: 0;
  margin-bottom: 6px;
  line-height: 1.3;

  @media (min-width: 769px) {
    font-size: 1.4em; /* Original size */
  }
`;

const ProductDescription = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 0.85em; /* Adjusted for mobile */
  color: ${theme.colors.text || '#333333'};
  margin-bottom: 8px;
  flex-grow: 1;
  line-height: 1.4;

  @media (min-width: 769px) {
    font-size: 0.9em; /* Original size */
  }
`;

const ProductPrice = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 1.1em; /* Adjusted for mobile */
  font-weight: bold;
  color: ${theme.colors.primary || '#E2725B'};
  margin-bottom: 12px;

  @media (min-width: 769px) {
    font-size: 1.2em; /* Original size */
  }
`;

const BuyNowButton = styled.a`
  display: inline-block;
  background-color: ${theme.colors.primary || '#E2725B'};
  color: ${theme.colors.white || '#FFFFFF'};
  font-family: ${theme.fonts.body};
  font-weight: bold;
  padding: 8px 12px; /* Adjusted for mobile */
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 0.9em; /* Adjusted for mobile */

  &:hover {
    background-color: ${props => props.theme.colors.accent || '#FFDB58'};
    color: ${props => props.theme.colors.text || '#333333'};
  }

  @media (min-width: 769px) {
    padding: 10px 15px; /* Original padding */
    font-size: 1em; /* Original size */
  }
`;

const truncateDescription = (text, maxLength) => {
  if (typeof text !== 'string') return '';
  const words = text.split(' ');
  if (words.length > maxLength) {
    return words.slice(0, maxLength).join(' ') + '...';
  }
  return text;
};

const ProductCard = ({ product }) => {
  const name = product?.name || 'Unnamed Product';
  const description = product?.description || 'No description available.';
  const price = typeof product?.price === 'number' ? product.price : 0;
  const imageUrl = product?.imageUrl || 'https://via.placeholder.com/300x200.png/CCCCCC/FFFFFF?Text=No+Image';
  const size = product?.size;
  const color = product?.color;

  const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '1234567890';

  const prefilledMessage = encodeURIComponent(
    `Hi Yarn-Founded! I'd like to buy:
*Product Name*: ${name}
Price: $${price.toFixed(2)}
Size/Color: ${size || 'N/A'} / ${color || 'N/A'}`
  );

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${prefilledMessage}`;

  const handleImageClick = () => {
    window.open(imageUrl, '_blank');
  };

  return (
    <CardWrapper>
      <div>
        <ProductImage src={imageUrl} alt={name} onClick={handleImageClick} title="Click to zoom"/>
        <ProductName>{name}</ProductName>
        <ProductDescription>{truncateDescription(description, 15)}</ProductDescription> {/* Shorter for mobile */ }
        <ProductPrice>$${price.toFixed(2)}</ProductPrice>
      </div>
      <BuyNowButton href={whatsappLink} target="_blank" rel="noopener noreferrer" theme={theme}>
        Buy Now
      </BuyNowButton>
    </CardWrapper>
  );
};

export default ProductCard;
