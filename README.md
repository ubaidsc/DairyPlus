# DairyPlus

DairyPlus is a comprehensive Dairy Farm Management System built with advanced technologies like Next.js 15, Redux, MongoDB, and more. This production-level application includes authentication and various features to manage dairy farm operations efficiently.

## Features

- **Milk Production Management**: Track and manage milk production data for each cow.
- **Cow Management**: Add, update, and delete cow information.
- **User Authentication**: Secure login and registration system.
- **Data Visualization**: Visualize milk production data with charts and graphs.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Next.js 15**: React framework for server-side rendering and static site generation.
- **Redux**: State management library for managing application state.
- **MongoDB**: NoSQL database for storing application data.
- **MUI (Material-UI)**: React component library for building user interfaces.
- **Formik**: Form library for handling form state and validation.
- **Yup**: Schema builder for form validation.
- **Axios**: Promise-based HTTP client for making API requests.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/DairyPlus.git
cd DairyPlus
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

Build the application for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```plaintext
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Redux Documentation](https://redux.js.org/introduction/getting-started) - Learn about Redux for state management.
- [MongoDB Documentation](https://docs.mongodb.com/) - Learn about MongoDB NoSQL database.
- [MUI Documentation](https://mui.com/getting-started/installation/) - Learn about Material-UI for building user interfaces.
- [Formik Documentation](https://formik.org/docs/overview) - Learn about Formik for form handling.
- [Yup Documentation](https://github.com/jquense/yup) - Learn about Yup for form validation.
- [Axios Documentation](https://axios-http.com/docs/intro) - Learn about Axios for making HTTP requests.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
