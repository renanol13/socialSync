import PublicRouter from "./routers/PublicRouter";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
        <PublicRouter />
    </AuthProvider>
  );
}

export default App;
