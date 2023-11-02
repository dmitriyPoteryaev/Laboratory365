import { PeopleAPI } from "@api/getPeople";
import { makeObservable, observable } from "mobx";

const { getPeople } = PeopleAPI;
class PeopleStore {
  gettedPeopleStore: any;

  getDataAboutPeople = async (page: string) => {
    try {
      const response = await getPeople(page);
      if (typeof response !== "object") {
        throw Error(response);
      }

      return response;
    } catch (err: any) {
      return err.message;
    }
  };

  constructor() {
    makeObservable(this, {
      gettedPeopleStore: observable,
    });
    this.gettedPeopleStore = {};
  }
}

export { PeopleStore };
