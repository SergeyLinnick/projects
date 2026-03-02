import { db } from './client';
import { users, projects } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Create example user
  const [user] = await db
    .insert(users)
    .values({
      name: 'Test User',
      email: 'test@example.com',
    })
    .returning();

  if (!user) {
    throw new Error('Failed to create seed user');
  }

  // Create example projects
  await db.insert(projects).values([
    {
      name: 'Project Alpha',
      description: 'First example project',
      ownerId: user.id,
    },
    {
      name: 'Project Beta',
      description: 'Second example project',
      ownerId: user.id,
    },
  ]);

  console.log('✅ Seeding complete');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
