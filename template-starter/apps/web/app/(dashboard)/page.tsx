import { auth } from '@repo/auth';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name ?? 'User'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards — replace with real widgets */}
        {['Total Projects', 'Active', 'Archived', 'Team Members'].map((label) => (
          <div key={label} className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold">—</p>
          </div>
        ))}
      </div>
    </div>
  );
}
