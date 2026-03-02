import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { ProjectDto, ProjectListParams, ProjectListResponse } from '@repo/models';

import { projectService } from './services';

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params?: ProjectListParams) => [...projectKeys.lists(), params] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

export function useProjectList(
  params?: ProjectListParams,
  options?: Partial<UseQueryOptions<ProjectListResponse>>,
) {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => projectService.list(params),
    ...options,
  });
}

export function useProject(
  id: string,
  options?: Partial<UseQueryOptions<ProjectDto>>,
) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectService.getById(id),
    enabled: !!id,
    ...options,
  });
}
