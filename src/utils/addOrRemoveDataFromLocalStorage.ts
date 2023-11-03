import { getArrayWithFavoriteFilmsFromLocalStorage } from "./getArrayWithFavoriteFilmsFromLocalStorage";

export const addOrRemoveDataFromLocalStorage = (
  status: string,
  infoAboutFavoritePerson: any,
) => {
  const { name } = infoAboutFavoritePerson;

  const favoritToArray = getArrayWithFavoriteFilmsFromLocalStorage();

  if (!favoritToArray || favoritToArray.length === 0) {
    const arr: any = [infoAboutFavoritePerson];

    localStorage.setItem("favorites", JSON.stringify(arr));
  } else {
    if (status === "Удалить") {
      const favoritiesPersonsWithoutDefinite =
        favoritToArray.filter((elem: any) => elem.name !== name) || [];

      localStorage.setItem(
        "favorites",
        JSON.stringify([...favoritiesPersonsWithoutDefinite]),
      );
    } else {
      const arr: any = [...favoritToArray, infoAboutFavoritePerson];

      localStorage.setItem("favorites", JSON.stringify(arr));
    }
  }
};
