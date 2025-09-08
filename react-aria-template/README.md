# React Aria Template

A comprehensive React component library built with React Aria Components, TypeScript, and Tailwind CSS. This template provides a complete set of accessible, customizable UI components with Storybook documentation and modern development tooling.

## 🚀 Features

- **Accessible Components**: Built on React Aria Components for full accessibility compliance
- **TypeScript**: Full type safety and excellent developer experience
- **Tailwind CSS**: Modern utility-first styling with custom design system
- **Storybook**: Interactive component documentation and testing
- **Modern Tooling**: Vite, ESLint, and comprehensive development setup
- **Dark Mode**: Built-in dark/light theme support
- **Responsive Design**: Mobile-first responsive components

## 📦 Components

### Form Components
- **Button** - Various button styles and states
- **Input Field** - Text inputs with validation and labels
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection with search
- **Combobox** - Searchable dropdown with custom options
- **Checkbox** - Checkbox inputs with labels
- **Radio Group** - Radio button groups
- **Switch** - Toggle switches
- **Slider** - Range input sliders
- **Date Picker** - Date selection components
- **Time Picker** - Time selection components
- **Password Input** - Secure password input
- **Number Field** - Numeric input with validation
- **Search Field** - Search input with clear functionality
- **File Trigger** - File upload triggers
- **Dropzone** - Drag and drop file upload

### Layout Components
- **Card** - Content containers
- **Dialog** - Modal dialogs and overlays
- **Popover** - Floating content containers
- **Tooltip** - Contextual help text
- **Hover Card** - Rich hover content
- **Callout** - Alert and notification boxes
- **Separator** - Visual dividers
- **Tabs** - Tabbed content organization
- **Stepper** - Step-by-step process indicators
- **Breadcrumbs** - Navigation breadcrumbs

### Data Display
- **Table** - Data tables with sorting and selection
- **List Box** - Selectable list components
- **Grid List** - Grid-based list layouts
- **Avatar** - User profile images
- **Badge** - Status and category indicators
- **Tag Group** - Tag collections
- **Meter** - Progress and measurement displays
- **Progress Bar** - Loading and progress indicators
- **Skeleton** - Loading state placeholders
- **Empty State** - Empty content states

### Navigation
- **Menu** - Dropdown and context menus
- **Pagination** - Page navigation
- **Disclosure** - Collapsible content sections

### Feedback
- **Toast** - Temporary notifications
- **Notification Badge** - Count and status badges
- **Modal** - Full-screen overlays

### Utility
- **Icon** - Icon components (Lucide React)
- **Text** - Typography components
- **Heading** - Heading components
- **Link** - Link components
- **Clipboard** - Copy-to-clipboard functionality
- **Keyboard** - Keyboard shortcut display

## 🛠️ Tech Stack

- **React 19.0.0** - Latest React with concurrent features
- **TypeScript 5.7.0** - Type-safe JavaScript
- **React Aria Components 1.11.0** - Accessible component primitives
- **Tailwind CSS 4.1.1** - Utility-first CSS framework
- **Vite 6.1.1** - Fast build tool and dev server
- **Storybook 9.0.5** - Component documentation and testing
- **Lucide React 0.460.0** - Beautiful icon library
- **Floating UI** - Positioning and tooltip library
- **React Virtual** - Virtual scrolling for large lists

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-aria-template
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open Storybook for component documentation:
```bash
npm run storybook
```

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production
- `npm run lint` - Run ESLint

## 📚 Usage

### Basic Component Usage

```tsx
import { Button } from './src/button';
import { TextField, Input, Label } from './src/field';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      
      <TextField>
        <Label>Email</Label>
        <Input type="email" />
      </TextField>
    </div>
  );
}
```

### Styling

The project uses Tailwind CSS with a custom design system. Components are styled using utility classes and CSS custom properties for theming.

```tsx
// Using utility classes
<Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Styled Button
</Button>

// Using theme variables
<div className="bg-background text-foreground border border-border">
  Themed content
</div>
```

### Dark Mode

Dark mode is supported through CSS custom properties and the `.dark` class:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

## 🎨 Theming

The project includes a comprehensive design system with:

- **Color System**: Light and dark themes with semantic color tokens
- **Typography**: Consistent text styles and hierarchy
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation and depth system
- **Animations**: Smooth transitions and micro-interactions

## 📖 Documentation

- **Storybook**: Interactive component documentation at `/storybook`
- **Component Stories**: Individual component examples and variants
- **Layout Examples**: Complete page layouts and patterns
- **Form Examples**: Complex form layouts and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Make your changes
4. Add tests and stories for new components
5. Run linting: `npm run lint`
6. Commit your changes: `git commit -m 'Add new component'`
7. Push to the branch: `git push origin feature/new-component`
8. Submit a pull request

## 📄 License

This project is private and not licensed for public use.

## 🔧 Development Notes

- **Author**: Not specified in package.json
- **Version**: 0.0.1
- **Private**: Yes
- **License**: Not specified

## 📁 Project Structure

```
src/
├── components/          # Individual component files
├── hooks/              # Custom React hooks
├── icons/              # Icon components
│   ├── outline/        # Outline icons
│   └── solid/          # Solid icons
├── styles/             # Global styles and CSS
└── utils.ts            # Utility functions

stories/                # Storybook stories
├── layouts/            # Layout examples
├── tanstack/           # Third-party integrations
└── *.stories.tsx       # Component stories
```

## 🚀 Deployment

The project includes GitHub Actions workflow for automatic Storybook deployment to GitHub Pages.

## 📞 Support

For questions and support, please open an issue in the repository.

---

Built with ❤️ using React Aria Components and modern web technologies.
