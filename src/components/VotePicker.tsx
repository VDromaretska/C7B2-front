import axios from "axios";
import { useState, useEffect } from "react";

interface APIResponse {
    message: string;
    status: string;
}

interface DogImgSrc {
    dogOne: string;
    dogTwo: string;
}

export default function VotePicker(): JSX.Element {
    const [dogsImageSrc, setDogsImageSrc] = useState<DogImgSrc>();

    useEffect(() => {
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

    async function fetchDogImg() {
        const APIUrl = "https://dog.ceo/api/breeds/image/random";
        const response = await axios.get(APIUrl);
        const result: APIResponse = response.data;
        return result.message;
    }

    return (
        <div className="vote-img-container">
            <img
                className="dog-img"
                src={dogsImageSrc?.dogOne}
                alt="random breed"
            />
            <br />
            <img
                className="dog-img"
                src={dogsImageSrc?.dogTwo}
                alt="random breed"
            />
        </div>
    );
}
