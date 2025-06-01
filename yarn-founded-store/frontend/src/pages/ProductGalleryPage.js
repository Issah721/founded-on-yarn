import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { theme } from '../theme';
import axios from 'axios'; // Import axios

const GalleryPageWrapper = styled.div`
  padding: 15px; /* Adjusted padding for mobile */
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 20px; /* Original padding */
  }
`;

const PageTitle = styled.h1`
  font-family: ${theme.fonts.headings};
  color: ${theme.colors.secondary || '#8A9A5B'};
  text-align: center;
  font-size: 2em; /* Adjusted for mobile */
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 2.8em;
    margin-bottom: 30px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 25px;
  gap: 8px; /* Adjusted gap */

  @media (min-width: 768px) {
    gap: 10px;
    margin-bottom: 30px;
  }
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? (theme.colors.primary || '#E2725B') : (theme.colors.white || '#FFFFFF')};
  color: ${props => props.active ? (theme.colors.white || '#FFFFFF') : (theme.colors.primary || '#E2725B')};
  border: 1px solid ${theme.colors.primary || '#E2725B'};
  padding: 8px 12px;
  font-family: ${theme.fonts.body};
  font-size: 0.85em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${theme.colors.accent || '#FFDB58'};
    color: ${theme.colors.text || '#333333'};
    border-color: ${theme.colors.accent || '#FFDB58'};
  }

  @media (min-width: 768px) {
    padding: 10px 20px;
    font-size: 1em;
  }
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; Let cards determine spacing based on their width and parent flex-start */
  justify-content: flex-start;
  margin: 0 -8px; /* Counteract card margins for edge alignment */
`;

const LoadingText = styled.p`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text || '#333333'};
  font-size: 1.1em;
  text-align: center;
  width: 100%;
`;

const ErrorText = styled.p`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.primary || '#E2725B'};
  font-size: 1.1em;
  text-align: center;
  width: 100%;
`;

const NoProductsText = styled.p`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text || '#333333'};
  font-size: 1.1em;
  text-align: center;
  width: 100%;
  padding: 20px 0; /* Added padding for better spacing */
`;


const ProductGalleryPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API_URL}/products`);
        setAllProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError('Could not load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === activeFilter));
    }
  }, [activeFilter, allProducts]);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
  };

  return (
    <GalleryPageWrapper>
      <PageTitle>Our Collection</PageTitle>
      <FilterWrapper>
        <FilterButton onClick={() => handleFilterChange('all')} active={activeFilter === 'all'}>All</FilterButton>
        <FilterButton onClick={() => handleFilterChange('scarf')} active={activeFilter === 'scarf'}>Scarves</FilterButton>
        <FilterButton onClick={() => handleFilterChange('beanie')} active={activeFilter === 'beanie'}>Beanies</FilterButton>
        <FilterButton onClick={() => handleFilterChange('accessory')} active={activeFilter === 'accessory'}>Accessories</FilterButton>
      </FilterWrapper>

      {loading && <LoadingText>Loading products...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && (
        <ProductsGrid>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <NoProductsText>
              {activeFilter === 'all'
                ? 'No products available at the moment.'
                : `No products found in the ${activeFilter} category.`}
            </NoProductsText>
          )}
        </ProductsGrid>
      )}
    </GalleryPageWrapper>
  );
};

export default ProductGalleryPage;
