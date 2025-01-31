import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { Toaster } from "sonner";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import Chat from "./pages/Chat";
import NewChat from "./pages/NewChat";

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/" element={<NewChat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}></Route>
        <Route path="*" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
