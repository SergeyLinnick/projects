# Shadcn Phone Input

A beautiful, accessible, and feature-rich phone input component built with [shadcn/ui](https://ui.shadcn.com/) and [react-phone-number-input](https://github.com/catamphetamine/react-phone-number-input).

[![Demo](https://img.shields.io/badge/Demo-Live%20Demo-blue?style=for-the-badge)](https://shadcn-phone-input.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge)](https://github.com/shadcn-phone-input)
[![Vue Version](https://img.shields.io/badge/Vue%20Version-Available-green?style=for-the-badge)](https://shadcn-vue-phone-input.vercel.app)

## ✨ Features

- 🎨 **Beautiful Design**: Built with shadcn/ui components for consistent, modern styling
- 🌍 **Country Selection**: Interactive country picker with flag icons and search functionality
- 📱 **Phone Validation**: Built-in phone number validation and formatting
- 🌐 **Internationalization**: Support for multiple languages and locales
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 🔧 **Customizable**: Extensive customization options and theming support
- 📝 **Form Integration**: Seamless integration with React Hook Form and Zod validation
- 🎯 **TypeScript**: Full TypeScript support with comprehensive type definitions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- A Next.js project with shadcn/ui setup

### Installation

1. **Install the required shadcn/ui components:**

```bash
npx shadcn@latest add input
npx shadcn@latest add button
npx shadcn@latest add command
npx shadcn@latest add toast
npx shadcn@latest add popover
npx shadcn@latest add scroll-area
```

2. **Install react-phone-number-input:**

```bash
npm install react-phone-number-input
# or
pnpm add react-phone-number-input
```

3. **Copy the PhoneInput component:**

Copy the `phone-input.tsx` file from this project to your `components/ui/` directory.

## 📖 Usage

### Basic Usage

```tsx
import { PhoneInput } from "@/components/ui/phone-input";

function MyForm() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <PhoneInput
      value={phoneNumber}
      onChange={setPhoneNumber}
      placeholder="Enter your phone number"
    />
  );
}
```

### With React Hook Form

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { PhoneInput } from "@/components/ui/phone-input";

const FormSchema = z.object({
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

function MyForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { phone: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## 🎛️ Props & Options

The `PhoneInput` component accepts all props from `react-phone-number-input` plus additional customization options:

### Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | The phone number value |
| `onChange` | `(value: string) => void` | - | Callback when value changes |
| `defaultCountry` | `Country` | - | Default country code (e.g., "US") |
| `international` | `boolean` | `true` | Force international format |
| `placeholder` | `string` | - | Input placeholder text |
| `disabled` | `boolean` | `false` | Disable the input |
| `labels` | `object` | - | Localization labels |

### Advanced Props

| Prop | Type | Description |
|------|------|-------------|
| `initialValueFormat` | `"national" \| "international"` | Initial value format |
| `onCountryChange` | `(country: Country) => void` | Country change callback |
| `smartCaret` | `boolean` | Smart caret positioning |
| `className` | `string` | Additional CSS classes |

## 🌍 Internationalization

### Setting Default Country

```tsx
<PhoneInput
  defaultCountry="TR"
  placeholder="Enter phone number"
/>
```

### Localization

```tsx
import tr from "react-phone-number-input/locale/tr";

<PhoneInput
  labels={tr}
  placeholder="Telefon numarası"
/>
```

### Format Options

```tsx
// Force international format
<PhoneInput international={true} />

// Force national format
<PhoneInput international={false} />

// Set initial format
<PhoneInput initialValueFormat="national" />
```

## 🎨 Customization

### Styling

The component uses Tailwind CSS classes and can be customized through the `className` prop:

```tsx
<PhoneInput
  className="w-full max-w-md"
  placeholder="Custom styled input"
/>
```

### Theme Integration

The component automatically adapts to your shadcn/ui theme and supports both light and dark modes.

## 📱 Examples

### Form in Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PhoneInput } from "@/components/ui/phone-input";

function PhoneFormDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Phone Number</DialogTitle>
        </DialogHeader>
        <PhoneInput placeholder="Enter your phone number" />
      </DialogContent>
    </Dialog>
  );
}
```

### With Validation

```tsx
import { isValidPhoneNumber } from "react-phone-number-input";

function validatePhone(phone: string) {
  if (!phone) return "Phone number is required";
  if (!isValidPhoneNumber(phone)) return "Invalid phone number";
  return null;
}
```

## 🏗️ Project Structure

```
components/
├── ui/
│   └── phone-input.tsx          # Main component
├── examples/
│   ├── form-in-dialog-example.tsx
│   ├── form-in-sheet-example.tsx
│   └── standalone-form-dialog-example.tsx
app/
├── (home)/
│   ├── sections/
│   │   ├── hero.tsx            # Hero section
│   │   ├── setup.tsx           # Setup instructions
│   │   └── variants.tsx        # Component variants
│   └── page.tsx                # Main page
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 9+

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/omeralpi/shadcn-phone-input.git
cd shadcn-phone-input
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Run the development server:**
```bash
pnpm dev
```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [react-phone-number-input](https://github.com/catamphetamine/react-phone-number-input) - Core phone input functionality
- [Radix UI](https://www.radix-ui.com/) - Accessible UI primitives

## 🔗 Links

- [Live Demo](https://shadcn-phone-input.vercel.app)
- [GitHub Repository](https://github.com/shadcn-phone-input)
- [Vue.js Version](https://shadcn-vue-phone-input.vercel.app)
