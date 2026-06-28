# POS Billing Application Architecture Overview

This document describes the architectural design and core structure of the React Native Point of Sale (POS) Billing Application.

---

## Architectural Summary

The POS Billing application is built using React Native CLI, TypeScript, and Redux Toolkit. It follows a clean separation of concerns across four primary architectural layers:

1.  **Presentation Layer (UI/Screens)**: 
    *   Constructed using React Native components and `react-native-paper` elements.
    *   Separates screens (containers like `BillingScreen`, `HistoryScreen`, `SettingsScreen`) from reusable UI components (presentational elements like `ProductCard`, `CartItem`, `ReceiptView`).
    *   Queries global state via custom Redux hooks and dispatches actions to trigger state changes.
2.  **State Management Layer (Redux)**:
    *   A centralized Redux store configured via Redux Toolkit.
    *   Maintains three main domain slices:
        *   `billing`: Manages active checkout cart items, discount percentages, and computes intermediate states.
        *   `settings`: Stores store name, address, tax configuration (GST), and receipt layouts.
        *   `invoice`: Retains transaction records and tracks the currently focused preview/detail invoice.
3.  **Domain & Business Logic Layer**:
    *   Decoupled, pure helper functions that execute billing calculations (GST, discounts, totals).
    *   Formatting utilities responsible for generating monospace-aligned data layouts suitable for standard thermal printers.
4.  **Data & Persistence Layer**:
    *   Integrates with `@react-native-async-storage/async-storage` for simple, lightweight local database behavior.
    *   Handles local reads/writes of transaction histories and system settings, ensuring state is preserved across application reboots.

---

## Core Data Flow

The architecture follows a strict unidirectional data flow:

```
┌────────────────────────────────────────────────────────┐
│                   Presentation Layer                   │
│         (Screens & Reusable UI Components)             │
└───────────┬───────────────────────────────▲────────────┘
            │ Dispatches                    │ Subscribes
            │ Actions                       │ to State
┌───────────▼───────────────────────────────┴────────────┐
│                  State Management Layer                │
│                 (Redux Toolkit Store)                  │
└───────────┬───────────────────────────────▲────────────┘
            │ Pure                          │ Loads/Saves
            │ Inputs                        │ Records
┌───────────▼───────────────────────────────┴────────────┐
│              Domain & Persistence Layer                │
│    (Calculations, Storage & Monospace Receipt Utils)    │
└────────────────────────────────────────────────────────┘
```
