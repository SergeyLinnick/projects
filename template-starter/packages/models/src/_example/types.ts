/**
 * Example feature types.
 * Replace _example with your actual feature name.
 */

export interface ProjectDto {
  id: string;
  name: string;
  description: string | null;
  isArchived: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isArchived?: boolean;
}

export interface ProjectListResponse {
  data: ProjectDto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  isArchived?: boolean;
}
