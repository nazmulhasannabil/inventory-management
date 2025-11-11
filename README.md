# 📦 Inventory Management System

![image_alt]([/inventorypro.png](https://github.com/nazmulhasannabil/inventory-management/blob/1149184e60b41159d7b0a1f0c328f3b6a4b43163/public/inventorypro.png))

A modern, full-stack inventory management system built with Next.js 16, featuring real-time analytics, stock tracking, and a beautiful dark-themed UI.

## ✨ Features

### 🎯 Core Functionality
- **Product Management** - Add, view, and delete products with ease
- **Real-time Analytics** - Visual charts showing product trends over time
- **Low Stock Alerts** - Automatic notifications for products running low
- **Search & Filter** - Quickly find products with advanced search
- **Pagination** - Efficient browsing through large product catalogs

### 🎨 User Experience
- **Dark Sidebar Navigation** - Sleek, modern sidebar with active route highlighting
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Form Validation** - Zod-powered validation for data integrity
- **Success Notifications** - SweetAlert2 integration for user feedback
- **Loading States** - Smooth loading animations with Lottie

### 🔐 Security & Auth
- **Stack Auth Integration** - Secure authentication out of the box
- **User-specific Data** - Each user sees only their own inventory
- **Server-side Validation** - All actions validated on the server

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling
- **[Recharts](https://recharts.org/)** - Beautiful chart components
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[SweetAlert2](https://sweetalert2.github.io/)** - Elegant alerts
- **[Lottie React](https://www.npmjs.com/package/lottie-react)** - Animations

### Backend
- **[Prisma](https://www.prisma.io/)** - Type-safe ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust database
- **[Zod](https://zod.dev/)** - Schema validation
- **[Stack Auth](https://docs.stack-auth.com/)** - Authentication provider

## 📸 Screenshots

### Dashboard
![Dashboard](/inventorypro.png)
*Real-time analytics and key metrics at a glance*

### Sidebar Navigation
![Sidebar](/inventorypro.png)
*Clean, modern sidebar with intuitive navigation*

### Product Management
![Products](/product.png)
*Comprehensive product listing with search and pagination*

### Add Product Form
![Add Product](/addproduct.png)
*Intuitive form with validation and success notifications*

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd inventory-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/inventory_db"
   STACK_PROJECT_ID="your_stack_project_id"
   STACK_PUBLISHABLE_CLIENT_KEY="your_stack_publishable_key"
   STACK_SECRET_SERVER_KEY="your_stack_secret_key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed the database (optional)
   npx tsx prisma/seed.ts
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
inventory-management/
├── app/                      # Next.js App Router pages
│   ├── add-product/         # Add product page
│   ├── dashboard/           # Dashboard with analytics
│   ├── inventory/           # Product listing page
│   ├── sign-in/             # Authentication page
│   └── layout.tsx           # Root layout
├── component/               # Reusable React components
│   ├── AddProductForm.tsx   # Product form with validation
│   ├── Pagination.tsx       # Pagination component
│   ├── ProductChart.tsx     # Chart visualization
│   └── SideBar.tsx          # Navigation sidebar
├── lib/                     # Utility functions and configs
│   ├── actions/             # Server actions
│   │   └── products.ts      # Product CRUD operations
│   ├── auth.ts              # Authentication helpers
│   └── prisma.ts            # Prisma client instance
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data script
└── stack/                   # Stack Auth configuration
```

## 🎨 Key Features Explained

### Dashboard Analytics
The dashboard provides:
- **Total Products Count** - Overview of inventory size
- **Total Inventory Value** - Calculated from price × quantity
- **Low Stock Alerts** - Products below threshold
- **Weekly Trends** - Interactive chart showing product additions
- **Stock Level Indicators** - Visual status for each product

### Product Management
- **Add Products** - Form with validation and sweet alert confirmation
- **View Products** - Paginated table with search functionality
- **Delete Products** - One-click deletion with confirmation
- **SKU Tracking** - Optional SKU codes for product identification
- **Low Stock Thresholds** - Custom alerts per product

### Data Validation
All forms use Zod schema validation:
- Product names (1-255 characters)
- Prices (non-negative numbers)
- Quantities (whole numbers, non-negative)
- SKU codes (optional, unique)
- Low stock thresholds (optional, positive integers)

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev  # Run migrations
npx tsx prisma/seed.ts  # Seed database

# Code Quality
npm run lint         # Run ESLint
```

## 🗄️ Database Schema

### Product Model
```prisma
model Product {
  id         String   @id @default(cuid())
  userId     String   // Stack Auth User ID
  name       String
  sku        String?  @unique
  price      Decimal  @db.Decimal(12,2)
  quantity   Int      @default(0)
  lowStockAt Int?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

## 🎯 Roadmap

- [ ] Export to CSV/Excel
- [ ] Bulk product import
- [ ] Product categories
- [ ] Advanced filtering
- [ ] Email notifications for low stock
- [ ] Product images
- [ ] Barcode scanning
- [ ] Multi-warehouse support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Stack Auth](https://docs.stack-auth.com/) - Authentication made easy
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Recharts](https://recharts.org/) - Charting library

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ using Next.js 16 and modern web technologies**
