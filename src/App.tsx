import { Route, Routes } from "react-router-dom";
import MyBox from "./components/MyBox";
import Navbar from "./components/Navbar";
import { routes } from "./routes";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <MyBox sx={{ p: 4, mt: 4 }}>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MyBox>
    </>
  );
}

export default App;
