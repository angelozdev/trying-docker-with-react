import { UserList } from "./features/users/components";
import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages";

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}

function App() {
  return (
    <div className="p-4">
      <div className="container">
        <h1 className="text-4xl my-4 font-semibold">
          Vite + React + Docker + GitHub Actions
        </h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
