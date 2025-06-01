import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { theme } from '../theme';
import axios from 'axios'; // Import axios

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroBanner = styled.section`
  background-color: ${theme.colors.secondary || '#8A9A5B'};
  color: ${theme.colors.white || '#FFFFFF'};
  width: 100%;
  padding: 40px 20px; /* Adjusted padding */
  text-align: center;
  margin-bottom: 40px;
  /* Basic texture example, user should replace with their actual image */
  background-image: ${props => props.textureUrl ? `url(${props.textureUrl})` : 'none'};
  background-blend-mode: overlay;
  background-color: rgba(138, 154, 91, 0.85); /* Moss green with opacity */

  @media (min-width: 768px) {
    padding: 60px 20px;
  }
`;

const Tagline = styled.h1`
  font-family: ${theme.fonts.headings};
  font-size: 2.5em; /* Adjusted for responsiveness */
  color: ${theme.colors.white || '#FFFFFF'};
  margin: 0;

  @media (min-width: 768px) {
    font-size: 3em;
  }
`;

const IntroText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 1.1em; /* Adjusted for responsiveness */
  color: ${theme.colors.white || '#FFFFFF'};
  margin-top: 10px;
  max-width: 600px;
  margin-left: auto; /* Center align */
  margin-right: auto; /* Center align */
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 1.2em;
  }
`;

const FeaturedProductsSection = styled.section`
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.headings};
  color: ${theme.colors.secondary || '#8A9A5B'};
  font-size: 2em; /* Adjusted for responsiveness */
  margin-bottom: 30px;

  @media (min-width: 768px) {
    font-size: 2.5em;
  }
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* gap: 1px; Minimal gap, card margins will handle spacing */
  margin: 0 -8px; /* Counteract card margins for edge alignment */
`;

const LoadingText = styled.p`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text || '#333333'};
  font-size: 1.1em;
  text-align: center; /* Ensure text is centered */
  width: 100%; /* Ensure it takes full width if inside a flex container */
`;

const ErrorText = styled.p`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.primary || '#E2725B'}; /* Terracotta for errors */
  font-size: 1.1em;
  text-align: center; /* Ensure text is centered */
  width: 100%; /* Ensure it takes full width if inside a flex container */
`;

const NoProductsText = styled.p`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text || '#333333'};
  font-size: 1.1em;
  text-align: center; /* Ensure text is centered */
  width: 100%; /* Ensure it takes full width if inside a flex container */
`;


const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API_URL}/products`);
        const sortedProducts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFeaturedProducts(sortedProducts.slice(0, 3)); // Get top 3 newest products
      } catch (err) {
        console.error('Error fetching featured products:', err.message);
        setError('Could not load featured products. Please try again later.');
        // If err.response exists, you can log more details like err.response.data
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [API_URL]); // API_URL dependency to refetch if it changes (though unlikely for this app)

  return (
    <HomePageWrapper>
      <HeroBanner textureUrl="/knitted-texture.png"> {/* User needs to place this image in /public */}
        <Tagline>Rooted in Earth, Crafted by Hand</Tagline>
        <IntroText>Handcrafted knits inspired by nature. Discover unique pieces made with love and the finest natural fibers.</IntroText>
      </HeroBanner>

      <FeaturedProductsSection>
        <SectionTitle>Featured Products</SectionTitle>
        {loading && <LoadingText>Loading featured products...</LoadingText>}
        {error && <ErrorText>{error}</ErrorText>}
        {!loading && !error && (
          <ProductsGrid>
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <NoProductsText>No featured products available at the moment.</NoProductsText>
            )}
          </ProductsGrid>
        )}
      </FeaturedProductsSection>
    </HomePageWrapper>
  );
};

export default HomePage;
