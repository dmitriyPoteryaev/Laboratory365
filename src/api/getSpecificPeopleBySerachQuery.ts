import axios from "axios";

import { url } from "./getInfoAboutDedenitePerson";

const getSpecificPeopleBySerachQuery = async (
  searchQuery: string,
  signal: any,
) => {
  try {
    const response = await axios.get(url + "/people/?search=" + searchQuery, {
      signal: signal,
    });

    if (response.status !== 200) {
      throw Error("Что пошло не так! Перезагрузите страницу");
    }

    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
  }
};

export const SpecificPeopleAPI = {
  getSpecificPeopleBySerachQuery,
};
