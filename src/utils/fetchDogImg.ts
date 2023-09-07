import axios from "axios";
import { APIResponse } from "../components/VotePicker";
import urlExist from "url-exist";

export default async function fetchDogImg(url: string) {
    const response = await axios.get(url);
    const result: APIResponse = response.data;
    const isValid = await urlExist(result.message);
    const dogImg: string = isValid ? result.message : await fetchDogImg(url);
    return dogImg;
}
