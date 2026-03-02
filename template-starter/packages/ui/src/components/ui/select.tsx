import {
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  Label as AriaLabel,
  Button as AriaButton,
  Popover as AriaPopover,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type SelectProps as AriaSelectProps,
  type ListBoxItemProps,
} from 'react-aria-components';
import { ChevronDown } from '@untitled-ui/icons-react';

import { cx } from '../utils/cx';

export interface SelectProps<T extends object> extends AriaSelectProps<T> {
  label?: string;
  className?: string;
  items?: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T extends object>({
  label,
  className,
  children,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect className={cx('flex flex-col gap-1.5', className)} {...props}>
      {label && (
        <AriaLabel className="text-sm font-medium leading-none">{label}</AriaLabel>
      )}
      <AriaButton
        className={cx(
          'flex h-10 w-full items-center justify-between rounded-md border border-input',
          'bg-background px-3 py-2 text-sm ring-offset-background',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[placeholder]:text-muted-foreground',
        )}
      >
        <AriaSelectValue />
        <ChevronDown className="h-4 w-4 opacity-50" />
      </AriaButton>
      <AriaPopover
        className={cx(
          'z-50 w-[var(--trigger-width)] rounded-md border bg-popover shadow-md',
          'data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:zoom-in-95',
          'data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95',
        )}
      >
        <AriaListBox className="max-h-60 overflow-auto p-1">{children}</AriaListBox>
      </AriaPopover>
    </AriaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return (
    <AriaListBoxItem
      className={cx(
        'relative flex w-full cursor-default select-none items-center rounded-sm',
        'px-2 py-1.5 text-sm outline-none',
        'data-[focused]:bg-muted data-[focused]:text-foreground',
        'data-[selected]:bg-primary data-[selected]:text-primary-foreground',
      )}
      {...props}
    />
  );
}
