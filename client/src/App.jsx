import { BrowserRouter , Routes , Route} from "react-router-dom"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import NFP from "./Pages/NFP"
import Signup from "./Pages/Signup"
import Chat from "./Pages/Chat"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/*" element={<NFP/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
