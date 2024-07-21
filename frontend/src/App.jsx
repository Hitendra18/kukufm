import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AudiobookPage from "./pages/AudiobookPage";
import SearchQueryProvider from "./contexts/SearchQueryProvider";

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
