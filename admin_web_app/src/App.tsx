import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginScreen from "./screens/Login/Login";
import HomeScreen from "./screens/Home/Home";
import RootLayout from "./components/Layout/RootLayout";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <ToastContainer
        position="bottom-right"
        progressStyle={{
          backgroundColor: "rgba(var(--color-dark), 1)",
        }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
