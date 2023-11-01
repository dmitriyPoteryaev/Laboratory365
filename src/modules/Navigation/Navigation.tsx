import React from "react";

import GenericHeader from "@shared/components/GenericHeader";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <GenericHeader>
        <Button
          style={{ color: "white" }}
          onClick={() => navigate("/peoples")}
          type="text"
        >
          Peoples
        </Button>
        <Button
          style={{ color: "white" }}
          onClick={() => navigate("/favorites")}
          type="text"
        >
          Favorites
        </Button>
      </GenericHeader>
    </>
  );
};
export default Navigation;
