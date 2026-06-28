# React Native POS Billing Application

A high-performance, responsive Point of Sale (POS) Billing application built using React Native CLI, Redux Toolkit, and React Native Paper. This application is structured with strict TypeScript, clean architecture, and features AsyncStorage-based persistence for invoicing history and shop settings.

## Project Overview

This mobile POS application enables quick, lightweight billing for retail stores and cafes. It provides a simple, modern design following Material Design patterns. The billing screen facilitates adding items to a cart, adjusting quantities, applying percentage discounts, calculating GST, and outputting standard monospace thermal printer receipts. It tracks and persists all transaction histories locally on the device.

## Key Features

- **Store & Settings Configurator**: Configure store metadata (Name, Address, Phone), GST parameters (Toggle and Rate), and custom Receipt footer messages.
- **Interactive Cart System**: Add items, increase or decrease product quantities, apply percentage-based discounts with real-time subtotal, tax, and grand total updates.
- **POS Monospace Receipt Renderer**: Renders invoice details formatted as standard physical 32-column thermal paper printouts using monospace font sheets.
- **Transaction Billing History**: Visual tracker listing historical transactions. Supports individual invoice lookups and deletion/refund controls.
- **Robust Field Validation**: 
  - Required fields and format validation for Store Name and Phone Numbers.
  - Safe bounds validation on discounts (0% - 100%) and GST (0% - 100%).
  - Empty cart validation before checkout checks.
  - Quantity bounds to prevent negative or empty cart line items.
- **AsyncStorage local persistence**: Ensures configuration values and generated billing invoices are retained across device restarts.

---

## Folder Structure

The application is structured logically to separate business logic, state management, components, and views:

```
src/
├── assets/          # Static assets (fonts, icons, mock branding)
├── components/      # Reusable UI presentation components
│   ├── ProductCard.tsx     # Product selection card
│   ├── CartItem.tsx        # Cart list item with controls
│   ├── QuantityButton.tsx  # Quantity plus/minus control
│   ├── BillSummary.tsx     # Totals break-down (Subtotal, GST, Discount, Total)
│   ├── ReceiptView.tsx     # Thermal paper monospace receipt renderer
│   ├── InvoiceCard.tsx     # Historical invoice row
│   ├── SettingInput.tsx    # Outline input field with validations
│   ├── SettingSwitch.tsx   # Boolean switch config control
│   ├── PrimaryButton.tsx   # Uniform CTA button
│   ├── SectionHeader.tsx   # Header divider for screens
│   ├── LoadingView.tsx     # Application loader spinner
│   └── EmptyState.tsx      # Friendly empty list layout state
├── data/            # Local static data files
│   └── products.ts         # Static products inventory mock (Coffee, Pizza, etc.)
├── hooks/           # Typed custom React Redux hooks
│   └── storeHooks.ts       # Typed useAppSelector and useAppDispatch wrappers
├── navigation/      # React Navigation setup
│   └── AppNavigator.tsx    # Bottom tab and screen navigation stacks
├── screens/         # Main application views/containers
│   ├── BillingScreen.tsx         # Active POS cart and inventory selector
│   ├── ReceiptPreviewScreen.tsx  # Thermal print screen after invoicing
│   ├── HistoryScreen.tsx         # List of all completed invoices
│   ├── InvoiceDetailScreen.tsx   # Details view of historical receipts
│   └── SettingsScreen.tsx        # Store and taxation parameters setup
├── store/           # Redux Toolkit global state store
│   ├── billingSlice.ts     # active cart items, discounts, and local formulas
│   ├── settingsSlice.ts    # store details, tax toggles, and AsyncStorage triggers
│   ├── invoiceSlice.ts     # invoice history records and details
│   └── index.ts            # main configureStore exports
├── types/           # TypeScript core type interfaces
│   └── index.ts            # Type definitions for AppSettings, Invoice, CartItem, Product
├── utils/           # Shared pure helpers and utility formulas
│   ├── calculations.ts     # Pure functions for billing arithmetic
│   ├── receiptGenerator.ts # Thermal monospace pad formatter
│   ├── invoiceNumber.ts    # Incremental invoice counter utility
│   ├── storage.ts          # AsyncStorage read/write helpers
│   ├── currency.ts         # Numeric currency formatter
│   └── constants.ts        # Global default settings and storage keys
├── App.tsx          # Main Providers container, stores init startup loader
└── App.tsx (Root)   # Redirects default CLI entry point to src/App.tsx
```

---

## Redux Architecture Flow

The application follows strict unidirectional data flows powered by **Redux Toolkit**:

```
 ┌─────────────────┐      Dispatches       ┌──────────────────────┐
 │  UI Components  ├──────────────────────>│ Redux Slice Actions  │
 └────────▲────────┘                       └──────────┬───────────┘
          │                                           │
          │ Updates State                             │ Triggers Reducers
          │                                           ▼
 ┌────────┴────────┐                       ┌──────────────────────┐
 │ App State Store ├<──────────────────────┤    Pure Reducers     │
 └─────────────────┘                       └──────────────────────┘
```

1. **`settingsSlice`**: Manages the store identity, tax toggle, GST rates, currency symbol, footer message, and printing options. Dispatches update settings inputs separately.
2. **`billingSlice`**: Handles active checkout items. Calculates and rounds subtotal, tax amounts, discount offsets, and grand totals upon item modifications.
3. **`invoiceSlice`**: Retains sales records. Increments invoice IDs, sets current previewed records, loads all records from AsyncStorage during system bootstrap, and supports deleting transactions.

---


## Screens Showcase Placeholders

- **Billing Tab**: Features a responsive grid listing products. Tap a product to populate the checkout section. Adjust items using inline `+`/`-` buttons or press the trash icon to wipe an entry. Fill the discount percentage and review the final totals summary.
- **Receipt Preview Screen**: Emulates standard physical thermal printed receipts using monospaced styling. Displays store branding details and itemized pricing details.
- **Invoices History**: View a feed tracking prior billing sessions. Delete records via immediate confirmation triggers.
- **Store Settings**: Complete input suite containing form validations. Includes switches to toggle GST computations.

---

## Future Improvements

1. **Bluetooth ESC/POS Printing**: Directly integrate native Bluetooth modules (`react-native-bluetooth-escpos-printer`) to print to physical thermal devices.
2. **Offline-first Syncing**: Synchronize local AsyncStorage history backups with a cloud database (e.g. SQLite + MongoDB/Firebase) when internet connections are restored.
3. **Analytics Dashboard**: Implement dashboard visuals detailing sales margins, popular items, and daily turnover charts.
4. **Barcode Scanner support**: Utilize device camera streams to scan UPC/EAN barcodes and automatically append items to active carts.
