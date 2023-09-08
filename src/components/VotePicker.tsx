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
    const [containerHeight, setContainerHeight] = useState<string>("auto");

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
        <div className="vote-picker-container">
            <VoteView
                src={dogsImageSrc.dogOne}
                createImgData={createImgData}
                currentUserId={currentUserId}
                setContainerHeight={setContainerHeight}
                containerHeight={containerHeight}
            />
            <VoteView
                src={dogsImageSrc.dogTwo}
                createImgData={createImgData}
                currentUserId={currentUserId}
                setContainerHeight={setContainerHeight}
                containerHeight={containerHeight}
            />
        </div>
    );
}
