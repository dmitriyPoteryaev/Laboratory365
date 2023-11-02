import React, { useState, useEffect } from "react";

import "./CustomSelect.css";
import { specificPeopleByQueryStore } from "@store/index";
import { Input } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const CustomSelect = observer(() => {
  const { getDataAboutSpecificPeopleByQuery, isLoading, error, listPeople } =
    specificPeopleByQueryStore;

  const [searchValue, setSerchValue] = useState<any>("");

  const navigate = useNavigate();

  const navigateHandler = (id: string) => {
    navigate("/peoples/:" + id);
  };
  useEffect(() => {
    if (!!!searchValue.trim()) {
      return;
    }
    const controller = new AbortController();
    getDataAboutSpecificPeopleByQuery(searchValue, controller.signal);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="CustomSelect">
      <Input
        style={{ margin: "0 0 10px" }}
        placeholder="Search legal cases"
        size="large"
        value={searchValue}
        onChange={(event) => setSerchValue(event.target.value)}
      />
      {!isLoading && !!searchValue.trim() && (
        <div className="CustomLIstForSelect">
          {listPeople.map((elem: any) => (
            <div
              key={elem.name}
              className="CustomLIstForSelect_position"
              onClick={() => {
                navigateHandler(elem.id);
              }}
            >
              {elem.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default CustomSelect;
