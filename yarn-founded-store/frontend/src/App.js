import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import './App.global.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductGalleryPage from './pages/ProductGalleryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ContactPage from './pages/ContactPage';

// Basic 404 component
const NotFoundPage = () => (
  <div style={{ textAlign: 'center', padding: '50px', fontFamily: theme.fonts.body }}>
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <Link to="/" style={{ color: theme.colors.primary, textDecoration: 'underline' }}>Go to Homepage</Link>
  </div>
);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App"> {/* This div is now the flex container */}
          <Navbar />
          <main style={{ flexGrow: 1, paddingTop: '20px', paddingBottom: '20px', width: '100%' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<ProductGalleryPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} /> {/* Catch-all 404 route */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
