// components
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useEffect } from "react";
import { useGlobalContext } from "./context";

function App() {
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
