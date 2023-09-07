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
    return (
        <div className="App">
            <UserAccount
                currentUserId={currentUserId}
                setCurrentUserId={setCurrentUserId}
            />
            <Header />
            <VotePicker currentUserId={currentUserId} />
            <LeaderBoard />
            <Footer />
        </div>
    );
}

export default App;
