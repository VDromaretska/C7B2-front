import axios from "axios";
import urlExist from "url-exist";
import { useState, useEffect } from "react";
import { VoteView } from "./VoteView";

interface APIResponse {
    message: string;
    status: string;
}

interface DogImgSrc {
    dogOne: string;
    dogTwo: string;
}

export default function VotePicker(): JSX.Element {
    const [dogsImageSrc, setDogsImageSrc] = useState<DogImgSrc>({
        dogOne: "",
        dogTwo: "",
    });

    useEffect(() => {
        async function fetchDogImg() {
            const APIUrl = "https://dog.ceo/api/breeds/image/random";
            const response = await axios.get(APIUrl);
            const result: APIResponse = response.data;
            const isValid = await urlExist(result.message);
            const dogImg: string = isValid
                ? result.message
                : await fetchDogImg();
            console.log("Dog image is", dogImg);
            return dogImg;
        }

        async function createImgData() {
            try {
                const dogOneValue = await fetchDogImg();
                const dogTwoValue = await fetchDogImg();
                const imageSrcData: DogImgSrc = {
                    dogOne: dogOneValue,
                    dogTwo: dogTwoValue,
                };
                setDogsImageSrc(imageSrcData);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        }
        createImgData();
    }, []);

    return (
        <div className="vote-img-container">
            <VoteView src={dogsImageSrc.dogOne} />
            <VoteView src={dogsImageSrc.dogTwo} />
        </div>
    );
}
