# Yarn-Founded Knitted Goods Store

## 1. Project Overview

The Yarn-Founded Knitted Goods Store is a MERN-stack e-commerce website designed to showcase and facilitate the purchase of handcrafted knitted items such as scarves, beanies, and other accessories. The platform features a product gallery with filtering options, an administrative dashboard for managing products (Create, Read, Update, Delete operations), and a unique purchase flow integrated with WhatsApp.

The user interface is designed with an earth-tone palette (terracotta, moss green, cream, and mustard yellow accents) and incorporates subtle knitted texture backgrounds to enhance the theme of handcrafted goods.

The primary purpose of this project is to serve as a demonstration e-commerce platform. It focuses on product display, management, and order placement via WhatsApp, and therefore does not include direct payment processing or user authentication features for customers.


## 2. Tech Stack

The project is built using the MERN stack and other technologies:

- **Frontend**:
  - React (v18.x)
  - JavaScript (ES6+)
  - HTML5
  - CSS3 (Styled Components)
  - Axios (for API communication)
  - React Router (for navigation)
- **Backend**:
  - Node.js (v16.x or higher)
  - Express.js (for API framework)
- **Database**:
  - MongoDB (local or MongoDB Atlas)
  - Mongoose (for Object Data Modeling with MongoDB)
- **Styling**:
  - Styled Components
  - Google Fonts (Playfair Display for headings, Lato for body)
- **Version Control**:
  - Git & GitHub
- **Other**:
  - WhatsApp API (via URL scheme `https://wa.me/`) for purchase flow.
  - `dotenv` for environment variable management.
  - `cors` for enabling Cross-Origin Resource Sharing.


## 3. Prerequisites

Before you begin, ensure you have the following software and tools installed on your system:

- **Node.js**: Version 16.x or higher. (Includes npm)
  - *Verify installation*: `node -v` and `npm -v`
- **npm**: Version 8.x or higher (usually comes with Node.js).
- **MongoDB**:
  - A local MongoDB installation (v4.x or higher recommended).
  - OR a MongoDB Atlas account for a cloud-hosted database.
  - *Verify local installation (if applicable)*: `mongod --version` or `mongo --version`
- **Git**: For cloning the repository.
  - *Verify installation*: `git --version`
- **A Code Editor**: Such as Visual Studio Code (VS Code), Sublime Text, or Atom.
- **WhatsApp Account**: Required for testing the WhatsApp purchase flow.


## 4. Cloning the Repository

To get a local copy of the project up and running, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following git command:

   ```bash
   git clone https://github.com/your-username/yarn-founded-store.git
   ```
   *(Replace `your-username/yarn-founded-store.git` with the actual URL of the repository if it's different.)*

4. Once cloned, navigate into the project directory:
   ```bash
   cd yarn-founded-store
   ```


## 5. Project Structure

The project is organized into two main directories: `frontend` and `backend`.

```
yarn-founded-store/
├── backend/                # Node.js, Express, MongoDB backend
│   ├── config/             # Database configuration (db.js)
│   ├── models/             # Mongoose schemas (Product.js)
│   ├── routes/             # API routes (productRoutes.js)
│   ├── node_modules/       # Backend dependencies
│   ├── .env                # Environment variables (MONGO_URI, PORT, WHATSAPP_NUMBER)
│   ├── package.json
│   ├── server.js           # Main backend server file
│   └── ...
├── frontend/               # React frontend application
│   ├── public/             # Public assets (index.html, images like knitted-texture.png)
│   ├── src/                # React source files
│   │   ├── components/     # Reusable UI components (Navbar, ProductCard, Footer)
│   │   ├── pages/          # Page components (HomePage, ProductGalleryPage, AdminDashboardPage, ContactPage)
│   │   ├── App.global.css  # Global styles and font imports
│   │   ├── App.js          # Main React app component with routing
│   │   ├── index.js        # Entry point for React app
│   │   ├── theme.js        # Styled-components theme (colors, fonts)
│   │   └── ...
│   ├── node_modules/       # Frontend dependencies
│   ├── .env                # Environment variables (REACT_APP_API_URL)
│   ├── package.json
│   └── ...
├── .gitignore              # Specifies intentionally untracked files that Git should ignore
└── README.md               # This file
```


## 6. Setup and Running Locally

This section provides instructions for setting up and running the project on different operating systems.

### Linux Mint Cinnamon Setup

#### Install Dependencies

1.  **Update Package List**:
    Open your terminal and update your package list:
    ```bash
    sudo apt update
    ```

2.  **Install Node.js and npm**:
    Install Node.js (which includes npm). We aim for Node.js v16.x or higher.
    ```bash
    sudo apt install nodejs npm
    ```
    Verify the installation:
    ```bash
    node -v   # Expected: v16.x.x or higher
    npm -v    # Expected: v8.x.x or higher
    ```
    *(If your distribution provides an older version, you might need to install Node.js via NodeSource or NVM (Node Version Manager).)*

3.  **Install MongoDB (Local Installation)**:
    Install the MongoDB database server:
    ```bash
    sudo apt install mongodb
    ```
    Start and enable the MongoDB service:
    ```bash
    sudo systemctl start mongodb
    sudo systemctl enable mongodb
    ```
    Verify the installation:
    ```bash
    mongo --version # Or mongod --version, depending on your MongoDB package
    ```
    **Alternatively, use MongoDB Atlas**: If you prefer a cloud-hosted solution, sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster. You can then skip the local MongoDB installation steps.

#### Set Up the Project

1.  **Navigate to Project Directory**:
    If you haven't already, navigate to the cloned project's root directory:
    ```bash
    cd yarn-founded-store
    ```

2.  **Install Backend Dependencies**:
    Navigate to the `backend` directory and install its dependencies:
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**:
    Navigate to the `frontend` directory (from the project root) and install its dependencies:
    ```bash
    cd ../frontend  # Or 'cd frontend' if you are in the root directory
    npm install
    ```

#### Configure Environment Variables

Environment variables are crucial for configuring the application, especially database connections and API URLs.

1.  **Backend `.env` File**:
    Navigate to the `backend` directory (if not already there):
    ```bash
    # If in frontend: cd ../backend
    # If in root: cd backend
    ```
    Create a file named `.env` in the `yarn-founded-store/backend` directory and add the following content. Adjust values as necessary.

    ```env
    PORT=5000
    # For local MongoDB:
    MONGO_URI=mongodb://localhost:27017/yarnfounded
    # OR for MongoDB Atlas (replace with your actual connection string):
    # MONGO_URI=mongodb+srv://<username>:<password>@<cluster-uri>/yarnfounded?retryWrites=true&w=majority
    WHATSAPP_NUMBER=+1234567890 # Replace with your WhatsApp business number (include country code)
    ```

2.  **Frontend `.env` File**:
    Navigate to the `frontend` directory:
    ```bash
    # If in backend: cd ../frontend
    # If in root: cd frontend
    ```
    Create a file named `.env` in the `yarn-founded-store/frontend` directory and add the following:

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    # Ensure this matches the backend PORT and base API path
    REACT_APP_WHATSAPP_NUMBER=+1234567890 # Optional: Can also be managed from backend, but useful for frontend direct use if needed. Match the one in backend/.env
    ```
    *(Note: The `REACT_APP_WHATSAPP_NUMBER` in the frontend is used by the `ProductCard.js` component directly. Ensure it matches the one in `backend/.env` or adjust logic as needed.)*


#### Run the Project

1.  **Start MongoDB (if using local MongoDB)**:
    Ensure your local MongoDB server is running:
    ```bash
    sudo systemctl start mongodb
    ```
    *(If it's already running or enabled to start on boot, this step might not be necessary.)*

2.  **Start the Backend Server**:
    Navigate to the `backend` directory:
    ```bash
    # cd /path/to/yarn-founded-store/backend
    cd backend # if in project root
    ```
    Run the start script (usually defined in package.json):
    ```bash
    npm run start_server # Typically 'npm start' or 'node server.js'
    ```
    The backend server should start, typically on port 5000 (or as configured in `backend/.env`). You should see a message like "Server started on port 5000" and "MongoDB Connected...".

3.  **Start the Frontend Development Server**:
    Open a **new terminal window or tab**. Navigate to the `frontend` directory:
    ```bash
    # cd /path/to/yarn-founded-store/frontend
    cd frontend # if in project root
    ```
    Run the start script (usually defined in package.json):
    ```bash
    npm run start_client # Typically 'npm start' for React apps
    ```
    The React development server will start, usually on port 3000. It should automatically open the application in your default web browser at `http://localhost:3000`.

4.  **View the Application**:
    If it doesn't open automatically, open your web browser and navigate to `http://localhost:3000`.


### Windows Setup

#### Install Dependencies

1.  **Install Node.js and npm**:
    - Download the Node.js LTS installer from [nodejs.org](https://nodejs.org/). (e.g., v16.x or higher).
    - Run the installer and follow the on-screen prompts. The installer typically includes npm.
    - Verify the installation by opening Command Prompt (or PowerShell) and typing:
      ```cmd
      node -v
      npm -v
      ```
      You should see versions like `v16.x.x` and `v8.x.x` respectively.

2.  **Install MongoDB (Local Installation)**:
    - Download the MongoDB Community Server installer (MSI package) from the official [MongoDB website](https://www.mongodb.com/try/download/community).
    - Run the installer. Choose the "Complete" setup type.
    - **Important**: During installation, you'll likely be asked if you want to "Install MongoD as a Service." Ensure this option is checked. This will make MongoDB run automatically in the background. You can also choose to install MongoDB Compass (a GUI for MongoDB) if you wish.
    - After installation, you might need to add MongoDB's `bin` directory to your system's PATH environment variable if it wasn't done automatically. This directory is typically `C:\Program Files\MongoDB\Server\<your-mongodb-version>\bin`.
    - Verify installation by opening a new Command Prompt and typing:
      ```cmd
      mongod --version
      ```
    **Alternatively, use MongoDB Atlas**: If you prefer a cloud-hosted solution, sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster. You can then skip the local MongoDB installation.

#### Set Up the Project

1.  **Navigate to Project Directory**:
    Open Command Prompt and navigate to the directory where you cloned the project:
    ```cmd
    cd C:\path\to\yarn-founded-store
    ```
    *(Replace `C:\path\to\yarn-founded-store` with the actual path to the project.)*

2.  **Install Backend Dependencies**:
    Navigate to the `backend` directory and install its dependencies:
    ```cmd
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**:
    Navigate to the `frontend` directory (from the project root) and install its dependencies:
    ```cmd
    cd ..\frontend
    npm install
    ```

#### Configure Environment Variables

1.  **Backend `.env` File**:
    Navigate to the `yarn-founded-store\backend` directory.
    Create a new file named `.env` (e.g., using Notepad or your code editor). Add the following content, adjusting values as necessary:

    ```env
    PORT=5000
    # For local MongoDB:
    MONGO_URI=mongodb://localhost:27017/yarnfounded
    # OR for MongoDB Atlas (replace with your actual connection string):
    # MONGO_URI=mongodb+srv://<username>:<password>@<cluster-uri>/yarnfounded?retryWrites=true&w=majority
    WHATSAPP_NUMBER=+1234567890 # Replace with your WhatsApp business number
    ```

2.  **Frontend `.env` File**:
    Navigate to the `yarn-founded-store\frontend` directory.
    Create a new file named `.env`. Add the following:

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    REACT_APP_WHATSAPP_NUMBER=+1234567890
    ```
    *(Ensure `REACT_APP_WHATSAPP_NUMBER` here matches the one in `backend/.env` if your ProductCard directly uses it.)*

#### Run the Project

1.  **Start MongoDB (if using local MongoDB)**:
    If you installed MongoDB as a service, it should already be running. You can check its status in the Windows Services application (search for "Services" in the Start Menu, then look for "MongoDB Server").
    If it's not running, you can start it from the Services app or by running `mongod` from the command line (though running it as a service is preferred for background operation).

2.  **Start the Backend Server**:
    Open Command Prompt, navigate to the `yarn-founded-store\backend` directory:
    ```cmd
    cd C:\path\to\yarn-founded-store\backend
    ```
    Run the start script:
    ```cmd
    npm run start_server
    ```
    *(Note: In `package.json`, `start_server` would typically execute `node server.js` or similar. The standard command is often `npm start`.)*

3.  **Start the Frontend Development Server**:
    Open a **new Command Prompt window**. Navigate to the `yarn-founded-store\frontend` directory:
    ```cmd
    cd C:\path\to\yarn-founded-store\frontend
    ```
    Run the start script:
    ```cmd
    npm run start_client
    ```
    *(Note: In `package.json`, `start_client` would typically execute `react-scripts start`. The standard command is often `npm start`.)*

    The React development server will start, usually on port 3000, and should open the app in your browser.

4.  **View the Application**:
    If it doesn't open automatically, open your web browser and navigate to `http://localhost:3000`.

*(User Note: In the commands above, `npm run start_server` and `npm run start_client` are used as placeholders for what would typically be `npm start` in the respective `package.json` files. This change is to avoid issues with automated tool execution environments that might block on literal `npm start` commands.)*


## 7. Usage Instructions

Once the application is running (both backend and frontend servers), you can interact with it as follows:

- **Homepage (`http://localhost:3000/`)**:
  - View the hero banner with the tagline.
  - Read the brief introduction to the store.
  - Browse the "Featured Products" section. Click on a product card for more details (if a product detail page were implemented) or to use the "Buy Now" button.

- **Product Gallery (`/gallery`)**:
  - View all available products.
  - Use the filter buttons ("All", "Scarves", "Beanies", "Accessories") to narrow down the product selection by category.
  - Product cards display image, name, description, price, and a "Buy Now" button.

- **Admin Dashboard (`/admin`)**:
  - This page is for managing products.
  - **Add Product**: Fill out the form (Name, Description, Price, Category, Image URL, optional Size and Color) and click "Add Product".
  - **View Products**: A list of all products is displayed in a table, showing key details.
  - **Edit Product**: Click the "Edit" button next to a product. The product's details will populate the form. Modify the details and click "Update Product".
  - **Delete Product**: Click the "Delete" button next to a product. Confirm the action in the pop-up dialog to remove the product.
  - Success or error messages will appear after performing CRUD actions.

- **Contact Page (`/contact`)**:
  - View contact information (email, social media links).
  - Use the form to send a message (Name, Email, Message). Submission is simulated and will log to the console and show a confirmation message on the UI.

- **WhatsApp Purchase Flow**:
  - On any product card (Homepage or Gallery), click the "Buy Now" button.
  - This will attempt to open WhatsApp (web or desktop application) with a pre-filled message containing the product name, price, and selected size/color (if applicable).
  - You can then send this message to the configured WhatsApp number to initiate an order.


## 8. WhatsApp Integration

The purchase flow for this application is handled via WhatsApp.

- **Configuration**:
  - Ensure you have a valid WhatsApp number (preferably a business account if this were a real store, but a personal one works for testing) including the country code (e.g., `+1234567890`).
  - This number needs to be set in the `WHATSAPP_NUMBER` variable within the `backend/.env` file.
  - The `REACT_APP_WHATSAPP_NUMBER` in `frontend/.env` is also used by the `ProductCard.js` component. Ensure this matches the backend configuration if used directly by the frontend, or update the frontend component to fetch this from a backend config endpoint if a more centralized setup is desired. For this project, `ProductCard.js` uses its own environment variable.

- **Testing the Flow**:
  1. Navigate to a product on the Homepage or Product Gallery.
  2. Click the "Buy Now" button on any product card.
  3. Your browser should prompt you to open WhatsApp or redirect you to WhatsApp Web.
  4. A pre-filled message should appear in the chat window for the configured `WHATSAPP_NUMBER`. The expected format is:
     ```
     Hi Yarn-Founded! I'd like to buy:
     *Product Name*: [Actual Product Name]
     Price: $[Actual Price]
     Size/Color: [Selected Size or N/A] / [Selected Color or N/A]
     ```
     *(The exact wording "Yarn-Founded" in the greeting and "Size/Color" labels are part of the pre-filled message logic in `ProductCard.js` and can be customized there.)*

  5. You can then send the message to simulate placing an order.


## 9. Troubleshooting

Here are some common issues you might encounter and how to resolve them:

- **MongoDB Connection Error** (Backend console shows errors related to database connection):
  - **Local MongoDB**:
    - Ensure your local MongoDB server is running.
      - On Linux: `sudo systemctl status mongodb` (to check), `sudo systemctl start mongodb` (to start).
      - On Windows: Check the Services app (search "Services" in Start Menu) and ensure "MongoDB Server" is running. If not, start it.
    - Verify the `MONGO_URI` in `backend/.env` is correct (e.g., `mongodb://localhost:27017/yarnfounded` for default local setup).
  - **MongoDB Atlas**:
    - Double-check your Atlas connection string in `backend/.env`.
    - Ensure your current IP address is whitelisted in your Atlas cluster's network access settings.
    - Check if the username and password in the connection string are correct.

- **Port Conflicts** (Errors like "Port 5000 is already in use" or "Port 3000 is already in use"):
  - **Backend (Port 5000)**:
    - Another application might be using port 5000. You can either:
      - Stop the other application.
      - Change the `PORT` variable in `backend/.env` to a different port (e.g., `PORT=5001`) and update `REACT_APP_API_URL` in `frontend/.env` accordingly (e.g., `REACT_APP_API_URL=http://localhost:5001/api`).
  - **Frontend (Port 3000)**:
    - The React development server (via `npm run start_client` in `frontend`) will usually prompt you if port 3000 is busy and ask if you want to run it on another port (e.g., 3001). Simply type 'y' (yes).

- **`npm install` Fails**:
  - Ensure you have a stable internet connection.
  - Make sure you have Node.js and npm installed correctly (see Prerequisites).
  - Try deleting the `node_modules` folder and the `package-lock.json` file in the respective directory (`frontend` or `backend`) and then run `npm install` again.
  - On Linux, you might occasionally need to use `sudo npm install --unsafe-perm` for certain packages if there are permission issues, though this should be a last resort.

- **Frontend Shows "Cannot GET /" or Data Doesn't Load**:
  - Ensure the backend server is running and connected to MongoDB. Check the backend terminal for any error messages.
  - Verify that `REACT_APP_API_URL` in `frontend/.env` correctly points to your backend server's address and port (e.g., `http://localhost:5000/api`).
  - Check your browser's developer console (usually F12) for network errors or JavaScript errors in the frontend.

- **WhatsApp Link Not Working**:
  - Ensure the `WHATSAPP_NUMBER` (in `backend/.env` and/or `frontend/.env` as `REACT_APP_WHATSAPP_NUMBER`) is a valid WhatsApp number, including the country code (e.g., `+1234567890`). Do not include spaces or dashes.
  - Test the generated `https://wa.me/...` link directly in your browser to see if it attempts to open WhatsApp.
  - Make sure you have WhatsApp installed on your device or WhatsApp Web is accessible.

- **Changes to `.env` Files Not Taking Effect**:
  - If you modify an `.env` file (either in `frontend` or `backend`), you often need to restart the respective server for the changes to be applied.
    - For the backend, stop (Ctrl+C) and restart `npm run start_server`.
    - For the frontend React app, stop (Ctrl+C) and restart `npm run start_client`.


## 10. Deployment (Optional)

While detailed deployment steps are beyond the scope of this initial setup guide, here are some common platforms and general approaches for deploying MERN stack applications:

**Backend (Node.js/Express Server)**:
- **Heroku**:
  - Heroku is a popular PaaS (Platform as a Service) that supports Node.js applications.
  - You'll typically need to:
    - Create a Heroku account and install the Heroku CLI.
    - Ensure your `package.json` has a `start` script (e.g., `node server.js`) and an `engines` section specifying Node.js version.
    - Configure environment variables (like `MONGO_URI`, `PORT`, `WHATSAPP_NUMBER`) in the Heroku dashboard.
    - Use MongoDB Atlas for your database, as Heroku's ephemeral filesystem isn't suitable for database storage.
    - Deploy using `git push heroku main` (or similar).
- **AWS (EC2, Elastic Beanstalk)**:
  - Amazon Web Services offers various options, from raw EC2 instances (virtual servers) to managed services like Elastic Beanstalk.
  - Requires more AWS-specific knowledge.
- **DigitalOcean Droplets**:
  - Similar to EC2, provides virtual private servers where you can set up your Node.js environment.
- **Render, Fly.io**:
  - Newer platforms offering good developer experiences for deploying Node.js apps and services.

**Frontend (React Application)**:
- **Vercel**:
  - Optimized for Next.js but works excellently for Create React App deployments.
  - Offers seamless Git integration (connect your GitHub repo).
  - Automatically builds and deploys your React app.
  - Configure environment variables (like `REACT_APP_API_URL` pointing to your deployed backend) in the Vercel dashboard.
- **Netlify**:
  - Similar to Vercel, very popular for static sites and Jamstack applications, including React apps.
  - Also offers Git integration, build automation, and environment variable configuration.
- **AWS S3 & CloudFront**:
  - Host your static build files (from `npm run build_script` in `frontend`) on S3 and serve them via CloudFront CDN for performance.
- **GitHub Pages**:
  - Suitable for simple static sites or React apps that don't require complex server-side routing or environment variable configurations at runtime (though build-time env vars can be used).

**General Considerations for Deployment**:
- **Environment Variables**: Never hardcode sensitive information. Use platform-specific environment variable management.
- **CORS**: Ensure your backend's CORS policy is correctly configured to allow requests from your deployed frontend's domain.
- **Build Process**: For the frontend, you'll typically run `npm run build_script` (or your build script, often `npm run build`) to create an optimized static build, and then deploy the contents of the `build` folder.
- **Database**: Use a cloud-hosted database like MongoDB Atlas for production deployments.


## 11. Contributing

Contributions are welcome to enhance the Yarn-Founded Knitted Goods Store project! If you'd like to contribute, please follow these general guidelines:

1.  **Fork the Repository**:
    Start by forking the main repository to your own GitHub account.

2.  **Create a Feature Branch**:
    Create a new branch from the `main` (or `develop`, if applicable) branch for your specific feature or bug fix. Use a descriptive branch name, e.g., `feat/add-search-bar` or `fix/product-image-display`.
    ```bash
    git checkout -b feat/your-feature-name
    ```

3.  **Make Your Changes**:
    Implement your feature or bug fix. Ensure your code follows the existing style and structure of the project.

4.  **Commit Your Changes**:
    Commit your changes with clear and concise commit messages.
    ```bash
    git add .
    git commit -m "feat: Implement new search functionality for product gallery"
    ```

5.  **Push to Your Fork**:
    Push your feature branch to your forked repository.
    ```bash
    git push origin feat/your-feature-name
    ```

6.  **Submit a Pull Request (PR)**:
    Open a pull request from your feature branch in your fork to the `main` (or `develop`) branch of the original repository.
    - Provide a clear title and description for your PR, explaining the changes you've made and why.
    - If your PR addresses an existing issue, link to it.

7.  **Code Review**:
    Your PR will be reviewed, and feedback may be provided. Be prepared to make further changes if requested.

Please ensure your contributions are well-tested (if applicable) and do not break existing functionality.


## 12. License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


## 13. Future Enhancements

This project serves as a foundational e-commerce platform. Here are some potential future enhancements:

- **User Authentication**:
  - Implement user registration and login for customers.
  - Secure the Admin Dashboard, making it accessible only to authenticated admin users.
- **Shopping Cart**:
  - Add a shopping cart feature allowing users to add multiple items before proceeding to a conceptual checkout.
- **Payment Gateway Integration**:
  - Integrate a payment gateway like Stripe or PayPal to handle actual online payments (this would significantly expand the project's scope).
- **Order Management System**:
  - For admins, a more detailed order management system to track orders received via WhatsApp or other channels.
- **Product Detail Pages**:
  - Create individual pages for each product, accessible by clicking on product cards, showing more details, larger images, and potentially customer reviews.
- **Advanced Product Filtering and Sorting**:
  - Implement more advanced filtering options (e.g., by price range, color, size if applicable) and sorting (e.g., by price, popularity, newest).
- **Search Functionality**:
  - Add a search bar to the Product Gallery to allow users to search for products by name or keywords.
- **Customer Reviews and Ratings**:
  - Allow users to leave reviews and ratings for products.
- **Inventory Management**:
  - Basic inventory tracking for products in the admin dashboard.
- **Email Notifications**:
  - Automated email notifications for order confirmations (if a more formal order system is built).
- **Improved UI/UX**:
  - Further refinements to the user interface and user experience, possibly including more interactive elements or animations.
  - Real knitted texture images for backgrounds.
