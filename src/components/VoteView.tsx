import axios from "axios";
import extractBreedName from "../utils/extractBreedName";
import { baseURL } from "./App";

interface VoteViewProps {
    src: string;
    setRerenderCounter: React.Dispatch<React.SetStateAction<number>>;
}

export function VoteView({
    src,
    setRerenderCounter,
}: VoteViewProps): JSX.Element {
    const breedName = extractBreedName(src as string);
    const handleVote = async () => {
        try {
            await axios.put(baseURL + "/votes/" + breedName, {
                breed: breedName,
            });
            setRerenderCounter((prev) => prev + 1);
        } catch (error) {
            console.log("Error on voting", error);
        }
    };
    return (
        <div>
            <img className="dog-img" src={src} alt="random breed" />
            <button
                onClick={handleVote}
                value={breedName}
            >{`Vote for ${breedName}!`}</button>
        </div>
    );
}
