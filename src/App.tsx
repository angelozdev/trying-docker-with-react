import { UserList } from "./features/users/components";

function App() {
  return (
    <div className="p-4">
      <div className="container">
        <h1 className="text-4xl my-4 font-semibold">Vite + React + Docker</h1>
        <UserList />
      </div>
    </div>
  );
}

export default App;
