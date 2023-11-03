import { PeopleAPI } from "@api/peopleApi/getPeople";
import { action, makeObservable } from "mobx";

const { getPeople } = PeopleAPI;
class PeopleStore {
  getDataAboutPeople = async (page: string) => {
    try {
      const response = await getPeople(page);
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

  constructor() {
    makeObservable(this, {
      getDataAboutPeople: action,
    });
  }
}

export { PeopleStore };
