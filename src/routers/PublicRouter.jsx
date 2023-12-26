import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Conteiner from "../layout/Conteiner";
import Navbar from "../layout/Navbar";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import Friends from "../pages/Friends";

export default function PublicRouter() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<AuthRouter />}>
            <Route index element={<Conteiner> <Home /> </Conteiner>}/>
            <Route path="/profile" element={<Conteiner><Profile/></Conteiner>} />
            <Route path="/search" element={<Conteiner><Search/></Conteiner>} />
            <Route path="/friends" element={<Conteiner><Friends/></Conteiner>} />
          </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}
