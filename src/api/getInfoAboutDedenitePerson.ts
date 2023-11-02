import axios from "axios";

const getInfoAboutDedenitePerson = async (id: string) => {
  try {
    const response = await axios.get(
      "https://swapi.dev/api/people/" + id + "/",
    );

    if (response.status !== 200) {
      throw Error("Что пошло не так! Перезагрузите страницу");
    }
    return response.data;
  } catch (err: any) {
    return err.message;
  }
};

export const DefinitePersonAPI = {
  getInfoAboutDedenitePerson,
};
