import { SpecificPeopleAPI } from "@api/getSpecificPeopleBySerachQuery";
import { mapListSpecificPeopleToNameArray } from "@utils/mapListSpecificPeopleToNameArray";
import { makeObservable, action, observable } from "mobx";

const { getSpecificPeopleBySerachQuery } = SpecificPeopleAPI;
class SpecificPeopleByQueryStore {
  isLoading: boolean = true;
  error: string = "";
  listPeople: any = [];

  getDataAboutSpecificPeopleByQuery = async (query: string, signal: any) => {
    try {
      this.isLoading = true;
      const response = await getSpecificPeopleBySerachQuery(query, signal);
      if (typeof response !== "object") {
        throw Error(response);
      }

      const { results } = response;

      const nameArray = mapListSpecificPeopleToNameArray(results);

      this.listPeople = nameArray;
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.isLoading = false;
    }
  };

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      listPeople: observable,
      getDataAboutSpecificPeopleByQuery: action,
    });
  }
}

export { SpecificPeopleByQueryStore };
