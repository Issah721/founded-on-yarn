import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import styled from 'styled-components';
import { theme } from '../theme';
import axios from 'axios'; // Import axios

const DashboardWrapper = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 20px auto;
  background-color: ${theme.colors.white || '#FFFFFF'};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const PageTitle = styled.h1`
  font-family: ${theme.fonts.headings};
  color: ${theme.colors.secondary || '#8A9A5B'};
  text-align: center;
  font-size: 2.2em; /* Responsive */
  margin-bottom: 30px;
  @media (min-width: 768px) {
    font-size: 2.5em;
  }
`;

const FormSection = styled.section`
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid ${theme.colors.secondary_light || '#B0C08B'};
  border-radius: 5px;
`;

const FormTitle = styled.h2`
  font-family: ${theme.fonts.headings};
  color: ${theme.colors.secondary || '#8A9A5B'};
  font-size: 1.6em; /* Responsive */
  margin-bottom: 20px;
  @media (min-width: 768px) {
    font-size: 1.8em;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  label {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text || '#333333'};
    margin-bottom: 5px;
    font-weight: bold;
  }

  input[type='text'],
  input[type='number'],
  textarea,
  select {
    padding: 10px;
    font-family: ${theme.fonts.body};
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    background-color: ${props => props.disabled ? '#f0f0f0' : '#fff'}; /* Disabled style */
    &:focus {
      border-color: ${theme.colors.primary || '#E2725B'};
      outline: none;
      box-shadow: 0 0 0 2px ${(props) => (props.theme.colors.primary_light || '#FADBD8')};
    }
  }
  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const Button = styled.button`
  background-color: ${theme.colors.primary || '#E2725B'};
  color: ${theme.colors.white || '#FFFFFF'};
  padding: 10px 15px; /* Adjusted padding */
  border: none;
  border-radius: 4px;
  font-family: ${theme.fonts.body};
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
  margin-right: 10px;
  margin-top: 10px; /* Ensure spacing */
  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};


  &:hover:not([disabled]) {
    background-color: ${theme.colors.accent || '#FFDB58'};
    color: ${theme.colors.text || '#333333'};
  }

  &.secondary {
    background-color: ${theme.colors.secondary || '#8A9A5B'};
    &:hover:not([disabled]) {
      background-color: ${theme.colors.accent || '#FFDB58'};
      color: ${theme.colors.text || '#333333'};
    }
  }
`;

const ProductListSection = styled.section`
  margin-top: 20px;
  overflow-x: auto; /* For responsive tables */
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    border: 1px solid #ddd;
    padding: 8px; /* Adjusted padding */
    text-align: left;
    font-family: ${theme.fonts.body};
    vertical-align: middle;
    font-size: 0.9em; /* Smaller font for table */
  }
  th {
    background-color: ${theme.colors.secondary_light || '#B0C08B'};
    color: ${theme.colors.text || '#333333'};
    font-family: ${theme.fonts.headings};
    font-size: 0.95em;
  }
  img {
    max-width: 40px; /* Smaller image */
    max-height: 40px;
    object-fit: cover;
    border-radius: 3px;
  }
  td:last-child { /* Actions column */
    white-space: nowrap; /* Prevent buttons from wrapping too soon */
  }
`;

const ActionButton = styled.button`
  padding: 5px 8px;
  margin-right: 5px;
  margin-bottom: 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.85em; /* Smaller font */
  transition: opacity 0.2s, background-color 0.2s;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &.edit {
    background-color: ${theme.colors.accent || '#FFDB58'};
    color: ${theme.colors.text || '#333333'};
    &:hover:not([disabled]) {
        background-color: ${theme.colors.accent_dark || '#E0C04A'}; /* Darken accent */
    }
  }
  &.delete {
    background-color: ${theme.colors.primary || '#E2725B'};
    color: ${theme.colors.white || '#FFFFFF'};
    &:hover:not([disabled]) {
      background-color: ${theme.colors.primary_dark || '#C76049'}; /* Darken primary */
    }
  }
`;

const Notification = styled.div`
  padding: 12px 15px;
  margin: 15px 0;
  border-radius: 4px;
  font-family: ${theme.fonts.body};
  text-align: center;
  font-size: 1em; /* Adjusted size */
  &.success {
    background-color: ${theme.colors.secondary_light || '#D1E7DD'};
    color: ${theme.colors.secondary || '#0F5132'};
    border: 1px solid ${theme.colors.secondary || '#A3C9A8'};
  }
  &.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c2c7;
  }
`;

const LoadingText = styled.p`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text || '#333333'};
  font-size: 1.1em;
  text-align: center;
  padding: 20px;
`;


const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: null, name: '', description: '', price: '', category: 'scarf', imageUrl: '', size: '', color: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const showNotification = useCallback((message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 4000);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      showNotification('Error fetching products: ' + (err.response?.data?.msg || err.message), 'error');
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  }, [API_URL, showNotification]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProduct({ _id: null, name: '', description: '', price: '', category: 'scarf', imageUrl: '', size: '', color: '' });
    setFormSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentProduct.name.trim() || !currentProduct.description.trim() || !currentProduct.price.toString().trim() || !currentProduct.category.trim() || !currentProduct.imageUrl.trim()) {
      showNotification('Name, Description, Price, Category, and Image URL are required.', 'error');
      return;
    }
    setFormSubmitting(true);
    const productData = {
        ...currentProduct,
        price: parseFloat(currentProduct.price),
        description: currentProduct.description.substring(0,100) // Enforce maxlength
    };

    try {
      if (isEditing) {
        const res = await axios.put(`${API_URL}/products/${currentProduct._id}`, productData);
        setProducts(products.map(p => (p._id === currentProduct._id ? res.data : p)));
        showNotification('Product updated successfully!', 'success');
      } else {
        const res = await axios.post(`${API_URL}/products`, productData);
        setProducts([res.data, ...products].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))); // Add and re-sort
        showNotification('Product added successfully!', 'success');
      }
      resetForm();
    } catch (err) {
      console.error('Form submit error:', err.response || err);
      let errorMsg = err.response?.data?.msg || err.response?.data?.message || err.message;
      if (err.response?.data?.errors) { // Handle validation errors from backend if any
        errorMsg = err.response.data.errors.map(e => e.msg).join(', ');
      }
      showNotification(`Error ${isEditing ? 'updating' : 'adding'} product: ${errorMsg}`, 'error');
      setFormSubmitting(false);
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setFormSubmitting(true); // Disable buttons during delete
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
        showNotification('Product deleted successfully!', 'success');
        if (isEditing && currentProduct._id === id) {
            resetForm();
        }
      } catch (err) {
        showNotification('Error deleting product: ' + (err.response?.data?.msg || err.message), 'error');
        console.error('Delete product error:', err);
      } finally {
        setFormSubmitting(false); // Re-enable buttons
      }
    }
  };

  return (
    <DashboardWrapper>
      <PageTitle>Admin Dashboard</PageTitle>
      {notification.message && <Notification className={notification.type}>{notification.message}</Notification>}

      <FormSection>
        <FormTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Name*</label>
            <input type="text" name="name" id="name" value={currentProduct.name} onChange={handleInputChange} required disabled={formSubmitting} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="description">Description* (Max 100 chars)</label>
            <textarea name="description" id="description" value={currentProduct.description} onChange={handleInputChange} required maxLength={100} disabled={formSubmitting} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="price">Price*</label>
            <input type="number" name="price" id="price" value={currentProduct.price} onChange={handleInputChange} required min={0} step={0.01} disabled={formSubmitting} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="category">Category*</label>
            <select name="category" id="category" value={currentProduct.category} onChange={handleInputChange} required disabled={formSubmitting}>
              <option value="scarf">Scarf</option>
              <option value="beanie">Beanie</option>
              <option value="accessory">Accessory</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="imageUrl">Image URL*</label>
            <input type="text" name="imageUrl" id="imageUrl" value={currentProduct.imageUrl} onChange={handleInputChange} required disabled={formSubmitting} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="size">Size (Optional)</label>
            <input type="text" name="size" id="size" value={currentProduct.size || ''} onChange={handleInputChange} disabled={formSubmitting} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="color">Color (Optional)</label>
            <input type="text" name="color" id="color" value={currentProduct.color || ''} onChange={handleInputChange} disabled={formSubmitting} />
          </FormGroup>
          <Button type="submit" disabled={formSubmitting}>{formSubmitting ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Product' : 'Add Product')}</Button>
          {isEditing && <Button type="button" onClick={resetForm} className="secondary" disabled={formSubmitting}>Cancel Edit</Button>}
        </form>
      </FormSection>

      <ProductListSection>
        <FormTitle>Manage Products</FormTitle> {/* Changed Title */}
        {loading ? <LoadingText>Loading products...</LoadingText> :
        products.length > 0 ? (
          <ProductTable>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td><img src={product.imageUrl} alt={product.name} /></td>
                  <td>{product.name}</td>
                  <td>${typeof product.price === 'number' ? product.price.toFixed(2) : String(product.price || '0.00')}</td>
                  <td>{product.category}</td>
                  <td>
                    <ActionButton className="edit" onClick={() => handleEditProduct(product)} disabled={formSubmitting}>Edit</ActionButton>
                    <ActionButton className="delete" onClick={() => handleDeleteProduct(product._id)} disabled={formSubmitting}>Delete</ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
        ) : (
          <p>No products yet. Add some using the form above!</p>
        )}
      </ProductListSection>
    </DashboardWrapper>
  );
};

export default AdminDashboardPage;
