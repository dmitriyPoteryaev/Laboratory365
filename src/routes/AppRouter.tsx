import React from "react";

import Favorites from "@modules/Favorites";
import Navigation from "@modules/Navigation";
import Peoples from "@modules/Peoples";
import TableInfoDefnitePerson from "@modules/TableInfoDefnitePerson";
import { Route, Routes } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} />
      <Route path="/peoples" element={<Peoples />} />
      <Route path="/peoples/:id" element={<TableInfoDefnitePerson />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<Navigation />} />
    </Routes>
  );
};
export default AppRouter;
