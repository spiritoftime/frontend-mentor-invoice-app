import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/sharedLayout/NavBar";
import InvoiceTab from "./components/Invoices Page/InvoiceTab";
import Invoices from "./components/Invoices Page/Invoices";
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Invoices />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
