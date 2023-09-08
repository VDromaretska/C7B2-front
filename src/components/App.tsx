import Header from "./Header";
import Footer from "./Footer";
import VotePicker from "./VotePicker";
import LeaderBoard from "./LeaderBoard";
import "./App.css";
import { useState } from "react";
import UserAccount from "./UserAccount";

export const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://c7b2-dogapp.onrender.com"
        : "http://localhost:4000";

function App() {
    const [currentUserId, setCurrentUserId] = useState("");
    const [rerenderCounter, setRerenderCounter] = useState(0);
    return (
        <div className="App">
            <UserAccount
                currentUserId={currentUserId}
                setCurrentUserId={setCurrentUserId}
                rerenderCounter={rerenderCounter}
            />
            <Header />
            <VotePicker
                currentUserId={currentUserId}
                setRerenderCounter={setRerenderCounter}
            />
            <LeaderBoard />
            <Footer />
        </div>
    );
}

export default App;
