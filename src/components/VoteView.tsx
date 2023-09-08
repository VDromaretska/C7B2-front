import axios from "axios";
import extractBreedName from "../utils/extractBreedName";
import { baseURL } from "./App";

interface VoteViewProps {
    src: string;
    createImgData: () => Promise<void>;
    currentUserId: string;
    setContainerHeight: (nr: string) => void;
    containerHeight: string;
}

export function VoteView({
    src,
    createImgData,
    currentUserId,
    setContainerHeight,
    containerHeight,
}: VoteViewProps): JSX.Element {
    const breedName = extractBreedName(src as string);
    const updateContainerHeight = () => {
        setContainerHeight("auto");
    };
    const handleVote = async () => {
        try {
            setContainerHeight("auto");
            await axios.put(baseURL + "/votes/" + breedName, {
                breed: breedName,
            });
            if (currentUserId !== "") {
                await axios.put(`${baseURL}/users/${currentUserId}/votecount`);
            }
            await createImgData();
            updateContainerHeight();
        } catch (error) {
            console.log("Error on voting", error);
        }
    };
    const handleImgLoad = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        const imgHeight = event.currentTarget.clientHeight;
        if (
            imgHeight < parseInt(containerHeight) ||
            containerHeight === "auto"
        ) {
            console.log("Updating container height to", imgHeight);
            setContainerHeight(imgHeight.toString());
        }
    };
    const containerStyle = { height: `${containerHeight}px` };

    return (
        <div className="vote-view">
            <img
                style={containerStyle}
                className="dog-img"
                src={src}
                alt="random breed"
                onLoad={(event) => handleImgLoad(event)}
            />
            <button
                onClick={handleVote}
                value={breedName}
            >{`Vote for ${breedName}!`}</button>
        </div>
    );
}
