# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev                # Start Next.js development server
npx convex dev            # Start Convex backend in development mode (run in separate terminal)

# Build & Production
npm run build             # Create production build
npm run start             # Start production server

# Code Quality
npm run lint              # Run ESLint
```

Note: ESLint and TypeScript errors are ignored during builds (see next.config.ts:21-30). No test commands are configured.

## Architecture

### High-Level Structure
This is a gender reveal website built with Next.js 15 App Router and Convex real-time database. The app uses internationalization (i18n) with English and Ukrainian support, with Ukrainian as the default locale.

### Key Architectural Patterns
1. **App Router with i18n**: All pages live under `src/app/[locale]/` for internationalized routing
2. **Real-time Data**: Convex provides live updates for voting, RSVPs, and reveal status
3. **Client Components**: Most components use `"use client"` for interactivity and Convex hooks
4. **Theme System**: Multiple visual themes implemented via CSS modules in `src/styles/`

### Database Schema (Convex)
- `party`: Single event record with reveal status and actual gender
- `rsvps`: Guest attendance records indexed by party
- `guesses`: Gender predictions indexed by party  
- `photos`: Gallery items with categories (pregnancy/ultrasound/general)
- `wishes`: Congratulatory messages indexed by party

### Core Flows
1. **Guessing Game**: Components read/write to `guesses` table via Convex mutations
2. **RSVP System**: Form submissions create records in `rsvps` table
3. **Real-time Updates**: All components subscribe to Convex queries for live data
4. **Reveal Logic**: `party.isRevealed` flag controls reveal animation visibility

### Special Features
- Duck mascot component (`DuckMascot.tsx`) has click counter for dance animation
- `/duckling` page provides additional baby-themed features
- Language switcher component allows runtime locale changes