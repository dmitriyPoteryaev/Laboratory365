export const getArrayWithFavoriteFilmsFromLocalStorage = () => {
  const favoritesPersons: string | null = localStorage.getItem("favorites");

  if (typeof favoritesPersons === "string") {
    const favoritToArray: any = JSON.parse(favoritesPersons);

    return favoritToArray;
  }

  return [];
};
