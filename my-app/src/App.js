import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/sharedLayout/NavBar";
import InvoiceTab from "./components/Invoices Page/InvoiceTab";
import Invoices from "./components/Invoices Page/Invoices";
import theme from "./chakraUI themes/theme";
import NewInvoice from "./components/Invoice Page/NewInvoice";
import Login from "./components/Login page/Login";
import ProtectedRoute from "./components/sharedLayout/ProtectedRoute";
import ViewInvoice from "./components/ViewInvoice page/ViewInvoice";
import EditInvoice from "./components/Invoice Page/EditInvoice";
function App() {
  const { invoiceId } = useParams();
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/frontend-mentor-invoice-app/" element={<Login />} />
          <Route path="/invoices">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              }
            />
            <Route
              path=":invoiceId"
              element={
                <ProtectedRoute>
                  <ViewInvoice />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="edit/:invoiceId"
              element={
                <ProtectedRoute>
                  <EditInvoice />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
          <Route
            path="/new-invoice"
            element={
              <ProtectedRoute>
                <NewInvoice />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
