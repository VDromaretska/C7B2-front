import Header from "./Header";
import Footer from "./Footer";
import VotePicker from "./VotePicker";
import LeaderBoard from "./LeaderBoard";
import "./App.css";

export const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://c7b2-dogapp.onrender.com"
        : "http://localhost:4000";

function App() {
    return (
        <div className="App">
            <Header />
            <VotePicker />
            <LeaderBoard />
            <Footer />
        </div>
    );
}

export default App;
