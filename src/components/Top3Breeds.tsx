import { Leaderboard } from "./LeaderBoard";
import PodiumDogView from "./PodiumDogView";
interface Top3ImagesProps {
    podium: Leaderboard[];
}

export function Top3Breeds({ podium }: Top3ImagesProps): JSX.Element {
    return (
        <>
            {podium.map((dog) => (
                <PodiumDogView key={dog.breed} dog={dog} />
            ))}
        </>
    );
}
