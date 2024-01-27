

# Metagram Social Media App

![Metagram Logo](/public/icons/logo.png)

## Overview

Metagram is a cutting-edge social media app built using Next.js, MongoDB, and incorporating server-side actions. This app provides a seamless and engaging platform for users to connect, share moments, and build meaningful connections. With its intuitive design and robust features, Metagram aims to redefine the social networking experience.

## Features

- **User Profiles:** Create and customize your profile to showcase your personality and interests.

- **Post Sharing:** Share your life moments with friends through photos, videos, and text updates.

- **Follow and Connect:** Connect with friends and follow interesting accounts to stay updated with their posts.

- **News Feed:** Experience a personalized feed tailored to your interests and connections.

- **Notifications:** Stay informed with real-time notifications for likes, comments, and new followers (#will add later).

- **Search Functionality:** Easily find and connect with new friends or discover trending posts (#will add later).

## Technologies Used

- **Next.js 14:** A React-based framework for building server-side rendered and statically generated web applications.

- **React:** A JavaScript library for building user interfaces.

- **Tailwind CSS:** A utility-first CSS framework for building modern and responsive designs.

- **MongoDB:** A NoSQL database for storing user profiles, posts, and other data.

- **Next.js Backend:** Utilized for real-time features, authentication with JWT token.

- **Cloudinary:** Utilized for Uploading photos online.

## Server-Side Actions

Metagram leverages Next.js server-side actions for:

- **Server-side Rendering (SSR):** Enhance performance by rendering pages on the server.

- **Next.js 14 Server Actions:** Implement custom functions for fetching and updating data securely on server itself like API routes.

## Getting Started

Follow these steps to run Metagram locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Azalmonawwar/social_media.git
   ```

2. Install dependencies:
   ```bash
   cd social_media
   npm install
   ```

3. Set up MongoDB:
   - Create a MongoDB database and obtain the connection URI.
   - Replace the placeholder value in `MONGODB_URI` in .env with your MongoDB connection URI.

4. Get your Cloudinary Keys:
   - Add all key and cloud url to env placeholder.

5. Add your JWT secret key:
   - Add any secure key in place of `JWT_SECRET` in your .env.

6. Create `.env` file:
   - Copy `.env.sample` to a new file named `.env`.
   - Replace the placeholder values in `.env` with your actual configuration for Cloudinary and MongoDB and JWT.

7. Run the app:
   ```bash
   npm run dev
   ```

8. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Contributing

We welcome contributions from the community! Feel free to open issues for bug reports or new feature suggestions.

