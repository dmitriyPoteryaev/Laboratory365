import { PeopleAPI } from "@api/peopleApi/getPeople";
import { addOrRemoveDataFromLocalStorage } from "@utils/addOrRemoveDataFromLocalStorage";
import { changeStatusButtonInTable } from "@utils/changeStatusButtonInTable";
import { makeAutoObservable } from "mobx";

import { RowInTablePeople } from "../modules/Peoples/typesInPeoplesPage";

const { getPeople } = PeopleAPI;
class PeopleStore {
  nextPage: string | null = "2";
  prevPage: string | null = null;
  currentListOfPeople: any = [];

  getDataAboutPeople = async (page: string) => {
    try {
      const response = await getPeople(page);

      const { next, previous, results } = response;

      this.currentListOfPeople = results;
      this.nextPage = next;
      this.prevPage = previous;

      if (typeof response !== "object") {
        throw Error(response);
      }
      return response;
    } catch (err: any) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  };

  ChangeStateCurrentPeople = (changinRow: RowInTablePeople) => {
    this.currentListOfPeople = changeStatusButtonInTable(
      this.currentListOfPeople,
      changinRow,
    );

    addOrRemoveDataFromLocalStorage(changinRow.status, changinRow);
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export { PeopleStore };
