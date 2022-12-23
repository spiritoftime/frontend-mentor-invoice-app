import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/sharedLayout/NavBar";
import InvoiceTab from "./components/Invoices Page/InvoiceTab";
import Invoices from "./components/Invoices Page/Invoices";
import theme from "./chakraUI themes/theme";
import EditInvoice from "./components/Invoice Page/EditInvoice";
import Login from "./components/Login page/Login";
import ProtectedRoute from "./components/sharedLayout/ProtectedRoute";
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/invoices"
            element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-invoice"
            element={
              <ProtectedRoute>
                <EditInvoice />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
