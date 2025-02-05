# Emergency Notification App

### Features
- User authentication and authorization using JWT and OAuth
- Secure password hashing with bcrypt
- Cross-origin resource sharing (CORS) support
- Database management with Drizzle ORM and PostgreSQL
- Input validation using Zod
- Express.js for handling HTTP requests

## Stacks Used
- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Library for hashing passwords
- **cors**: Middleware for enabling CORS
- **Drizzle**: ORM for PostgreSQL
- **PostgreSQL**: Relational database
- **OAuth**: Open standard for authorization
- **Zod**: TypeScript-first schema declaration and validation library

## How to Run the App
1. **Clone the repository:**
   ```bash
   git clone https://github.com/vconsoldev/Emergency-Notification.git
   cd Emergency-Notification
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/emergency_notification
   JWT_SECRET=your_jwt_secret
   OAUTH_CLIENT_ID=your_oauth_client_id
   OAUTH_CLIENT_SECRET=your_oauth_client_secret
   ```

4. **Run the application:**
   ```bash
   pnpm start
   ```

## How to Deploy the App
1. **Build the application:**
   ```bash
   pnpm build
   ```

2. **Deploy to a hosting service:**
   - **Heroku:**
     ```bash
     heroku create
     git push heroku main
     heroku open
     ```
   - **Vercel:**
     ```bash
     vercel
     ```
   - **AWS:**
     ```bash
     eb init
     eb create
     git push aws main
     ```

3. **Set up environment variables:**
   Ensure that the environment variables are set in the deployment environment:
   ```env
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/emergency_notification
   JWT_SECRET=your_jwt_secret
   OAUTH_CLIENT_ID=your_oauth_client_id
   OAUTH_CLIENT_SECRET=your_oauth_client_secret
   ```

4. **Access the deployed application:**
   Open the URL provided by the hosting service to access the deployed application.
