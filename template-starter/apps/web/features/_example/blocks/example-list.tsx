import type { ProjectDto } from '@repo/models';

interface ExampleListProps {
  data: ProjectDto[];
  isLoading: boolean;
}

export function ExampleList({ data, isLoading }: ExampleListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
        <p className="text-sm text-muted-foreground">No projects yet</p>
        <p className="text-xs text-muted-foreground">Create your first project to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b px-4 py-3 text-sm font-medium text-muted-foreground">
        <span>Name</span>
        <span>Status</span>
        <span>Created</span>
      </div>
      {data.map((project) => (
        <div
          key={project.id}
          className="grid grid-cols-[1fr_auto_auto] gap-4 border-b px-4 py-3 text-sm last:border-0"
        >
          <div>
            <p className="font-medium">{project.name}</p>
            {project.description && (
              <p className="text-xs text-muted-foreground">{project.description}</p>
            )}
          </div>
          <span className="text-muted-foreground">
            {project.isArchived ? 'Archived' : 'Active'}
          </span>
          <span className="text-muted-foreground">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}
