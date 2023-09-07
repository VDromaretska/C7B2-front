import { useEffect, useState } from "react";
import fetchDogImg from "../utils/fetchDogImg";
import { VoteView } from "./VoteView";

export interface APIResponse {
    message: string;
    status: string;
}

interface DogImgSrc {
    dogOne: string;
    dogTwo: string;
}

interface VotePickerProps {
    currentUserId: string;
}

export default function VotePicker({
    currentUserId,
}: VotePickerProps): JSX.Element {
    const [dogsImageSrc, setDogsImageSrc] = useState<DogImgSrc>({
        dogOne: "",
        dogTwo: "",
    });

    useEffect(() => {
        createImgData();
    }, []);

    async function createImgData() {
        try {
            const APIUrl = "https://dog.ceo/api/breeds/image/random";
            const dogOneValue = await fetchDogImg(APIUrl);
            const dogTwoValue = await fetchDogImg(APIUrl);
            const imageSrcData: DogImgSrc = {
                dogOne: dogOneValue,
                dogTwo: dogTwoValue,
            };
            setDogsImageSrc(imageSrcData);
        } catch (error) {
            console.log("Error fetching data", error);
        }
    }

    return (
        <div className="vote-img-container">
            <VoteView
                src={dogsImageSrc.dogOne}
                createImgData={createImgData}
                currentUserId={currentUserId}
            />
            <VoteView
                src={dogsImageSrc.dogTwo}
                createImgData={createImgData}
                currentUserId={currentUserId}
            />
        </div>
    );
}
