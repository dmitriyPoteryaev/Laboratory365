export const mapInfoPeopleArrayToTableArray = (FuLLInfo: any) => {
  const favoritesPersons: any = localStorage.getItem("favorites");

  const favoritToArray: any = JSON.parse(favoritesPersons);

  const ArrayWitFavotitesNames =
    favoritToArray?.map((elem: any) => elem.name) || [];

  return FuLLInfo?.map((objectInfoAboutPerson: any, i: number) => {
    const IsPersoneFavorite = ArrayWitFavotitesNames?.find(
      (elem: any) => elem === objectInfoAboutPerson.name,
    );

    return {
      name: objectInfoAboutPerson?.name,
      height: objectInfoAboutPerson?.height,
      mass: objectInfoAboutPerson?.mass,
      hair_color: objectInfoAboutPerson?.hair_color,
      status: IsPersoneFavorite ? "Удалить" : "Добавить",
      key: i,
    };
  });
};
