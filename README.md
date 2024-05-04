![Logo](https://res.cloudinary.com/dtdzvyf4s/image/upload/v1705736245/E-commerce/glowy-lab_azfonb.png)

# Build Your Diet

[Deployment link](https://glowylab.shop/)

Welcome to Glowy Lab. The website showcases a meticulously curated array of top-tier products. Let's discover unparalleled quality and convenience at my Canadian E-commerce hub, where I curate and offer the finest selection of products.

![](https://res.cloudinary.com/dtdzvyf4s/image/upload/v1706208265/glowy_nshjip.gif)

## Key Features

- Allow users sign in and sign up using their Google accounts
- Browse through a wide range of product categories
- Add desired items to the shopping cart
- Conveniently execute payments using credit or debit cards
- Receive email notifications post-payment and upon shipment or delivery of orders
- Real-time updates on product reviews and available stock quantities
- Access informative blogs for additional insights and knowledge
- Exclusive access to admin dashboard restricted to authorized personnel
- Admin privileges include overseeing all orders and updating their status (processing, shipping, or delivered)
- Admins can manage Sanity documents efficiently through the /studio route in Sanity studio
- Instant visual feedback provided through preview components during Sanity document editing

## Tech Stack Frontend

- Next.js
- React
- TypeScript
- Tailwind
- React Context API
- Sanity - a modern Headless CMS that helps manage heavy content
- Headless UI, Tailwind UI, Flowbite UI, Material-Tailwind UI and Aceternity UI
- Heroicons
- Husky
- Lint-staged

## Tech Stack Backend

- Auth0 - an IAM provider that facilitates OAuth 2.0 and Open ID Connect integration
- PostgreSQL database (hosted on Supabase)
- Prisma - ORM
- Ngrok - a reverse proxy that creates a secured tunnel between the local server and the internet, facilitating web hook testing
- Sendgrid API - a SMTP provider
- Stripe SDK - implement online payment
- Upstash SDK - severless platform that helps manage Redis database in serverless environment
- Pusher SDK - create bi-directional and realtime communication between servers and clients
- REST API

## Project achievement

- Utilize Sanity Headless CMS to manage rich content and provide instant visual feedback using presentation tool
- Incorporate Auth0 IAM provider to implement OAuth 2.0 and OpenID Connect, authenticating and authorizing users.
- Employ Prisma ORM to execute CRUD operations on a PostgreSQL database (hosted on Supabase).
- Deploy Ngrok (a reverse proxy that creates a secured tunnel between the local server and the internet) to facilitate local webhook testing.
- Use Sendgrid API (an SMTP provider) to send automated emails.
- Utilize Stripe SDK and Stripe API for online payments with credit and debit cards.
- Leverage Upstash SDK to manage Redis database in a serverless environment.
- Integrate Pusher SDK (a hosted WebSockets solution) to enable bidirectional communication between servers and clients
- Employ Next.js to build SSR and SSG pages, improving SEO and page load time
- Integrate UI components from libraries such as Headless UI, Tailwind UI, Flowbite UI and Material-Tailwind UI.

## Next steps

- Incorporate Docker for a high level of isolation between applications and their dependencies.
- Leverage Kubernetes (k8s) to facilitate service discovery, load balancing within the cluster, automated rollouts and rollbacks, self-healing of containers that fail, and configuration management.
- Deploy OpenAI api to build an AI chat supporter
- Create documentation for developers and end-users to facilitate easier usage and contribution

## Getting Started

Create an env file that includes all information as same as the env.sample file.

Install node-module and pakage json files with npm

```bash
  npm install
```

Run app in development mode:

```bash
npm run dev
```

Creates an optimized production build:

```bash
npm run build
```

Run app in production mode:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
