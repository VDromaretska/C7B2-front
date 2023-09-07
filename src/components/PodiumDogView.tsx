import { useEffect, useState } from "react";
import fetchDogImg from "../utils/fetchDogImg";
import { Leaderboard } from "./LeaderBoard";

interface TopDogProps {
    dog: Leaderboard;
}

export default function PodiumDogView({ dog }: TopDogProps): JSX.Element {
    const [image, setImage] = useState("");

    function breedUrlConstructor(breed: string): string {
        const searchBreed = breed.replace("-", "/");
        return `https://dog.ceo/api/breed/${searchBreed}/images/random`;
    }

    const currentBreedLink = breedUrlConstructor(dog.breed);

    useEffect(() => {
        updateDogImg(currentBreedLink);
    }, [currentBreedLink]);

    async function updateDogImg(url: string) {
        try {
            const image = await fetchDogImg(url);
            setImage(image);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div key={dog.breed}>
                <button onClick={() => updateDogImg(currentBreedLink)}>
                    <img src={image} alt="top-dog" />
                </button>
                <h3>
                    {dog.breed}:{dog.votes} votes
                </h3>
            </div>
        </>
    );
}
