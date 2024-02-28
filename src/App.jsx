import PublicRouter from "./routers/PublicRouter";
import { SocketProvider } from "./context/SocketContext";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {

  const { user } = useContext(AuthContext)
  
  return (
      <SocketProvider user={user}>
        <PublicRouter />
      </SocketProvider>
  );
}

export default App;
