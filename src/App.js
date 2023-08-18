// React Router v2
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Home from "./pages/Home.js";
import MyItems from "./pages/MyItems.js";
import AddItem from "./pages/AddItem.js";

import { RequireAuth } from "./context/requireAuth.js";

function App() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/myitems">My Items</Link>
      <Link to="/additem">Add Item</Link>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/myitems"
          element={
            <RequireAuth>
              <MyItems />
            </RequireAuth>
          }
        />
        <Route
          path="/addItem"
          element={
            <RequireAuth>
              <AddItem />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

// function App() {
//     return (
//       <div>
//         <Routes>
//           <Route exact path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </div>
//     );
//   }

export default App;

// React Bootstrap Navbar, Style not done
/* 
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

<Navbar expand="lg" style={{ backgroundColor: "#fa5b5a" }}>
<Container className="navBarContent">
  <Navbar.Brand
    href="#home"
    style={{ fontWeight: "500", color: "#ffffff" }}
  >
    The Best Online MarketPlace
  </Navbar.Brand>
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar> */
