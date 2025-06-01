import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme';

const ContactPageWrapper = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 20px auto;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
`;

const PageTitle = styled.h1`
  font-family: ${theme.fonts.headings};
  color: ${theme.colors.secondary};
  font-size: 2.8em;
  margin-bottom: 30px;
`;

const ContactInfoSection = styled.section`
  margin-bottom: 40px;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text};
  font-size: 1.1em;
  line-height: 1.8;

  p {
    margin: 10px 0;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialLinks = styled.div`
  margin-top: 20px;
  a {
    margin: 0 15px;
    font-size: 1.2em; /* Adjusted for better fit with text */
    color: ${theme.colors.secondary};
    text-decoration: none; /* Ensure no default underline */
    &:hover {
        color: ${theme.colors.accent};
        text-decoration: underline; /* Underline on hover for clarity */
    }
  }
  /* Placeholder for actual icons - you'd use <img> or an icon library here */
`;

const ContactFormSection = styled.section`
  padding: 30px 20px; /* Increased padding */
  border-top: 1px solid ${theme.colors.secondary_light || '#AABBAA'}; /* Fallback */
`;

const FormTitle = styled.h2`
  font-family: ${theme.fonts.headings};
  color: ${theme.colors.secondary};
  font-size: 1.8em;
  margin-bottom: 25px; /* Increased margin */
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text};
    margin-bottom: 8px;
    font-weight: bold;
  }

  input[type='text'],
  input[type='email'],
  textarea {
    padding: 12px;
    font-family: ${theme.fonts.body};
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    &:focus {
      border-color: ${theme.colors.primary};
      outline: none;
      box-shadow: 0 0 0 2px ${theme.colors.primary_light || '#FADBD8'}; /* Fallback for primary_light */
    }
  }
  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 12px 25px;
  border: none;
  border-radius: 4px;
  font-family: ${theme.fonts.body};
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* Added color transition */
  display: block; /* Make button block to center it */
  margin: 20px auto 0; /* Center button */


  &:hover {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.text};
  }
`;

const Notification = styled.p`
  font-family: ${theme.fonts.body};
  color: ${props => props.type === 'success' ? (theme.colors.secondary || '#0F5132') : (theme.colors.primary || '#721C24')}; /* Fallbacks */
  background-color: ${props => props.type === 'success' ? (theme.colors.secondary_light || '#D1E7DD') : '#F8D7DA'}; /* Fallbacks */
  border: 1px solid ${props => props.type === 'success' ? (theme.colors.secondary || '#A3CBA2') : (theme.colors.primary || '#F5C6CB')}; /* Fallbacks */
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px; /* Increased margin */
  font-weight: bold;
`;

// Replace with your actual contact details
const YOUR_EMAIL = 'hello@yarnfounded.com';
const YOUR_WHATSAPP_NUMBER = '1234567890'; // Used for wa.me link. Example: +15551234567
const YOUR_INSTAGRAM_HANDLE = 'yarnfounded';


const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [notification, setNotification] = useState({ text: '', type: '' }); // type: 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setNotification({ text: 'Please fill in all fields.', type: 'error' });
      return;
    }
    // Email validation (basic)
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setNotification({ text: 'Please enter a valid email address.', type: 'error' });
        return;
    }
    // Simulate form submission
    console.log('Form submitted:', formData);
    setNotification({ text: 'Thank you for your message! We will get back to you soon.', type: 'success' });
    setFormData({ name: '', email: '', message: '' }); // Reset form
    setTimeout(() => setNotification({ text: '', type: '' }), 5000); // Clear notification after 5s
  };

  return (
    <ContactPageWrapper>
      <PageTitle>Get In Touch</PageTitle>

      <ContactInfoSection>
        <p>Have a question or a special request? We'd love to hear from you!</p>
        <p>Email us at: <a href={`mailto:${YOUR_EMAIL}`}>${YOUR_EMAIL}</a></p>
        <p>Or reach out via WhatsApp: <a href={`https://wa.me/${YOUR_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></p>
        <SocialLinks>
          Follow us on Instagram:
          <a href={`https://instagram.com/${YOUR_INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer">
            {/* Placeholder for Instagram Icon - In a real app, use an SVG or <img> */}
            @${YOUR_INSTAGRAM_HANDLE}
          </a>
        </SocialLinks>
      </ContactInfoSection>

      <ContactFormSection>
        <FormTitle>Send Us a Message</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
          </FormGroup>
          <SubmitButton type="submit">Send Message</SubmitButton>
        </form>
        {notification.text && <Notification type={notification.type}>{notification.text}</Notification>}
      </ContactFormSection>
    </ContactPageWrapper>
  );
};

export default ContactPage;
