import { getArrayWithFavoriteFilmsFromLocalStorage } from "./getArrayWithFavoriteFilmsFromLocalStorage";
import { InfoAboutSpecificPerson } from "../api/peopleApi/typesPeopleApi";

export const mapInfoPeopleArrayToTableArray = (FuLLInfo: any) => {
  const favoritToArray = getArrayWithFavoriteFilmsFromLocalStorage();

  const ArrayWitFavotitesNames: string[] =
    favoritToArray?.map((elem: any) => elem.name) || [];

  return FuLLInfo?.map(
    (objectInfoAboutPerson: InfoAboutSpecificPerson, i: number) => {
      const IsPersoneFavorite = ArrayWitFavotitesNames.find(
        (elem: string) => elem === objectInfoAboutPerson.name,
      );

      return {
        name: objectInfoAboutPerson?.name,
        height: objectInfoAboutPerson?.height,
        mass: objectInfoAboutPerson?.mass,
        hair_color: objectInfoAboutPerson?.hair_color,
        status: IsPersoneFavorite ? "Удалить" : "Добавить",
        key: i,
      };
    },
  );
};
