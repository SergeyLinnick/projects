'use client';

import { useState } from 'react';
import { Button } from '@repo/ui';
import { useProjectList } from '@repo/api';

import { ExampleList } from './blocks/example-list';
import { ExampleForm } from './blocks/example-form';

/**
 * Example feature view.
 *
 * Follows the convention: features/[name]/[name]-view.tsx
 * with sub-components in features/[name]/blocks/
 */
export function ExampleView() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data, isLoading } = useProjectList();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your projects</p>
        </div>
        <Button onPress={() => setIsFormOpen(true)}>New Project</Button>
      </div>

      <ExampleList data={data?.data ?? []} isLoading={isLoading} />

      {isFormOpen && <ExampleForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}
