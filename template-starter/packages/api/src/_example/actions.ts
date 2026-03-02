'use server';

import { eq } from 'drizzle-orm';

import { db } from '@repo/database/client';
import { projects } from '@repo/database/schema';
import type { CreateProjectInput, UpdateProjectInput } from '@repo/models';

export async function createProjectAction(input: CreateProjectInput, ownerId: string) {
  const [project] = await db
    .insert(projects)
    .values({
      name: input.name,
      description: input.description,
      ownerId,
    })
    .returning();

  return project;
}

export async function updateProjectAction(id: string, input: UpdateProjectInput) {
  const [project] = await db
    .update(projects)
    .set(input)
    .where(eq(projects.id, id))
    .returning();

  return project;
}

export async function deleteProjectAction(id: string) {
  await db.delete(projects).where(eq(projects.id, id));
}
