import { SpecificPeopleAPI } from "@api/getSpecificPeopleBySerachQuery";
import { mapListSpecificPeopleToNameArray } from "@utils/mapListSpecificPeopleToNameArray";
import { makeObservable, action, observable, runInAction } from "mobx";

const { getSpecificPeopleBySerachQuery } = SpecificPeopleAPI;
class SpecificPeopleByQueryStore {
  isLoading: boolean = true;
  error: string = "";
  listPeople: any = [];

  getDataAboutSpecificPeopleByQuery = async (query: string, signal: any) => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });

      const response = await getSpecificPeopleBySerachQuery(query, signal);
      if (typeof response !== "object") {
        throw Error(response);
      }

      const { results } = response;

      const nameArray = mapListSpecificPeopleToNameArray(results);
      runInAction(() => {
        this.listPeople = nameArray;
      });
    } catch (err: unknown) {
      runInAction(() => {
        if (err instanceof Error) {
          this.error = err.message;
        }
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  ResetToZeroAllState = () => {
    this.isLoading = true;
    this.error = "";
    this.listPeople = [];
  };

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      listPeople: observable,
      getDataAboutSpecificPeopleByQuery: action,
      ResetToZeroAllState: action,
    });
    this.isLoading = true;
    this.error = "";
    this.listPeople = [];
  }
}

export { SpecificPeopleByQueryStore };
