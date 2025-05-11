import appAxios from './axios';

/**
 * The default fetcher function for SWR.
 * It wraps the appAxios instance to make a GET request to the given URL.
 * The response data is then returned.
 *
 * @param {string} url - The URL to make the GET request to.
 * @returns {Promise<any>} - The response data.
 */
export const fetcher = (url: string) =>
  appAxios.get(url).then((res) => res.data);
