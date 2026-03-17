
# 📊 Utility Billing & Payment Management System (MERN)

A full-stack MERN application designed to manage **water/utility billing, customer accounts, and payment processing**.
Built with scalability and real-world operations in mind.

---

## 🚀 Features

### 👥 Customer Management

* Create, edit, and view customers
* Assign customers to **zones & villages**
* Track customer balances
* Bulk upload customers

---

### 💡 Billing System

* Run billing:

  * Global (all customers)
  * Zone-based
  * Village-based
* Assign billing periods
* Apply rates dynamically
* Track:

  * Units consumed
  * Charges
  * Penalties
* View billed & **unbilled customers**
* Billing summary and stats

---

### 💳 Payments System

* Record single payments
* Bulk payment processing
* Cancel payments with reason
* Automatic allocation of payments to bills
* Payment status tracking (ACTIVE, CANCELLED)

---

### 🧾 Receipts & Reports

* Payment receipt modal with:

  * Allocation breakdown
  * Billing references
* PDF reports:

  * Payments report
  * (Extensible to billing reports)
* Print-ready receipt view

---

### 📊 Filtering & Search

Across modules:

* Zone & village filtering
* Customer filtering
* Status filtering
* Date range filtering
* Period-based filtering

---

### 🔐 Authentication & Access Control

* Protected routes
* User-based actions (e.g., billing, payments)
* Context-based auth handling

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* Context API (state management)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 🧠 Architecture

The system follows a **modular, scalable architecture**:

```
src/
 ├── api/            # API service layer
 ├── hooks/          # Custom hooks (logic layer)
 ├── context/        # Global state
 ├── components/     # UI components
 ├── pages/          # Screens
 ├── types/          # TypeScript models
```

### Design Principles

* Separation of concerns:

  * **Context → State**
  * **Hooks → Logic**
  * **API → Network layer**
* Reusable UI components
* Scalable filtering system
* Modal-driven workflows

---

## 🔄 Core Workflows

### Billing Flow

1. Select billing period & rate
2. Choose scope (global / zone / village)
3. Run billing
4. View results & stats

---

### Payment Flow

1. Record payment
2. System auto-allocates to bills
3. View receipt (allocations breakdown)
4. Cancel if necessary (with audit trail)

---

### Unbilled Workflow

1. Filter by billing period
2. Identify unbilled customers
3. Investigate reasons
4. Export report (PDF)

---

## 📦 API Overview

### Payments

* `GET /payments`
* `GET /payments/:id`
* `POST /payments/clear`
* `POST /payments/bulk-clear`
* `POST /payments/:id/cancel`
* `GET /payments/reports/payments/pdf`

---

### Billing

* Run billing (global/zone/village)
* Fetch billings
* Fetch unbilled customers

---

## ⚙️ Setup

### 1. Clone Repo

```bash
git clone <repo-url>
cd project
```

### 2. Install Dependencies

```bash
# frontend
cd client
npm install

# backend
cd server
npm install
```

---

### 3. Environment Variables

Create `.env` in backend:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

---

### 4. Run App

```bash
# backend
npm run dev

# frontend
npm run dev
```

---

## 📸 Screens (Optional)

* Dashboard
* Billing Page
* Payments Page
* Receipt Modal
* Unbilled Customers

---

## 📈 Future Improvements

* Customer Ledger (billing + payments history)
* Role-based access control (RBAC)
* Advanced analytics dashboard
* SMS/Email notifications
* Payment integrations (mobile money, card)
* Export to Excel

---

## 🧑‍💻 Author

Built as a scalable utility management solution using MERN stack.

---

## 📄 License

MIT License


