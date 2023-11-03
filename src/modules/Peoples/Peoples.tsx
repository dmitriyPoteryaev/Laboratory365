import React, { useEffect, useState } from "react";

import Error from "@modules/Error";
import Loader from "@modules/Loader";
import CustomSelect from "@modules/Peoples/components/CustomSelect";
import GenericHeader from "@shared/components/GenericHeader";
import Pagination from "@shared/components/Pagination";
import { peopleStore } from "@store/index";
import { addOrRemoveDataFromLocalStorage } from "@utils/addOrRemoveDataFromLocalStorage";
import { changeStatusButtonInTable } from "@utils/changeStatusButtonInTable";
import { getNumberPageFromURL } from "@utils/getNumberPageFromURL";
import { mapInfoPeopleArrayToTableArray } from "@utils/mapInfoPeopleArrayToTableArray";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TablePeople from "./components/TablePeople";
import { RowInTablePeople, AllInfoForPeoplePage } from "./typesInPeoplesPage";
import useFetching from "../../hooks/useFetching";

const Peoples: React.FC = observer(() => {
  const location = useLocation();

  const { getDataAboutPeople } = peopleStore;

  const [ArrayWithPeopleInSpecificPage, setArrayWithPeopleInSpecificPage] =
    useState<AllInfoForPeoplePage>();

  const navigate = useNavigate();

  const handler = (changinRow: RowInTablePeople) => {
    setArrayWithPeopleInSpecificPage((prevState: any) => {
      return changeStatusButtonInTable(prevState, changinRow);
    });

    addOrRemoveDataFromLocalStorage(changinRow.status, changinRow);
  };

  const [fetching, isLoading, error]: [Function, boolean, string] =
    useFetching(getDataAboutPeople);

  useEffect(() => {
    const { search } = location;

    const currentPage: string = getNumberPageFromURL(search);

    fetching(currentPage).then((res: any) => {
      setArrayWithPeopleInSpecificPage({
        next: res?.next,
        previous: res?.previous,
        results: mapInfoPeopleArrayToTableArray(res?.results),
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
        data={ArrayWithPeopleInSpecificPage}
        functionForChangeData={handler}
      />
      <Pagination data={ArrayWithPeopleInSpecificPage} />
    </>
  );
});
export default Peoples;
