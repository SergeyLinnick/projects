import { auth } from '@repo/auth';

export const metadata = {
  title: 'Overview',
};

export default async function AdminDashboardPage() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground">
          Welcome, {session?.user?.name ?? 'Admin'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['Total Users', 'Active Sessions', 'System Health'].map((label) => (
          <div key={label} className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold">—</p>
          </div>
        ))}
      </div>
    </div>
  );
}
