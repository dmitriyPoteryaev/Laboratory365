import React, { useEffect, useState } from "react";

import { addOrRemoveDataFromLocalStorage } from "@utils/addOrRemoveDataFromLocalStorage";

import Error from "@modules/Error";
import Loader from "@modules/Loader";
import { peopleStore } from "@store/index";
import { observer } from "mobx-react-lite";

import TablePeople from "./components/TablePeople";
import useFetching from "../../hooks/useFetching";

let counter = 0;

const Peoples: React.FC = observer(() => {
  const { getDataAboutPeople } = peopleStore;

  const [numberPage, setNumberPage] = useState<string>("1");

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

  counter++;

  console.log("Main", counter);

  if (isLoading) {
    return <Loader description="Ожидайте..." />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <TablePeople
        data={gettedInfoAboutPeopleWithDenifePage}
        numberPage={numberPage}
        setGettedInfoAboutPeopleWithDenifePage={handler}
      />
      <button
        onClick={() => {
          setNumberPage("2");
        }}
      >
        {" "}
        Всё меняем
      </button>

      <button
        onClick={() => {
          setNumberPage("1");
        }}
      >
        {" "}
        Обратно
      </button>
    </>
  );
});
export default Peoples;
