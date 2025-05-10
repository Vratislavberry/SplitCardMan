import Container from "react-bootstrap/Container";

import { Outlet } from "react-router-dom";
import NavBar from "./navbar";

function Layout() {
  return (
    <>
      <NavBar />
      <Container fluid className="p-0">
        <div className="mt-56">
          <Outlet />  {/* Outlet se nahradi vnorenym kodem podle zvolene router v app.jsx */}
        </div>
      </Container>
    </>
  );
}

export default Layout;
