import { signIn } from '@repo/auth';
import { Button } from '@repo/ui';

export const metadata = {
  title: 'Sign In',
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 p-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>

        <form
          action={async () => {
            'use server';
            await signIn('zitadel', { redirectTo: '/' });
          }}
          className="w-full"
        >
          <Button type="submit" variant="primary" className="w-full">
            Sign in with Zitadel
          </Button>
        </form>
      </div>
    </div>
  );
}
