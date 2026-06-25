# 🏔️ Mountain Cabin Rental Platform

A modern, full-stack web application designed for browsing, managing, and booking mountain cabin rentals in Serbia. The platform features a robust role-based system catering to three distinct user types: **Tourists**, **Cabin Owners**, and **Administrators**.

This project features a decoupled **monorepo architecture** consisting of a responsive Angular frontend and a scalable Node.js REST API ecosystem.

---

## 🛠️ Tech Stack

- **Frontend:** Angular 18, TypeScript, HTML5, CSS3 / SCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt password hashing

---

## ✨ Key Features

### 🔑 Authentication & Security
- **Role-Based Access Control (RBAC):** Distinct dashboards and route guards for Tourists, Owners, and Admins.
- **Secure Registration:** Automated admin-approval workflow for newly registered host/owner accounts.
- **Data Protection:** Advanced client/server-side validation, secure password hashing, and encrypted payload handling.

### 🧳 Tourist Dashboard
- **Smart Search & Filters:** Browse through available cabins with advanced sorting and multi-criteria filtering.
- **Rich Listings:** Dynamic property pages featuring image galleries, service lists, detailed pricing models, interactive location maps, and user reviews.
- **Booking Engine:** Seamless reservation workflow with live status tracking.
- **Feedback Loop:** Interactive system for leaving ratings and written comments.

### 🏡 Owner Portal
- **Property Management:** Complete CRUD operations for listing, updating, or archiving cabins.
- **Reservation Workflow:** Dedicated dashboard to review, approve, or reject incoming tourist booking requests.
- **Analytics & Schedule:** Built-in calendar for availability tracking and data charts representing reservation statistics.

### 🛠 Administrative Suite
- **Platform Moderation:** Global overview and management tools for all registered users and active properties.
- **Quality Control:** System to audit registration requests and flags to automatically suspend low-rated or non-compliant cabin listings.

---

## 📌 Technical Highlights

- **Data Presentation:** Highly optimized, fully responsive data tables featuring client-side search, filtering, and multi-column sorting.
- **Payment Validation:** Dynamic credit card parsing module with real-time card type detection (Visa, MasterCard, Diners).
- **Media Handling:** Structured file upload system for processing profile pictures and dynamic multi-image property galleries.
- **State Management:** Clean separation of concerns with decoupled Angular services communicating with custom Node.js RESTful endpoints.

---

## 💻 Local Development Setup

Follow these steps to run the complete full-stack application on your local machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- Angular CLI
- MongoDB instance (Local or Atlas)

### 1. Clone the Repository
```bash
git clone [https://github.com/milangavric2003/cabin-booking-portal.git](https://github.com/milangavric2003/cabin-booking-portal.git)
