import { RowInTablePeople } from "../modules/Peoples/typesInPeoplesPage";

export const changeStatusButtonInTable = (
  ArrayWithPeopleInSpecificPage: any,
  changinRow: RowInTablePeople,
) => {
  return {
    ...ArrayWithPeopleInSpecificPage,
    results: ArrayWithPeopleInSpecificPage.results.map(
      (elem: RowInTablePeople) => {
        if (elem.name === changinRow.name) {
          const currentStatus =
            elem.status === "Удалить" ? "Добавить" : "Удалить";
          return { ...elem, status: currentStatus };
        } else {
          return elem;
        }
      },
    ),
  };
};
