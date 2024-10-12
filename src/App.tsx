import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./index.css"
import AppContainer from "./components/AppContainer.tsx";

function App() {

    return (
        <div className="app">
            <NavBar/>
            <AppContainer/>
            <Footer/>
        </div>
    )
}

export default App
