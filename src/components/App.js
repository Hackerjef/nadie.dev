import { Routes, Route } from 'react-router-dom';
import Main from "./Main"
import StreamBackground from "./StreamBackground"


const App = () => (
    <Routes>
        <Route exact path="/streambackground" element={<StreamBackground />} />
        <Route exact path="/" element={<Main />} />
    </Routes >
)

export default App;
