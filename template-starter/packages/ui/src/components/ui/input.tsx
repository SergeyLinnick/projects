import {
  TextField as AriaTextField,
  Input as AriaInput,
  Label as AriaLabel,
  FieldError as AriaFieldError,
  Text as AriaText,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';

import { cx } from '../utils/cx';

const inputStyles = cx(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2',
  'text-sm ring-offset-background',
  'placeholder:text-muted-foreground',
  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'data-[invalid]:border-destructive data-[invalid]:ring-destructive',
);

export interface InputProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
}

export function Input({
  label,
  description,
  errorMessage,
  placeholder,
  className,
  ...props
}: InputProps) {
  return (
    <AriaTextField className={cx('flex flex-col gap-1.5', className)} {...props}>
      {label && (
        <AriaLabel className="text-sm font-medium leading-none">{label}</AriaLabel>
      )}
      <AriaInput className={inputStyles} placeholder={placeholder} />
      {description && (
        <AriaText slot="description" className="text-xs text-muted-foreground">
          {description}
        </AriaText>
      )}
      <AriaFieldError className="text-xs text-destructive">
        {errorMessage}
      </AriaFieldError>
    </AriaTextField>
  );
}
