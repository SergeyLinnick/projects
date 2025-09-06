# NextJS Fullstack Ecommerce

A modern, full-stack e-commerce application built with Next.js 15, React 19, and Stripe integration. This project demonstrates a complete e-commerce solution with product catalog, shopping cart, and secure payment processing.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- **Product Catalog**: Browse and view products from Stripe
- **Shopping Cart**: Persistent cart with Zustand state management
- **Secure Payments**: Stripe integration for payment processing
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean interface with shadcn/ui components
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.2
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4.0.13
- **State Management**: Zustand
- **Payment Processing**: Stripe
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Heroicons, Lucide React
- **Build Tools**: ESLint, TypeScript

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── checkout/          # Checkout pages and actions
│   ├── products/          # Product listing and details
│   ├── success/           # Payment success page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Button, Card, etc.)
│   ├── carousel.tsx      # Product carousel
│   ├── navbar.tsx        # Navigation component
│   ├── product-card.tsx  # Product display card
│   ├── product-detail.tsx # Product detail view
│   └── product-list.tsx  # Product listing component
├── lib/                  # Utility functions
│   ├── stripe.ts         # Stripe configuration
│   └── utils.ts          # Helper utilities
├── store/                # State management
│   └── cart-store.ts     # Zustand cart store
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nextjs-fullstack-ecommerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛒 Features Overview

### Product Catalog

- Browse products fetched from Stripe
- Product cards with images, names, descriptions, and prices
- Responsive grid layout
- Product detail pages

### Shopping Cart

- Add/remove items from cart
- Persistent cart using localStorage
- Quantity management
- Real-time cart updates
- Cart counter in navigation

### Checkout Process

- Review cart items
- Adjust quantities
- Secure payment processing via Stripe
- Order summary
- Success page after payment

### UI/UX

- Responsive design for all devices
- Modern, clean interface
- Smooth animations and transitions
- Accessible components
- Mobile-friendly navigation

## 🔧 Configuration

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Add them to your `.env.local` file
4. Create products in your Stripe dashboard

### Tailwind CSS

The project uses Tailwind CSS 4.0 with custom configuration. All styling is done through utility classes.

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS
- DigitalOcean
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Stripe](https://stripe.com/) for payment processing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Zustand](https://zustand-demo.pmnd.rs/) for state management

---

Built with ❤️ using Next.js and modern web technologies.
