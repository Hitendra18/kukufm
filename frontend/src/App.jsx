import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AudiobookPage from "./pages/AudiobookPage";
import SearchQueryProvider from "./contexts/SearchQueryProvider";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="custom-body-bg min-h-screen flex flex-col">
      <Routes>
        <Route
          index
          path="/"
          element={
            <SearchQueryProvider>
              <HomePage />
            </SearchQueryProvider>
          }
        />
        <Route
          index
          path="/search"
          element={
            <SearchQueryProvider>
              <SearchPage />
            </SearchQueryProvider>
          }
        />
        <Route
          index
          path="/audiobook/:id"
          element={
            <SearchQueryProvider>
              <AudiobookPage />
            </SearchQueryProvider>
          }
        />
      </Routes>
      <Toaster toastOptions={{ duration: 1500 }} />
    </div>
  );
};
export default App;
