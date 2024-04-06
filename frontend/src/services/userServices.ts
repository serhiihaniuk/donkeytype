import axios from "axios";
import config from "../../../config";

export const UserApi = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
});

export const checkUsername = async (username: string) => {
  try {
    await UserApi.get(`/checkUsername?username=${username}`);
    return true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response.status === 409) {
      return false
    } else {
      console.error(error);
    }
  }
}
