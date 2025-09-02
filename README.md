# SamenuFit: Intelligent Meal Planning & Nutrition Assistant

[![Vue 3](https://img.shields.io/badge/Vue-3-brightgreen)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC)](https://tailwindcss.com/)

## Overview

SamenuFit is an advanced meal planning and nutrition tracking application designed to simplify your dietary management. Built with modern web technologies, it offers an intuitive interface for planning meals, managing recipes, generating shopping lists, and tracking nutritional intake.

## Key Features

- 📅 **Weekly Meal Planning**
  - Drag & drop interface for easy meal scheduling
  - Intelligent recipe recommendations
  - Nutritional balance tracking

- 🍲 **Recipe Management**
  - Create and store personalized recipes
  - Detailed nutritional information
  - Easy recipe import and export

- 🛒 **Automated Shopping Lists**
  - Generate shopping lists from weekly meal plans
  - Ingredient consolidation
  - Customizable preferences

- 📊 **Nutrition Tracking**
  - Macro and micronutrient calculation
  - Unit conversion tools
  - Visual nutritional insights

## Technology Stack

- **Frontend**: Vue 3 (Composition API)
- **Language**: TypeScript
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Package Manager**: Bun

## Architecture Principles

SamenuFit follows **Screaming Architecture** with Domain-Driven Design:

- **Bounded Contexts**:
  - Meal Planning
  - Recipe Management
  - Nutrition Tracking

- **Architectural Layers**:
  - Domain Layer
  - Infrastructure Layer
  - Shared Kernel
  - Application Layer

## Prerequisites

- Node.js: ^20.19.0 or >=22.12.0
- Bun package manager

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/samenufit.git
cd samenufit
```

2. Install dependencies
```bash
bun install
```

## Development Commands

- Start development server
```bash
bun dev
```

- Build for production
```bash
bun run build
```

- Run type checking
```bash
bun run type-check
```

- Lint and fix code
```bash
bun lint
```

- Format code
```bash
bun run format
```

## Project Structure

```
src/
├── modules/
│   ├── common/       # Shared components
│   ├── landing/      # Landing page
│   ├── weeklyplan/   # Meal planning
│   ├── recipebook/   # Recipe management
│   ├── shoppinglist/ # Shopping list generation
│   └── conversiontab/# Unit conversions
├── router/           # Vue Router configuration
├── stores/           # Pinia stores
├── assets/           # Static assets
└── data/             # Static data files
```

## Recommended IDE

- Visual Studio Code
- Install [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension
- Disable Vetur extension

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information.

## License

[Insert License Information]

## Contact

[Your Contact Information or Project Maintainer Details]

---

Built with passion using modern web technologies. 🚀