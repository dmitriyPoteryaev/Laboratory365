import axios from "axios";

const url = "https://swapi.dev/api/";

const getPeople = async (page: string) => {
  try {
    const response = await axios.get(url + "people/?page=" + page);

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

export const PeopleAPI = {
  getPeople,
};
