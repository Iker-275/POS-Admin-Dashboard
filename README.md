

# Restaurant & Customer Management System

## Table of Contents

* [Project Overview](#project-overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Folder Structure](#folder-structure)
* [Getting Started](#getting-started)
* [Available Pages & Components](#available-pages--components)
* [API Integration](#api-integration)
* [Hooks & State Management](#hooks--state-management)
* [Contributing](#contributing)
* [License](#license)

---

## Project Overview

This is a **Restaurant & Customer Management System** built with **React (TypeScript)** for the frontend. The application allows administrators to manage **customers, orders, menus, and roles** efficiently. It provides features such as:

* Customer management (CRUD, unpaid balances tracking)
* Order management (CRUD, bulk payments, order status updates)
* Role management (CRUD, active/inactive toggling)
* Filters, tables with pagination, and dynamic dashboards
* Tailwind CSS for responsive and clean UI design

The system uses a **context + hooks architecture** to manage state consistently across all modules.

---

## Features

### Customers

* Create, update, and view customer details
* Track total balances and unpaid orders
* Filters by name, phone, status, and balance

### Orders

* Create, update, cancel, and view orders
* Bulk payment processing
* Track order totals, balances, and payment status
* Filters by status, customer, and date

### Roles

* Create, update, delete roles
* Toggle active/inactive status
* Assign roles to users

### UI/UX

* Responsive tables with pagination
* Reusable **ComponentCard** wrappers
* Toggle switches for active/unpaid status
* Filters with debounced input

---

## Tech Stack

* **Frontend:** React, TypeScript
* **UI/Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **State Management:** React Context + Custom Hooks
* **Forms:** Custom input components with validation
* **API Integration:** Axios for REST API calls

---

## Folder Structure

```
src/
├─ api/                 # API services for orders, customers, roles
├─ components/
│  ├─ common/           # Shared UI components (ComponentCard, PageMeta, Breadcrumb)
│  ├─ form/             # Form inputs & reusable fields
│  ├─ tables/           # Table components for Roles, Orders, Customers
│  └─ customComponents/ # Switch, Select dropdowns, Filters
├─ context/             # Context providers for orders, customers, roles, status
├─ hooks/               # Custom hooks for data fetching & state management
├─ pages/
│  ├─ roles/
│  ├─ orders/
│  └─ customers/
├─ types/               # TypeScript types and interfaces
├─ utils/               # Helper functions
└─ App.tsx
```

---

## Getting Started

### Prerequisites

* Node.js v18+
* npm or yarn
* Backend API server (REST endpoints for customers, orders, roles)

### Installation

```bash
# Clone the repository
git clone <repository_url>
cd <project_folder>

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## Available Pages & Components

### Roles

* **RolesTable:** View all roles with pagination
* **CreateRolePage & UpdateRolePage:** Manage roles
* **RoleForm:** Reusable form for create/update

### Customers

* **CustomersTable:** View all customers with filters & pagination
* **CustomerForm:** Create/update customer
* **CustomerDetailsPage:** View customer info and unpaid balances

### Orders

* **OrdersTable:** View orders, supports bulk pay, cancel
* **OrderFilters:** Filter orders by customer/status/date
* **OrderDetailsPage:** View detailed order info

---

## API Integration

The frontend expects REST endpoints for:

### Customers

* GET `/customers`
* GET `/customers/:id`
* POST `/customers`
* PUT `/customers/:id`

### Orders

* GET `/orders`
* GET `/orders/:id`
* POST `/orders`
* PUT `/orders/:id`
* POST `/orders/bulk-pay`

### Roles

* GET `/roles`
* POST `/roles`
* PUT `/roles/:id`
* DELETE `/roles/:id`

The API responses should follow the TypeScript types defined in `src/types/`.

---

## Hooks & State Management

This project uses **custom hooks + context providers** for each module:

* `useCustomer` → CRUD + balances
* `useOrder` → CRUD + bulk pay + filters
* `useRoles` → CRUD + active toggle
* `useStatus` → Order status management

**Benefits:**

* Centralized data fetching
* Cleaner pages and components
* Easy state sharing between pages

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is **MIT licensed**.


