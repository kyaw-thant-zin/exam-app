import appAxios from '@/libs/axios';
import { JobResponse, JobDetailResponse, JobList } from './type';
export async function getJobsList() {
  const result = await appAxios
    .get<JobResponse>(`/api/srv/careers`)
    .then((res) => res.data);

  return result?.data.data;
}

export async function getJobDetail({ jobId }: { jobId: number }) {
  return (await appAxios.get)<JobDetailResponse>(
    `/api/srv/careers/${jobId}`
  ).then((res) => res.data);
}
