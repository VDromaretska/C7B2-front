import Header from "./Header";
import Footer from "./Footer";
import VotePicker from "./VotePicker";
import LeaderBoard from "./LeaderBoard";
import "./App.css";

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
