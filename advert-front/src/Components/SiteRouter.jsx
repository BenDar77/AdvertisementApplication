import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../LoginRegister/Login";
import AdvertList from "./AdvertList";
import Register from "../LoginRegister/Register";
import AdminAddAdvert from "./AdminAddAdvert";
import AdminAddCategory from "./AdminAddCategory";
import LinkAdvertToCategory from "./LinkAdvertToCategory";

const SiteRouter = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adverts" element={<AdvertList />} />
        <Route path="/addAdvert" element={<AdminAddAdvert/>}/>
        <Route path="/addCategory" element={<AdminAddCategory/>}/>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/linkAdvert" element={<LinkAdvertToCategory/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default SiteRouter;
