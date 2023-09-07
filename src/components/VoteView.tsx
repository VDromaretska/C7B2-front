import axios from "axios";
import extractBreedName from "../utils/extractBreedName";
import { baseURL } from "./App";

interface VoteViewProps {
    src: string;
    setRerenderCounter: React.Dispatch<React.SetStateAction<number>>;
    currentUserId: string;
}

export function VoteView({
    src,
    setRerenderCounter,
    currentUserId,
}: VoteViewProps): JSX.Element {
    const breedName = extractBreedName(src as string);
    const handleVote = async () => {
        try {
            await axios.put(baseURL + "/votes/" + breedName, {
                breed: breedName,
            });
            if (currentUserId !== "") {
                await axios.put(`${baseURL}/users/${currentUserId}/votecount`);
            }
            setRerenderCounter((prev) => prev + 1);
        } catch (error) {
            console.log("Error on voting", error);
        }
    };
    return (
        <div>
            <div className="dog-img">
                <img src={src} alt="random breed" />
            </div>

            <button
                onClick={handleVote}
                value={breedName}
            >{`Vote for ${breedName}!`}</button>
        </div>
    );
}
