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
import PostPage from "../pages/PostPage";
import FriendsPage from "../pages/FriendsPage";
import Notifications from "../pages/Notifications";

export default function PublicRouter() {
  const date = new Date();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<AuthRouter />}>
          <Route
            index
            element={
              <Conteiner>
                <Home />
              </Conteiner>
            }
          />
          <Route
            path="/profile/:name?"
            element={
              <Conteiner>
                <Profile />
              </Conteiner>
            }
          />
          <Route
            path="/search"
            element={
              <Conteiner>
                <Search />
              </Conteiner>
            }
          />
          <Route
            path="/friendsPage/:name/:selectOption"
            element={
              <Conteiner>
                <FriendsPage />
              </Conteiner>
            }
          />
          <Route
            path="/friends"
            element={
              <Conteiner>
                <Friends />
              </Conteiner>
            }
          />
          <Route
            path="/postPage/:id"
            element={
              <Conteiner>
                <PostPage />
              </Conteiner>
            }
          />
          <Route
            path="/notification"
            element={
              <Conteiner>
                <Notifications />
              </Conteiner>
            }
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
