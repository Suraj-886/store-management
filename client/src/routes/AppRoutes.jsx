import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ForgetPage from "../pages/ForgetPage";
import Dashboard from "../pages/DashboardPage";
import ProductPage from "../pages/ProductPage";
import Layout from "../layouts/layout";
import OrderPage from "../pages/OrderPage";
import { CreateProductPage } from "../pages/CreateProductPage";
import { AdminProvider } from "../context/AdminProvider";
import { CreateOrderPage } from "../pages/CreateOrderPage";
import { LoaderProvider } from "../context/LoaderProvider";

const AppRoutes = () => {
  return (
    <Router>
      <LoaderProvider>
        <AdminProvider>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
             <Route path="/forget" element={<ForgetPage />} />
            {/* <Route path="/dashboard" element={< Dashboard/>} /> */}
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="orders" element={<OrderPage />} />
              <Route path="product/create" element={<CreateProductPage />} />
              <Route path="order/create" element={<CreateOrderPage />} />
            </Route>
          </Routes>
        </AdminProvider>
      </LoaderProvider>
    </Router>
  );
};

export default AppRoutes;
