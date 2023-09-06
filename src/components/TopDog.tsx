import axios from "axios";
import { Leaderboard } from "./LeaderBoard";
import urlExist from "url-exist";
import { useEffect, useState } from "react";

interface TopDogProps {
    dog: Leaderboard;
}

export default function TopDog({ dog }: TopDogProps): JSX.Element {
    const [image, setImage] = useState("");
    const [rerenderCounter, setRerenderCounter] = useState(0);
    function breedUrlConstructor(breed: string): string {
        return `https://dog.ceo/api/breed/${breed}/images/random`;
    }

    useEffect(() => {
        async function fetchDogImg() {
            const url = breedUrlConstructor(dog.breed);
            console.log(url);
            const result = await axios.get(url);
            console.log(result.data);
            const isValid = await urlExist(result.data.message);
            const dogImg: string = isValid
                ? result.data.message
                : ((await fetchDogImg()) as string);
            console.log("Dog image is", dogImg);
            return dogImg;
        }

        async function updateDogImg() {
            try {
                const image = await fetchDogImg();
                setImage(image);
            } catch (error) {
                console.error(error);
            }
        }

        updateDogImg();
    }, [dog.breed, rerenderCounter]);

    return (
        <>
            <div key={dog.breed}>
                <button onClick={() => setRerenderCounter((prev) => prev + 1)}>
                    <img src={image} alt="top-dog" />
                </button>
                <h3>
                    {dog.breed}:{dog.votes} votes
                </h3>
            </div>
        </>
    );
}
