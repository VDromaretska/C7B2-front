import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "./App";

interface IUser {
    id: number;
    username: string;
    votes: number;
}

interface UserAccountProps {
    setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
    currentUserId: string;
    rerenderCounter: number;
}

export default function UserAccount({
    currentUserId,
    setCurrentUserId,
    rerenderCounter,
}: UserAccountProps): JSX.Element {
    const [loginInput, setLoginInput] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        fetchUsers();
    }, [rerenderCounter]);

    async function fetchUsers() {
        try {
            const response = await axios.get(`${baseURL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddUser = async () => {
        try {
            const response = await axios.post(`${baseURL}/users`, {
                username: loginInput,
            });
            console.log(response);
            fetchUsers();
            setLoginInput("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoginInput = (inputValue: string) => {
        setLoginInput(inputValue);
    };

    const handleUserSelect = (selectedUserId: string) => {
        setCurrentUserId(selectedUserId);
    };

    const currentUser = users.find(
        (user) => user.id === parseInt(currentUserId)
    ) as IUser;

    console.log(currentUserId);
    console.log(currentUser);

    return (
        <>
            <select
                defaultValue=""
                onChange={(e) => handleUserSelect(e.target.value)}
            >
                <option value="" disabled>
                    Select a user
                </option>
                {users.map((user) => {
                    return (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    );
                })}
            </select>
            <input
                type="text"
                placeholder="New user..."
                value={loginInput}
                onChange={(e) => handleLoginInput(e.target.value)}
            ></input>
            <button onClick={handleAddUser}>Add user</button>
            <p>
                {currentUserId === ""
                    ? "Select a user to track your votes"
                    : `Welcome ${currentUser.username}! You have voted ${
                          currentUser.votes
                      } time${currentUser.votes === 1 ? "" : "s"}.`}
            </p>
        </>
    );
}
