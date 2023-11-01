import React from "react";

import Favorites from "@modules/Favorites";
import Navigation from "@modules/Navigation";
import Peoples from "@modules/Peoples";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} />
      <Route path="/peoples" element={<Peoples />} />
      <Route path="/peoples/:id" element={<Peoples />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<Navigation />} />
    </Routes>
  );
};
export default AppRouter;
