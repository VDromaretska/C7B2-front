import Header from "./Header";
import Footer from "./Footer";
import VotePicker from "./VotePicker";
import LeaderBoard from "./LeaderBoard";
import "./App.css";
import { useState } from "react";

export const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://c7b2-dogapp.onrender.com"
        : "http://localhost:4000";

function App() {
    const [rerenderCounter, setRerenderCounter] = useState(0);
    return (
        <div className="App">
            <Header />
            <VotePicker
                rerenderCounter={rerenderCounter}
                setRerenderCounter={setRerenderCounter}
            />
            <LeaderBoard
                rerenderCounter={rerenderCounter}
                setRerenderCounter={setRerenderCounter}
            />
            <Footer />
        </div>
    );
}

export default App;
