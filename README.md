# Vive-la-UCA Landing Page

This repository contains the source code for the Vive-la-UCA landing page. The website is built using [Astro](https://astro.build/) and Dockerized for easy deployment.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/)

## Getting Started

To build and run the application, follow these steps:

### Clone the Repository

```bash
git clone https://github.com/Vive-la-UCA/landing.git
cd landing
```

### Build the Docker Image

```bash
sudo docker-compose build
```

### Run the Docker Container

```bash
sudo docker-compose up
```

The application should now be running and accessible at `http://localhost:4321`. And the name of the container is `vive-la-uca-landing`

## Application Setup

### Install Dependencies

If you want to run the project locally without Docker, you can install the dependencies with:

```bash
npm install
```

### Run the Development Server

To start the development server, run:

```bash
npm run dev
```

### Build the Project

To build the project for production, run:

```bash
npm run build
```

### Preview the Production Build

To preview the production build, run:

```bash
npm run start
```
