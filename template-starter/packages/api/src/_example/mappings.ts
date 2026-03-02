import type { Project } from '@repo/database/schema';
import type { ProjectDto } from '@repo/models';

/**
 * Map database entity to API DTO.
 * Keeps the API response shape decoupled from the database schema.
 */
export function mapProjectToDto(project: Project): ProjectDto {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    isArchived: project.isArchived,
    ownerId: project.ownerId,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

export function mapProjectsToDtos(projects: Project[]): ProjectDto[] {
  return projects.map(mapProjectToDto);
}
