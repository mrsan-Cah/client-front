import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <RoutesConfig />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
