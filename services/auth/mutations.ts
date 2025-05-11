import appAxios from '@/libs/axios';
import axios from 'axios';
import { LoginResponse } from './type';
type LoginArgs = {
  email: string;
  password: string;
};

export async function useLogin(arg: LoginArgs) {
  return await appAxios.post<LoginResponse>(`/api/srv/login`, arg);
}
