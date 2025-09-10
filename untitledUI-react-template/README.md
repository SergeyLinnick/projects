# Untitled UI React

[![Untitled UI React](https://www.untitledui.com/react/untitled-ui-react-open-graph.jpg)](https://www.untitledui.com/react)

**Untitled UI React** is the world's largest collection of open-source React components. Everything you need to design and develop modern, beautiful interfaces—fast.

## ✨ Features

- 🎨 **100+ Components** - Comprehensive component library covering all UI needs
- ♿ **Accessibility First** - WCAG 2.1 AA compliant with React Aria Components
- 📱 **Mobile-First** - Responsive design by default
- 🎯 **TypeScript** - Fully typed with comprehensive interfaces
- 🌙 **Dark Mode** - Complete theme switching support
- 🎭 **Customizable** - Extensive theming and styling options
- ⚡ **Performance** - Optimized for speed and bundle size
- 📚 **Documentation** - Comprehensive Storybook documentation

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install @untitledui/react

# Using yarn
yarn add @untitledui/react

# Using pnpm
pnpm add @untitledui/react

# Using bun
bun add @untitledui/react
```

### Basic Usage

```tsx
import { Button, Input, Card } from '@untitledui/react';

function App() {
  return (
    <div className="p-8">
      <Card className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Welcome</h2>
        <Input 
          placeholder="Enter your email"
          className="mb-4"
        />
        <Button color="primary">
          Get Started
        </Button>
      </Card>
    </div>
  );
}
```

## 📦 Component Categories

### Base Components
Fundamental UI building blocks for any application.

- **Buttons** - Primary, secondary, tertiary, and destructive variants
- **Inputs** - Text, email, password, and search inputs with validation
- **Avatars** - User profile pictures and initials
- **Badges** - Status indicators and labels
- **Checkboxes** - Form controls with custom styling
- **Dropdowns** - Menu systems and selectors
- **Sliders** - Range input controls
- **Tooltips** - Contextual help and information
- **Tags** - Categorization and filtering
- **Progress Indicators** - Loading states and progress bars

### Application Components
Complex, feature-rich components for application interfaces.

- **Navigation** - Header and sidebar navigation systems
- **Tables** - Data tables with sorting, filtering, and pagination
- **Charts** - Bar, line, pie, radar, and gauge charts
- **Date Pickers** - Calendar and date range selection
- **File Upload** - Drag-and-drop file handling
- **Modals** - Dialog systems and overlays
- **Tabs** - Content organization and navigation
- **Carousels** - Image and content sliders
- **Pagination** - Page navigation controls

### Foundation Elements
Design system foundations and brand assets.

- **Icons** - Comprehensive icon library
- **Logos** - Brand assets and variations
- **Illustrations** - Custom visual elements
- **Payment Icons** - Payment method indicators
- **Social Icons** - Social platform logos

## 🎨 Design System

### Color Palette
Our design system includes a comprehensive color palette with semantic naming:

- **Brand Colors** - Primary brand colors with multiple shades
- **Semantic Colors** - Success, warning, error, and info colors
- **Neutral Colors** - Gray scale for text and backgrounds
- **Utility Colors** - Specialized colors for specific use cases

### Typography
Consistent typography scale with proper line heights and spacing:

- **Display Text** - Large headings and hero text
- **Body Text** - Regular content and descriptions
- **Caption Text** - Small labels and helper text
- **Code Text** - Monospace font for code snippets

### Spacing & Layout
Consistent spacing system based on a 4px grid:

- **Padding & Margins** - Consistent spacing throughout
- **Gaps** - Flexible spacing for flexbox and grid layouts
- **Breakpoints** - Mobile-first responsive design
- **Containers** - Max-width containers for content

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- Bun (recommended) or npm/yarn/pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/untitleduico/react.git

# Install dependencies
bun install

# Start Storybook
bun run storybook

# Run linting
bun run lint

# Run type checking
bun run type-check
```

### Available Scripts

```bash
# Development
bun run storybook          # Start Storybook dev server
bun run build-storybook    # Build Storybook for production

# Code Quality
bun run lint               # Run ESLint with auto-fix
bun run lint:check         # Run ESLint without fixing
bun run prettier           # Format code with Prettier
bun run prettier:check     # Check code formatting
bun run type-check         # Run TypeScript type checking

# Testing
bun run test               # Run all quality checks
```

## 🎯 Usage Examples

### Button Variants

```tsx
import { Button } from '@untitledui/react';

// Primary button
<Button color="primary" size="md">
  Primary Action
</Button>

// Secondary button with icon
<Button 
  color="secondary" 
  size="lg"
  iconLeading={PlusIcon}
>
  Add Item
</Button>

// Destructive button
<Button color="primary-destructive">
  Delete
</Button>
```

### Form Components

```tsx
import { Input, Checkbox, Select } from '@untitledui/react';

// Input with validation
<Input
  label="Email Address"
  placeholder="Enter your email"
  type="email"
  isRequired
  hint="We'll never share your email"
/>

// Checkbox group
<Checkbox
  label="I agree to the terms"
  isRequired
/>

// Select dropdown
<Select
  label="Country"
  placeholder="Select a country"
  options={countries}
/>
```

### Data Table

```tsx
import { Table, TableCard } from '@untitledui/react';

<TableCard.Root>
  <TableCard.Header
    title="Users"
    description="Manage your team members"
    badge="24 users"
  />
  <Table>
    <Table.Header>
      <Table.Head>Name</Table.Head>
      <Table.Head>Email</Table.Head>
      <Table.Head>Role</Table.Head>
    </Table.Header>
    <Table.Body>
      {users.map(user => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.role}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</TableCard.Root>
```

## 🎨 Theming

### CSS Custom Properties

Our design system uses CSS custom properties for theming:

```css
/* Light mode (default) */
:root {
  --color-bg-primary: rgb(255 255 255);
  --color-text-primary: rgb(24 29 39);
  --color-border-primary: rgb(213 215 218);
}

/* Dark mode */
.dark-mode {
  --color-bg-primary: rgb(12 14 18);
  --color-text-primary: rgb(255 255 255);
  --color-border-primary: rgb(55 58 65);
}
```

### Custom Styling

Components accept className props for custom styling:

```tsx
<Button 
  className="bg-custom-color hover:bg-custom-color-hover"
  color="primary"
>
  Custom Button
</Button>
```

## ♿ Accessibility

All components are built with accessibility in mind:

- **WCAG 2.1 AA Compliant** - Meets accessibility standards
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Proper ARIA attributes
- **Focus Management** - Clear focus indicators
- **Color Contrast** - Meets contrast requirements

## 📚 Documentation

- **[Storybook](https://www.untitledui.com/react)** - Interactive component documentation
- **[Component API](https://www.untitledui.com/react/docs)** - Detailed API reference
- **[Design Guidelines](https://www.untitledui.com/react/design)** - Design system principles
- **[Accessibility Guide](https://www.untitledui.com/react/accessibility)** - Accessibility best practices

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [untitledui.com](https://www.untitledui.com)
- **Documentation**: [untitledui.com/react](https://www.untitledui.com/react)
- **GitHub**: [github.com/untitleduico/react](https://github.com/untitleduico/react)
- **Issues**: [github.com/untitleduico/react/issues](https://github.com/untitleduico/react/issues)

## 🙏 Acknowledgments

- [React Aria](https://react-spectrum.adobe.com/react-aria/) for accessibility primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Storybook](https://storybook.js.org/) for component documentation
- [Adobe](https://adobe.com/) for accessibility inspiration

---

**Untitled UI avatars:** [Free placeholder user avatars and profile pictures](https://www.untitledui.com/resources/avatars) to use in your projects.
