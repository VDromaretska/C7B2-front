import axios from "axios";

import { Leaderboard } from "./LeaderBoard";
import { APIResponse } from "./VotePicker";
import urlExist from "url-exist";
import { useEffect } from "react";
interface Top3ImagesProps {
    top3: Leaderboard[];
    setTop3: (leader: Leaderboard[]) => void;
}

export function Top3Images({ top3, setTop3 }: Top3ImagesProps): JSX.Element {
    function breedUrlConstructor(breed: string): string {
        return `https://dog.ceo/api/breed/${breed}/images/random`;
    }
    useEffect(() => {
        addImgUrlToAll();
    }, []);

    async function addImgUrlToAll() {
        console.log(top3);
        try {
            for (const topBreed of top3) {
                console.log("topBreed:,", topBreed);
                await addImgUrlToTop3(topBreed);
                // await updateImgUrl(topBreed);
            }
        } catch (error) {
            console.log("addImgUrlToAll", error);
        }
    }

    async function fetchDogImg(APIUrl: string) {
        try {
            const response = await axios.get(APIUrl);
            const result: APIResponse = response.data;
            const isValid = await urlExist(result.message);
            const dogImg: string = isValid
                ? result.message
                : ((await fetchDogImg(APIUrl)) as string);
            console.log("Dog image is", dogImg);
            return dogImg;
        } catch (error) {
            console.error("fetchDogImg", error);
        }
    }

    async function addImgUrlToTop3(topBreed: Leaderboard) {
        try {
            const imageUrl = await fetchDogImg(
                breedUrlConstructor(topBreed.breed)
            );
            topBreed.imageUrl = imageUrl;
        } catch (error) {
            console.log("Error fetching top 3:", error);
        }
    }
    async function updateImgUrl(topBreed: Leaderboard) {
        try {
            const updatedTop3 = await Promise.all(
                top3.map(async (breed) =>
                    breed.breed === topBreed.breed
                        ? {
                              ...breed,

                              imageUrl: await fetchDogImg(
                                  breedUrlConstructor(breed.breed)
                              ),
                          }
                        : breed
                )
            );
            setTop3(updatedTop3);
        } catch (error) {
            console.log("Error updating leaderboard:", error);
        }
    }

    return (
        <div>
            {top3.map((topBreed) => (
                <div key={topBreed.breed}>
                    <button onClick={async () => await updateImgUrl(topBreed)}>
                        <img src={topBreed.imageUrl} alt="top-dog" />
                    </button>
                    <h3>
                        {topBreed.breed}:{topBreed.votes} votes
                    </h3>
                </div>
            ))}
        </div>
    );
}
