import axios from "axios";
import { baseURL } from "./App";
import { useEffect, useState } from "react";
import { Top3Breeds } from "./Top3Breeds";

export interface Leaderboard {
    breed: string;
    votes: number;
}

export default function LeaderBoard(): JSX.Element {
    const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);

    useEffect(() => {
        getLeaderboardInfo();
    }, []);

    async function getLeaderboardInfo() {
        try {
            const response = await axios.get(`${baseURL}/votes/leaderboard`);
            const result = response.data;
            setLeaderboard(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2> Top Dog Breeds </h2>
            <table>
                <thead>
                    <tr>
                        <th>Breed</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((breed) => {
                        return (
                            <tr key={breed.breed}>
                                <td>
                                    {breed.breed.toUpperCase().slice(0, 1)}
                                    {breed.breed.toLowerCase().slice(1)}
                                </td>
                                <td>{breed.votes}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={getLeaderboardInfo}>Refresh table</button>
            <Top3Breeds podium={leaderboard.slice(0, 3)} />
        </div>
    );
}
