# EcommerceAssignment

A modern e-commerce platform built with React, TypeScript, Vite, shadcn-ui, and Tailwind CSS.

## Project Repository

GitHub: [https://github.com/ArmaanRawat/EcommerceAssignment](https://github.com/ArmaanRawat/EcommerceAssignment)

To set the remote for your local repository:

```sh
git remote add origin https://github.com/ArmaanRawat/EcommerceAssignment.git
```

## Features

- Product listing with infinite scroll
- Category-based filtering (toggle buttons)
- Product search bar in the navbar
- Product detail pages
- Shopping cart with add/remove/update
- Responsive, modern UI

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/ArmaanRawat/EcommerceAssignment.git
   cd EcommerceAssignment
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:8080](http://localhost:8080) by default.

## Assumptions & Limitations

- The product and category data are fetched from a public API (https://fakestoreapi.in/). If the API is unavailable, product listing will not work.
- No authentication or user accounts are implemented.
- Cart data is stored in localStorage and is not persistent across devices.
- No payment gateway or real checkout process is included (demo only).
- Product images and categories are as provided by the API; no custom content.
- Pagination and infinite scroll are limited by the API’s response and may not scale to very large datasets.

## Future Improvements

- Add user authentication and user-specific carts/orders.
- Integrate a real payment gateway for checkout.
- Add product reviews and ratings from users.
- Improve error handling and loading states.
- Add admin dashboard for product management.
- Add unit and integration tests.
- Add support for multiple languages and currencies.
- Enhance accessibility and mobile UX further.
- Add product image zoom and gallery features.
- Improve SEO and add meta tags for better sharing.

## Deployment

You can deploy this project using platforms like Vercel, Netlify, or your own server. Follow their documentation for React/Vite projects.

## License

This project is for educational/demo purposes. Please contact the author for other uses.
