# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

This is a Vue 3 meal planning and nutrition application built with:
- **Vue 3** with Composition API (`<script setup>` style)
- **TypeScript** for type safety
- **Vite** as build tool and dev server
- **Vue Router** for routing
- **Pinia** for state management
- **Tailwind CSS v4** for styling (using @tailwindcss/vite)
- **ESLint** with Vue and TypeScript configurations
- **Prettier** for code formatting

## Common Development Commands

### Package Manager
This project uses **bun** as the package manager (not npm). Always use bun commands:

```bash
bun install          # Install dependencies
bun dev             # Start development server
bun run build       # Build for production (includes type checking)
bun run build-only  # Build without type checking
bun run preview     # Preview production build
bun run type-check  # Run TypeScript type checking
bun lint            # Run ESLint with auto-fix
bun run format     # Format code with Prettier
```

### Important Notes
- The build command runs `type-check` in parallel with `build-only`
- Always use `bun lint` after making changes to fix linting issues
- Use `bun run format` to ensure consistent code formatting

## Project Architecture

### Screaming Architecture with Scope Rule Pattern
The application follows Screaming Architecture principles where the business domain screams from the folder structure. Each domain concept has its own bounded context with clear scope rules:

```
src/
├── meal-planning/           # MEAL PLANNING DOMAIN
│   ├── weekly-plans/       # Weekly meal planning bounded context
│   │   ├── components/     # UI components specific to weekly planning
│   │   ├── composables/    # Business logic composables
│   │   ├── stores/         # Domain state management
│   │   ├── types.ts        # Domain types and interfaces
│   │   └── index.ts        # Public API (scope boundary)
│   ├── recipes/            # Recipe management bounded context
│   │   ├── components/     # Recipe-specific UI components
│   │   ├── composables/    # Recipe business logic
│   │   ├── stores/         # Recipe state management
│   │   ├── types.ts        # Recipe domain types
│   │   └── index.ts        # Public API
│   └── shopping-lists/     # Shopping list bounded context
│       ├── components/     # Shopping list UI
│       ├── composables/    # Shopping logic
│       ├── stores/         # Shopping state
│       ├── types.ts        # Shopping domain types
│       └── index.ts        # Public API
├── nutrition/              # NUTRITION DOMAIN
│   ├── macros/            # Macro calculation bounded context
│   │   ├── components/     # Macro display components
│   │   ├── composables/    # Macro calculation logic
│   │   ├── types.ts        # Nutrition types
│   │   └── index.ts        # Public API
│   └── conversions/       # Unit conversion bounded context
│       ├── components/     # Conversion UI
│       ├── composables/    # Conversion logic
│       ├── types.ts        # Conversion types
│       └── index.ts        # Public API
├── shared/                 # SHARED KERNEL
│   ├── components/        # Generic UI components
│   ├── composables/       # Cross-domain utilities
│   ├── types/             # Shared types and interfaces
│   └── utils/             # Pure utility functions
├── infrastructure/         # INFRASTRUCTURE LAYER
│   ├── router/            # Vue Router configuration
│   ├── storage/           # Data persistence adapters
│   ├── api/               # External API adapters
│   └── config/            # Application configuration
└── app/                   # APPLICATION LAYER
    ├── layout/            # Application shell components
    ├── pages/             # Route-level page components
    └── main.ts            # Application bootstrap
```

### Key Architectural Decisions

#### Domain-Driven Design Principles
- **Screaming Architecture**: Business domains are immediately visible from the folder structure
- **Bounded Contexts**: Each domain area (`meal-planning/`, `nutrition/`) contains related business concepts
- **Scope Rule Pattern**: Each bounded context exposes a public API through `index.ts` files
- **Domain Isolation**: Cross-domain dependencies only through public APIs, never direct imports

#### Technical Architecture
- **Composition API**: All components use `<script setup>` syntax
- **TypeScript interfaces**: Prefer interfaces over types for better extendability
- **Functional programming**: Avoid classes, prefer functional and declarative patterns
- **Composables**: Use `use<Name>` pattern for domain-specific business logic
- **State management**: Pinia stores within each bounded context, with persistence adapters in infrastructure layer

#### Layered Architecture
- **Domain Layer**: Pure business logic in composables and stores within each bounded context
- **Application Layer**: Route-level pages and application shell in `/app`
- **Infrastructure Layer**: External concerns (routing, storage, APIs) in `/infrastructure`
- **Shared Kernel**: Common utilities and components in `/shared`

## Code Style Guidelines

Based on `.clinerules/vue-rules.md`:

### Vue Components
- Use Composition API with `<script setup>`
- Component files use **PascalCase** (e.g., `MyComponent.vue`)
- Prefer composables for shared logic, named as `use<MyComposable>`
- Use functional components with TypeScript interfaces

### TypeScript
- Prefer interfaces over types for better extendability
- Avoid enums, use maps instead for type safety
- Use named exports for functions

### Styling
- Tailwind CSS for all styling
- Mobile-first responsive design approach
- Components should be self-contained with their styling

### Code Quality
- Clean, maintainable TypeScript code
- Follow DRY principles through iteration and modularization
- Functional and declarative programming patterns over classes
- Respect domain boundaries: never import directly from other bounded contexts
- Use public APIs (index.ts) for cross-domain communication

## Configuration Files

- **Vite config**: `vite.config.ts` - includes Vue, JSX, DevTools, and Tailwind plugins
- **ESLint**: `eslint.config.ts` - Vue + TypeScript configuration with Prettier integration
- **TypeScript**: Split configuration (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)
- **Prettier**: `.prettierrc.json` - 2 spaces, single quotes, 100 char width
- **Node version**: Requires Node.js ^20.19.0 || >=22.12.0

## Application Domain

This is a meal planning and nutrition tracking application with the following core features:
- **Weekly Plan**: Plan meals for each day of the week (lunch and dinner)
- **Recipe Book**: Manage and browse available recipes with nutritional information
- **Shopping List**: Generate shopping lists based on planned meals
- **Conversion Tab**: Unit conversion tools for cooking measurements

The application uses a recipe-based data model where each recipe includes nutritional macros (protein, carbs, fats) and ingredient lists.

## Domain Architecture Rules

### Scope Rule Pattern Implementation
Each bounded context must follow these rules:

1. **Public API**: Expose only necessary functionality through `index.ts` files
2. **Domain Isolation**: Never import directly from other domains - only through public APIs
3. **Internal Organization**: Keep domain-specific logic within the bounded context
4. **Dependency Direction**: Dependencies flow from outer layers (infrastructure, app) toward inner layers (domain)

### Import Rules
```typescript
// ✅ CORRECT: Import from public API
import { useWeeklyPlan } from '@/meal-planning/weekly-plans'
import { useRecipeSearch } from '@/meal-planning/recipes'

// ❌ WRONG: Direct import bypassing public API
import { WeeklyPlanStore } from '@/meal-planning/weekly-plans/stores/weekly-plan-store'

// ✅ CORRECT: Shared utilities
import { formatDate } from '@/shared/utils'

// ✅ CORRECT: Infrastructure from domain
import { storageAdapter } from '@/infrastructure/storage'
```

### Bounded Context Responsibilities

#### Meal Planning Domain
- **weekly-plans**: Weekly meal scheduling, meal slot management
- **recipes**: Recipe management, search, filtering, nutritional calculations  
- **shopping-lists**: Shopping list generation from planned meals

#### Nutrition Domain
- **macros**: Macro calculation, nutritional analysis, dietary tracking
- **conversions**: Unit conversions for ingredients and measurements

## Path Aliases

- `@/` → `./src/` (configured in `vite.config.ts`)