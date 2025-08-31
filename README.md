# Kanbananza.com Monorepo

A monorepo for the Kanbananza.com project built with Next.js, Turborepo, and shadcn/ui.

## 🏗️ How This Project Works

This is a **monorepo** managed by **Turborepo** that contains multiple Next.js applications and shared packages. Here's how it's structured:

### **Monorepo Architecture**
- **Root level**: Contains Turborepo configuration, shared scripts, and workspace definitions
- **Apps**: Individual Next.js applications that can run independently
- **Packages**: Shared code that can be used across multiple apps

### **Key Benefits**
- **Shared dependencies**: Install packages once, use everywhere
- **Consistent tooling**: Same ESLint, Prettier, TypeScript config across all apps
- **Faster builds**: Turborepo caches and parallelizes builds
- **Code sharing**: UI components, utilities, and configs shared between apps

## 📁 Project Structure

```
kanbananza-monorepo/
├── apps/                    # Next.js applications
│   ├── landing/             # Public landing page (port 3000)
│   ├── dashboard/           # Admin dashboard (port 3003)
│   ├── kiosk/               # Public kiosk display (port 3002)
│   └── docs/                # Documentation site (port 3001)
├── packages/                # Shared packages
│   ├── ui/                  # Shared UI components (shadcn/ui)
│   ├── eslint-config/       # Shared ESLint configuration
│   ├── typescript-config/   # Shared TypeScript configuration
│   └── tailwind-config/     # Shared Tailwind CSS configuration
├── package.json             # Root package.json with workspace definitions
├── turbo.json               # Turborepo configuration
└── pnpm-workspace.yaml      # pnpm workspace configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18+ (recommended: latest LTS)
- **pnpm**: Latest version (`npm install -g pnpm`)

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd kanbananza-monorepo

# Install all dependencies for all workspaces
pnpm install
```

## 📦 Package Management

### **Installing Packages**

#### **Root-level packages** (available to all apps)
```bash
# Add a package that will be used across multiple apps
pnpm add -w <package-name>

# Add a dev dependency to root
pnpm add -D -w <package-name>
```

#### **App-specific packages**
```bash
# Navigate to the specific app
cd apps/landing

# Add a package only to this app
pnpm add <package-name>

# Or use the --filter flag from root
pnpm add <package-name> --filter landing
```

#### **Package-specific dependencies**
```bash
# Navigate to the package
cd packages/ui

# Add a dependency to the UI package
pnpm add <package-name>

# Or use the --filter flag from root
pnpm add <package-name> --filter @repo/ui
```

### **Common Package Installation Patterns**

```bash
# Add React Query to all apps
pnpm add -w @tanstack/react-query

# Add a UI library to the shared UI package
pnpm add @radix-ui/react-dialog --filter @repo/ui

# Add a testing library to all apps
pnpm add -D -w @testing-library/react

# Add a specific package to just the dashboard
pnpm add @auth/nextjs --filter dashboard
```

## 🎨 Adding shadcn/ui Components

### **How shadcn/ui Works in This Monorepo**

shadcn/ui components are installed in the shared `@repo/ui` package and can be imported by any app. The CLI automatically handles:
- Installing dependencies in the correct package
- Creating components in the right location
- Setting up proper import paths

### **Adding Components**

#### **From an app directory:**
```bash
# Navigate to any app
cd apps/landing

# Add a component (it will be installed in packages/ui)
pnpm dlx shadcn@canary add button
pnpm dlx shadcn@canary add card
pnpm dlx shadcn@canary add dialog
```

#### **From the UI package directory:**
```bash
# Navigate to the UI package
cd packages/ui

# Add components directly to the UI package
pnpm dlx shadcn@canary add button
pnpm dlx shadcn@canary add card
```

### **Using Components in Apps**

```tsx
// In any app (landing, dashboard, kiosk)
import { Button } from "@repo/ui/components/button"
import { Card } from "@repo/ui/components/card"

export default function MyPage() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```

### **Adding Blocks (Complex Components)**

```bash
# Add a login form block (includes multiple components)
pnpm dlx shadcn@canary add login-01

# This will install: button, input, label, card components in @repo/ui
# And create a login-form component in the current app
```

## 🏃‍♂️ Running the Project

### **Development Mode**

#### **Run all apps simultaneously:**
```bash
# From the root directory
pnpm dev
```

This starts:
- **Landing**: http://localhost:3000
- **Dashboard**: http://localhost:3003
- **Kiosk**: http://localhost:3002
- **Docs**: http://localhost:3001

#### **Run a specific app:**
```bash
# Using Turborepo filter
pnpm dev --filter landing
pnpm dev --filter dashboard
pnpm dev --filter kiosk

# Or navigate to the app directory
cd apps/landing
pnpm dev
```

#### **Run multiple specific apps:**
```bash
# Run only landing and dashboard
pnpm dev --filter landing --filter dashboard
```

### **Production Builds**

#### **Build all apps:**
```bash
pnpm build
```

#### **Build a specific app:**
```bash
pnpm build --filter landing
pnpm build --filter dashboard
```

### **Other Commands**

```bash
# Lint all apps
pnpm lint

# Lint a specific app
pnpm lint --filter landing

# Type checking
pnpm check-types

# Format code
pnpm format

# Clean all builds
pnpm clean
```

## ➕ Adding a New App

### **Step 1: Create the App**
```bash
# From the root directory
pnpm dlx create-next-app@latest apps/[app-name] \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --yes
```

### **Step 2: Update the App's Package.json**
```json
{
  "name": "[app-name]",
  "scripts": {
    "dev": "next dev --turbopack --port [port-number]",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --max-warnings 0",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/tailwind-config": "workspace:*",
    // ... other dependencies
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    // ... other dev dependencies
  }
}
```

### **Step 3: Configure Tailwind CSS**
Create `apps/[app-name]/tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";
import { baseConfig } from "@repo/tailwind-config";

const config: Config = {
  ...baseConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
```

### **Step 4: Configure PostCSS**
Create `apps/[app-name]/postcss.config.js`:
```javascript
import postcssConfig from "@repo/tailwind-config/postcss";
export default postcssConfig;
```

### **Step 5: Set up shadcn/ui**
```bash
# Navigate to the new app
cd apps/[app-name]

# Initialize shadcn/ui
pnpm dlx shadcn@canary init

# Update components.json aliases to point to shared UI package
```

### **Step 6: Update Turborepo Configuration**
Add the new app to `turbo.json`:
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### **Step 7: Install Dependencies**
```bash
# From the root directory
pnpm install
```

## 🔧 Development Workflow

### **Typical Development Session**
```bash
# 1. Start all apps in development
pnpm dev

# 2. In another terminal, add a new component
cd apps/landing
pnpm dlx shadcn@canary add button

# 3. Use the component in your app
# The component is now available at @repo/ui/components/button

# 4. Add app-specific dependencies if needed
pnpm add react-hook-form --filter landing

# 5. Build for production
pnpm build
```

### **Code Quality**
```bash
# Format all code
pnpm format

# Lint all code
pnpm lint

# Type check all code
pnpm check-types
```

## 🚀 Deployment

### **Vercel Deployment**
Each app can be deployed independently:

```bash
# Deploy landing page
vercel --cwd apps/landing

# Deploy dashboard
vercel --cwd apps/dashboard

# Deploy kiosk
vercel --cwd apps/kiosk
```

### **Environment Variables**
Create `.env.local` files in each app directory for app-specific environment variables.

## 🛠️ Troubleshooting

### **Common Issues**

#### **Port conflicts**
If you get port conflicts, update the port in the app's `package.json`:
```json
{
  "scripts": {
    "dev": "next dev --turbopack --port 3004"
  }
}
```

#### **Module resolution issues**
If imports aren't working:
1. Check that the package is installed in the correct workspace
2. Verify `package.json` has the correct workspace dependencies
3. Run `pnpm install` from the root

#### **shadcn/ui component not found**
1. Make sure you're in the correct app directory when running `shadcn@canary add`
2. Check that `components.json` has the correct aliases
3. Verify the component was installed in `packages/ui/src/components`

### **Useful Commands**
```bash
# Clean all node_modules and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install

# Clear Turborepo cache
pnpm turbo clean

# Check workspace dependencies
pnpm list --depth=0
```

## 📚 Additional Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [shadcn/ui Monorepo Guide](https://ui.shadcn.com/docs/monorepo)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
