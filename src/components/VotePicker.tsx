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

interface VotePickerProps {
    setRerenderCounter: React.Dispatch<React.SetStateAction<number>>;
    rerenderCounter: number;
}

export default function VotePicker({
    rerenderCounter,
    setRerenderCounter,
}: VotePickerProps): JSX.Element {
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
    }, [rerenderCounter]);

    return (
        <div className="vote-img-container">
            <VoteView
                src={dogsImageSrc.dogOne}
                setRerenderCounter={setRerenderCounter}
            />
            <VoteView
                src={dogsImageSrc.dogTwo}
                setRerenderCounter={setRerenderCounter}
            />
        </div>
    );
}
