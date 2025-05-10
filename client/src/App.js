import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./components/dashboard/dashboard";
import CategoryList from "./components/groupDetail/groupDetail";

function App() {
  /*alt+shift+f = zarovnani*/
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/groupDetail" element={<CategoryList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
