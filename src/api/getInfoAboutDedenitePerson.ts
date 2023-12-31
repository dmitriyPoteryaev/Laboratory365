import axios from "axios";

export const url = "https://swapi.dev/api/";

const getInfoAboutDedenitePerson = async (id: string) => {
  try {
    const response = await axios.get(url + "people/" + id + "/");

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

export const DefinitePersonAPI = {
  getInfoAboutDedenitePerson,
};
