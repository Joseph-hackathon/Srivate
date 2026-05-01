# Srivate Backend Documentation

Welcome to the Srivate Backend documentation. This document is intended for frontend developers and other team members setting up or integrating with the Srivate Protocol backend.

## Overview

The Srivate Backend is an AI-native micro-tipping platform built on the Base blockchain. It facilitates payments using the x402 protocol and KeeperHub Execution Layer.

- **Stack**: Node.js, Express, TypeScript
- **Blockchain**: Base (Mainnet/Sepolia)
- **Payments**: USDC (6 decimals)
- **Database**: SQLite (Local development) / PostgreSQL (Production ready)

---

## Prerequisites

Before setting up the backend, ensure you have the following:

- **Node.js** (v18 or higher)
- **NPM** or **Yarn**
- **KeeperHub Account**: You'll need a [KeeperHub API Key](https://app.keeperhub.com/).
- **Wallet**: A server wallet address to act as a facilitator.

---

## Environment Variables

Create a `.env` file in `apps/backend/` based on the following template:

```env
PORT=3001
FRONTEND_URL=http://localhost:3000

# Blockchain Configuration
# 84532 for Base Sepolia, 8453 for Base Mainnet
CHAIN_ID=84532

# KeeperHub Configuration
KEEPERHUB_API_KEY=your_keeperhub_api_key
SERVER_WALLET_ADDRESS=your_facilitator_wallet_address

# Database (Optional, defaults to SQLite)
# DATABASE_URL=postgresql://user:password@localhost:5432/srivate
```

---

## Setup & Installation

1. **Install Dependencies**:
   ```bash
   cd apps/backend
   npm install
   ```

2. **Run in Development Mode**:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:3001`.

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## Base & USDC Configuration

The backend supports Base Mainnet and Sepolia. The configuration is automatically selected based on the `CHAIN_ID` environment variable.

| Network | Chain ID | USDC Address | Explorer |
| :--- | :--- | :--- | :--- |
| **Base Mainnet** | 8453 | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | [Explorer](https://basescan.org/) |
| **Base Sepolia** | 84532 | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` | [Sepolia Explorer](https://sepolia.basescan.org/) |

---

## API Documentation

The backend uses Swagger for API documentation. Once the server is running, you can access the interactive documentation at:

`http://localhost:3001/api/docs`

### Key API Endpoints

- **Merchants**: `/api/merchants` - Manage merchant profiles and stats.
- **Sessions**: `/api/sessions` - Create and manage tip sessions.
- **Payments**: `/api/payments` - Prepare, verify, and settle payments.
- **Receipts**: `/api/receipts` - Retrieve digital receipts for transactions.

---

## Integration Guide for Frontend

### 1. Fetching Merchant Info
To display a tipping page, first fetch the merchant details:
`GET /api/merchants/:slug_or_id`

### 2. Creating a Tip Session
When a user starts a tipping flow:
`POST /api/sessions` with `{ merchantId, billAmount }`

### 3. Payment Flow
The backend uses a three-step payment process:
1. **Prepare**: `POST /api/payments/prepare` (returns payment requirements).
2. **Verify**: `POST /api/payments/verify` (optional client-side check).
3. **Settle**: `POST /api/payments/settle` (finalizes transaction on-chain).

### 4. Base Setup
Ensure the frontend is configured to use the same `CHAIN_ID` as the backend. 
