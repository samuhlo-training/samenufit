# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

This is a Vue 3 application built with:
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

### Modular Structure
The application follows a modular architecture with feature-based organization:

```
src/
├── modules/           # Feature modules
│   ├── common/       # Shared components and utilities
│   ├── landing/      # Landing page module
│   ├── weeklyplan/   # Weekly meal planning
│   ├── recipebook/   # Recipe management
│   ├── shoppinglist/ # Shopping list functionality
│   └── conversiontab/ # Unit conversion tools
├── router/           # Vue Router configuration
├── stores/           # Pinia stores
├── assets/           # Static assets and global styles
└── data/             # Static data files
```

### Key Architectural Decisions
- **Feature modules**: Each major feature is organized as a self-contained module
- **Composition API**: All components use `<script setup>` syntax
- **TypeScript interfaces**: Prefer interfaces over types for better extendability
- **Functional programming**: Avoid classes, prefer functional and declarative patterns
- **Composables**: Use `use<Name>` pattern for reusable logic

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

## Configuration Files

- **Vite config**: `vite.config.ts` - includes Vue, JSX, DevTools, and Tailwind plugins
- **ESLint**: `eslint.config.ts` - Vue + TypeScript configuration with Prettier integration
- **TypeScript**: Split configuration (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)
- **Prettier**: `.prettierrc.json` - 2 spaces, single quotes, 100 char width
- **Node version**: Requires Node.js ^20.19.0 || >=22.12.0

## Path Aliases

- `@/` → `./src/` (configured in `vite.config.ts`)