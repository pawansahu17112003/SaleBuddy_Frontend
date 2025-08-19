import SignIn from "./admin/admin_login/SignIn"
import Dashboard from "./admin/admin_login/Dashboard"
import Home from "./userinterface/screens/Home"
import ProductList from "./userinterface/screens/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import MainProductInfoComponent from "./userinterface/screens/MainProductInfoComponent";
import Cart from "./userinterface/screens/Cart";
import Checkout from "./userinterface/screens/Checkout"
import OrderHistory from "./userinterface/screens/OrderHistory";
function App() {
  return (
    <div style={{ fontFamily: 'Quicksand' }}>
      <Router>
        <Routes>
          <Route element={<SignIn />} path="/signin" />
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<ProductList />} path="/productlist/:searchtext" />
          <Route element={<MainProductInfoComponent />} path="/mainproductinfocomponent/:productdetailsid/:productid" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<Home />} path="/" />
          <Route element={<Checkout />} path="/checkout" />
          <Route element={<OrderHistory />} path="/orderhistory" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;