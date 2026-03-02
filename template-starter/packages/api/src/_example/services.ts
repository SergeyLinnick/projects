import ky from 'ky';
import type {
  ProjectDto,
  ProjectListParams,
  ProjectListResponse,
  CreateProjectPayload,
  UpdateProjectPayload,
} from '@repo/models';

/**
 * API client instance.
 * Configure base URL and default headers here.
 */
const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectService = {
  list: (params?: ProjectListParams) =>
    api.get('projects', { searchParams: params as Record<string, string> }).json<ProjectListResponse>(),

  getById: (id: string) =>
    api.get(`projects/${id}`).json<ProjectDto>(),

  create: (payload: CreateProjectPayload) =>
    api.post('projects', { json: payload }).json<ProjectDto>(),

  update: (id: string, payload: UpdateProjectPayload) =>
    api.patch(`projects/${id}`, { json: payload }).json<ProjectDto>(),

  delete: (id: string) =>
    api.delete(`projects/${id}`).json<void>(),
};
