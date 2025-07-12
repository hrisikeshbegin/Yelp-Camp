# YelpCamp

A dynamic web application that allows users to explore and review nearby campgrounds and tourist spots. Users can view details and reviews of existing campgrounds, add new campgrounds, and upload images. YelpCamp fosters a community-driven platform for outdoor enthusiasts.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction
YelpCamp is a full-stack web application designed to connect outdoor enthusiasts. It enables users to:
- View campgrounds and tourist spot details with user reviews.
- Add new campgrounds, complete with images and descriptions.
- Review and rate campgrounds.

This project is built with Node.js, Express, MongoDB, and EJS for templating.

## Features
- User authentication and authorization using Passport.js.
- Cloudinary integration for image storage.
- Interactive map support via Mapbox SDK.
- Campground data validation using Joi.
- Secure application with Helmet, data sanitization, and more.


## Installation
Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd YelpCamp

2. Install dependencies:
```bash
  npm install

3. Set up the environment variables:

   Create a .env file in the root directory.
   Add the following variables:
   makefile
   ```bash
  CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
  CLOUDINARY_API_KEY=<your-cloudinary-api-key>
  CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
  MAPBOX_TOKEN=<your-mapbox-token>
  DATABASE_URL=<your-mongodb-connection-string>

4. Start the development server:

```bash
  npm start
