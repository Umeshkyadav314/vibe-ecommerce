# Vibe Commerce - E-Commerce Shopping Cart App

A full-stack e-commerce application built with Next.js, TypeScript, and React. Features a responsive product grid, shopping cart management, checkout flow, and dark mode support.

## Features

- 🛍️ **Product Grid** - Browse 8 mock products with search functionality
- 🛒 **Shopping Cart** - Add/remove items, adjust quantities, view totals
- 💳 **Checkout Flow** - Customer information form with mock receipt generation
- 🌙 **Dark Mode** - Theme toggle with sun/moon icons (persisted in localStorage)
- 🔍 **Search** - Real-time product search by name, description, or category
- 📱 **Responsive Design** - Mobile-first approach, works on all devices
- ⚡ **Fast Performance** - Built with Next.js App Router and TypeScript
- 🎨 **Modern UI** - Shadcn/ui components with Tailwind CSS

## Tech Stack

- **Frontend**: React 19, Next.js 16, TypeScript
- **Styling**: Tailwind CSS v4, Shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useContext)
- **Storage**: Browser localStorage (cart persistence)
- **API**: Next.js Route Handlers (REST API)

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── products/route.ts       # GET /api/products
│   │   ├── cart/route.ts           # GET/POST /api/cart
│   │   ├── cart/[id]/route.ts      # DELETE/PATCH /api/cart/:id
│   │   └── checkout/route.ts       # POST /api/checkout
│   ├── cart/page.tsx               # Shopping cart page
│   ├── page.tsx                    # Home page with products
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── components/
│   ├── header.tsx                  # Navigation header with search
│   ├── product-card.tsx            # Individual product card
│   ├── products-grid.tsx           # Products grid with filtering
│   ├── cart-view.tsx               # Shopping cart view
│   ├── checkout-modal.tsx          # Checkout form modal
│   ├── receipt-modal.tsx           # Order receipt modal
│   ├── theme-toggle.tsx            # Dark mode toggle
│   ├── theme-provider.tsx          # Theme context provider
│   ├── footer.tsx                  # Footer component
│   └── ui/                         # Shadcn/ui components
├── lib/
│   ├── db.ts                       # Mock database with products
│   ├── hooks/
│   │   ├── use-cart.ts             # Cart state management hook
│   │   └── use-theme.ts            # Theme management hook
│   └── utils.ts                    # Utility functions
└── public/                         # Static assets
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository** (if using GitHub)
   \`\`\`bash
   git clone <repository-url>
   cd ecommerce-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   # or
   bun install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   # or
   bun dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Products
- **GET** `/api/products` - Get all products
  \`\`\`json
  {
    "products": [
      {
        "id": "1",
        "name": "Wireless Headphones",
        "price": 79.99,
        "description": "High-quality wireless headphones",
        "category": "Audio",
        "image": "/wireless-headphones.png"
      }
    ]
  }
  \`\`\`

### Cart
- **GET** `/api/cart` - Get current cart
  \`\`\`json
  {
    "items": [
      {
        "id": "cart-1",
        "productId": "1",
        "name": "Wireless Headphones",
        "price": 79.99,
        "quantity": 2,
        "image": "/wireless-headphones.png"
      }
    ],
    "total": 159.98
  }
  \`\`\`

- **POST** `/api/cart` - Add item to cart
  \`\`\`json
  {
    "productId": "1",
    "quantity": 1
  }
  \`\`\`

- **PATCH** `/api/cart/:id` - Update item quantity
  \`\`\`json
  {
    "quantity": 3
  }
  \`\`\`

- **DELETE** `/api/cart/:id` - Remove item from cart

### Checkout
- **POST** `/api/checkout` - Process checkout
  \`\`\`json
  {
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "items": [
      {
        "id": "cart-1",
        "name": "Wireless Headphones",
        "price": 79.99,
        "quantity": 2
      }
    ]
  }
  \`\`\`

  Response:
  \`\`\`json
  {
    "success": true,
    "receipt": {
      "orderId": "ORD-1234567890",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "items": [...],
      "subtotal": 159.98,
      "tax": 12.80,
      "total": 172.78,
      "timestamp": "2025-10-28T10:30:00Z"
    }
  }
  \`\`\`

## Features Explained

### Dark Mode
- Click the sun/moon icon in the header to toggle dark mode
- Theme preference is saved to localStorage
- Automatically applies to all components

### Search
- Use the search bar in the header to filter products
- Searches across product names, descriptions, and categories
- Results update in real-time

### Shopping Cart
- Add items from the products grid
- Adjust quantities or remove items from the cart page
- Cart data persists in localStorage during the session
- View order summary with subtotal, tax, and total

### Checkout
- Enter customer name and email
- Review order summary
- Submit to generate a mock receipt
- Receipt includes order ID, timestamp, and itemized breakdown

## Customization

### Adding More Products
Edit `lib/db.ts` and add items to the `MOCK_PRODUCTS` array:
\`\`\`typescript
{
  id: "9",
  name: "Your Product",
  price: 99.99,
  description: "Product description",
  category: "Category",
  image: "/your-image.png"
}
\`\`\`

### Changing Colors
Edit `app/globals.css` to modify the design tokens:
\`\`\`css
@theme inline {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  /* ... other tokens ... */
}
\`\`\`

### Modifying Tax Rate
Edit `app/api/checkout/route.ts` and change the `TAX_RATE` constant.

## Optional Enhancements

### Database Integration (MongoDB/Supabase)
To add persistent database storage:

1. **Set up MongoDB or Supabase**
2. **Add environment variables** (see `.env.example`)
3. **Update API routes** to use database instead of in-memory storage
4. **Implement user authentication** for cart persistence

### Payment Integration (Stripe)
To add real payment processing:

1. **Create Stripe account** and get API keys
2. **Add Stripe environment variables**
3. **Install Stripe SDK**: `npm install stripe @stripe/react-js`
4. **Update checkout flow** to use Stripe Payment Intent

### User Authentication
To add user accounts and persistent carts:

1. **Set up Supabase Auth or similar**
2. **Add authentication middleware**
3. **Link carts to user accounts**
4. **Implement user dashboard**

## Environment Variables

Currently, the app runs without environment variables. For optional features, see `.env.example`.

## Performance Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Code splitting with dynamic imports
- ✅ Efficient state management with React hooks
- ✅ CSS-in-JS with Tailwind CSS
- ✅ Server-side rendering where applicable

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Cart not persisting
- Check if localStorage is enabled in your browser
- Clear browser cache and try again

### Images not loading
- Ensure image files exist in `/public` directory
- Check image paths in `lib/db.ts`

### Dark mode not working
- Clear localStorage: `localStorage.clear()`
- Refresh the page

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Deploy to Other Platforms
- Netlify: `npm run build` then deploy `out` folder
- Docker: Create Dockerfile with Node.js base image
- Traditional hosting: Build and serve with Node.js

## Contributing

Feel free to fork and submit pull requests for any improvements.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub or contact support.

---

**Built with ❤️ for Vibe Commerce**
