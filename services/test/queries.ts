import appAxios from '@/libs/axios';

export async function getWeather() {
  const { data } = await appAxios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  return data;
}
