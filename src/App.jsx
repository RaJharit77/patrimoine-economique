import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import PossessionsTable from "./components/PossessionsTables";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestion du Patrimoine</h1>
      </header>
      <main>
        <PossessionsTable />
      </main>
    </div>
  );
}

export default App;
