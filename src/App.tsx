import { RoutesContainer } from "./routes/routes";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <RoutesContainer/>
    </GlobalProvider>
  );
}

export default App;
