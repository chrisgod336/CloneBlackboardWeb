import { RoutesContainer } from "./routes/routes";
import { GlobalProvider } from "./context/GlobalContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'F5') || (e.key === 'r' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        window.location.href = window.location.href;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <GlobalProvider>
      <RoutesContainer />
    </GlobalProvider>
  );
}

export default App;
