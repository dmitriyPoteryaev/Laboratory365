import React, { useEffect } from "react";

import Error from "@modules/Error";
import Loader from "@modules/Loader";
import CustomSelect from "@modules/Peoples/components/CustomSelect";
import GenericHeader from "@shared/components/GenericHeader";
import Pagination from "@shared/components/Pagination";
import { peopleStore } from "@store/index";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import TablePeople from "./components/TablePeople";
import useFetching from "../../hooks/useFetching";

const Peoples: React.FC = observer(() => {
  const page: any = new URLSearchParams(window.location.search).get("page");

  const {
    getDataAboutPeople,
    nextPage,
    prevPage,
    currentListOfPeople,
    ChangeStateCurrentPeople,
  } = peopleStore;

  const navigate = useNavigate();

  const [fetching, isLoading, error]: [Function, boolean, string] =
    useFetching(getDataAboutPeople);

  useEffect(() => {
    fetching(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (isLoading) {
    return <Loader description="Ожидайте..." />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <GenericHeader>
        <Button
          style={{ color: "white" }}
          onClick={() => navigate(-1)}
          type="text"
        >
          Back
        </Button>
        <Button
          style={{ color: "white" }}
          onClick={() => navigate("/favorites")}
          type="text"
        >
          Favorites
        </Button>
      </GenericHeader>
      <CustomSelect />
      <TablePeople
        data={currentListOfPeople}
        functionForChangeData={ChangeStateCurrentPeople}
      />
      <Pagination next={nextPage} prev={prevPage} />
    </>
  );
});
export default Peoples;
