import { Leaderboard } from "./LeaderBoard";
import TopDog from "./TopDog";
interface Top3ImagesProps {
    leaderboard: Leaderboard[];
    setLeaderboard: React.Dispatch<React.SetStateAction<Leaderboard[]>>;
}

export function Top3({ leaderboard }: Top3ImagesProps): JSX.Element {
    const top3 = leaderboard.slice(0, 3);

    // useEffect(() => {
    //     addImgUrlToAll();
    // }, []);

    return (
        <>
            {top3.map((dog) => (
                <TopDog key={dog.breed} dog={dog} />
            ))}
        </>
    );

    // async function addImgUrlToAll() {
    //     console.log(top3);
    //     try {
    //         for (const topBreed of top3) {
    //             console.log("topBreed:,", topBreed);
    //             await addImgUrlToTop3(topBreed);
    //             // await updateImgUrl(topBreed);
    //         }
    //     } catch (error) {
    //         console.log("addImgUrlToAll", error);
    //     }
    // }

    // async function addImgUrlToTop3(topBreed: Leaderboard) {
    //     try {
    //         const imageUrl = await fetchDogImg(
    //             breedUrlConstructor(topBreed.breed)
    //         );
    //         topBreed.imageUrl = imageUrl;
    //     } catch (error) {
    //         console.log("Error fetching top 3:", error);
    //     }
    // }
    // async function updateImgUrl(topBreed: Leaderboard) {
    //     try {
    //         const updatedTop3 = await Promise.all(
    //             top3.map(async (breed) =>
    //                 breed.breed === topBreed.breed
    //                     ? {
    //                           ...breed,

    //                           imageUrl: await fetchDogImg(
    //                               breedUrlConstructor(breed.breed)
    //                           ),
    //                       }
    //                     : breed
    //             )
    //         );
    //         setLeaderboard(updatedTop3);
    //     } catch (error) {
    //         console.log("Error updating leaderboard:", error);
    //     }
    // }
}
