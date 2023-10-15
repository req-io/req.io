import axios from "axios";


export const get = async (url: string) => {
  return axios.get(url);
}

