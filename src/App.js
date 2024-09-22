import GameContainer from "./components/GameContainer/GameContainer";
import Footer from "./components/Footer/Footer";
import Topbar from "./components/Topbar/Topbar";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-between items-center">
      <Topbar />
      <GameContainer />
      <Footer />
    </div>
  );
}

export default App;
