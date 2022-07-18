import './App.scss';

import {
    Routes,
    Route,
} from "react-router-dom";

// Partials
import Header from "./components/Header";
// Pages
import Home from "./pages/Home";
import Database from './pages/Database';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/database" element={<Database />} />
            </Routes>
        </div>
    );
}

export default App;
