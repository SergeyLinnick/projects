import { redirect } from 'next/navigation';
import Link from 'next/link';

import { auth, signOut } from '@repo/auth';
import { Button } from '@repo/ui';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/sign-in');
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r bg-card px-4 py-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold">Admin</h2>
          <p className="text-xs text-muted-foreground">Management Console</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          <Link
            href="/dashboard"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/users"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Users
          </Link>
          <Link
            href="/dashboard/settings"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Settings
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t pt-4">
          <p className="truncate text-sm text-muted-foreground">{session.user.email}</p>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/sign-in' });
            }}
          >
            <Button type="submit" variant="ghost" size="sm" className="w-full justify-start">
              Sign out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
