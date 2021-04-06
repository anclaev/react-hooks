import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <Home />
      </div>
    </>
  );
};

export default App;
