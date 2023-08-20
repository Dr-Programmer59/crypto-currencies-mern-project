
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Headers from "./Components/Headers";
import Home from "./Components/Home";
import Coins from "./Components/Coins";
import CoinDetails from "./Components/CoinDetails";
import Exchange from "./Components/Exchange";
function App() {
  return (
   <Router>
    <Headers/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/coins" element={<Coins/>}/>
      <Route path="/exchange" element={<Exchange/>}/>
      <Route path="/coin/:id" element={<CoinDetails/>}/>

    </Routes>
   </Router>
  );
}

export default App;
