import { Routes, Route } from 'react-router-dom';
import Main from "./Main";
import StreamBackground from "./StreamBackground";
import Merp from "./Merp";


const App = () => (
    <Routes>
        <Route exact path="/streambackground" element={<StreamBackground />} />
        <Route exact path="/" element={<Merp />} />
        <Route exact path="/merp" element={<Main />} />
    </Routes >
)

export default App;
