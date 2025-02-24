import Router from "./routes";
import { AuthProvider } from "./providers/auth-provider";
import { UserProvider } from "./providers/user-provider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
