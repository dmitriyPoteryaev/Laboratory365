import React, { useEffect, useState } from "react";

import Error from "@modules/Error";
import Loader from "@modules/Loader";
import CustomSelect from "@shared/components/CustomSelect";
import GenericHeader from "@shared/components/GenericHeader";
import { peopleStore } from "@store/index";
import { addOrRemoveDataFromLocalStorage } from "@utils/addOrRemoveDataFromLocalStorage";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import TablePeople from "./components/TablePeople";
import useFetching from "../../hooks/useFetching";

const Peoples: React.FC = observer(() => {
  const { getDataAboutPeople } = peopleStore;

  const [numberPage, setNumberPage] = useState<string>("1");

  const navigate = useNavigate();

  const [
    gettedInfoAboutPeopleWithDenifePage,
    setGettedInfoAboutPeopleWithDenifePage,
  ] = useState<any>({});

  const handler = (record: any) => {
    setGettedInfoAboutPeopleWithDenifePage((prevState: any) => {
      return {
        ...prevState,
        [numberPage]: prevState[numberPage].map((elem: any) => {
          if (elem.name === record.name) {
            const currentStatus =
              elem.status === "Удалить" ? "Добавить" : "Удалить";
            return { ...elem, status: currentStatus };
          } else {
            return elem;
          }
        }),
      };
    });

    addOrRemoveDataFromLocalStorage(record.status, record);
  };

  const fetch = async (page: string) => {
    const res = await getDataAboutPeople(page);

    if (typeof res !== "object") {
      throw Error(res);
    }

    const { count, next, previous, results } = res;

    setGettedInfoAboutPeopleWithDenifePage({
      ...gettedInfoAboutPeopleWithDenifePage,
      [numberPage]: results,
    });
  };
  const [fetching, isLoading, error]: [Function, boolean, string] =
    useFetching(fetch);

  useEffect(() => {
    if (gettedInfoAboutPeopleWithDenifePage.hasOwnProperty(numberPage)) {
      return;
    }
    fetching(numberPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberPage]);

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
        data={gettedInfoAboutPeopleWithDenifePage}
        numberPage={numberPage}
        setGettedInfoAboutPeopleWithDenifePage={handler}
      />
    </>
  );
});
export default Peoples;
