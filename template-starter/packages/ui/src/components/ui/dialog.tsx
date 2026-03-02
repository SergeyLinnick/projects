import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  Heading as AriaHeading,
  type DialogProps as AriaDialogProps,
  type ModalOverlayProps,
} from 'react-aria-components';

import { cx } from '../utils/cx';

export { AriaDialogTrigger as DialogTrigger };

export interface DialogProps extends ModalOverlayProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogOverlay({ className, children, ...props }: DialogProps) {
  return (
    <AriaModalOverlay
      className={cx(
        'fixed inset-0 z-50 bg-black/60',
        'data-[entering]:animate-in data-[entering]:fade-in-0',
        'data-[exiting]:animate-out data-[exiting]:fade-out-0',
        className,
      )}
      {...props}
    >
      <AriaModal
        className={cx(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'rounded-lg border bg-card p-6 shadow-lg',
          'data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:zoom-in-95',
          'data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95',
        )}
      >
        {children}
      </AriaModal>
    </AriaModalOverlay>
  );
}

export function DialogContent({ className, ...props }: AriaDialogProps) {
  return <AriaDialog className={cx('outline-none', className)} {...props} />;
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('flex flex-col gap-1.5 text-center sm:text-left', className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.ComponentProps<typeof AriaHeading>) {
  return (
    <AriaHeading
      slot="title"
      className={cx('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}
