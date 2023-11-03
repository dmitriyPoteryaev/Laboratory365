export type RowInTablePeople = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  status: "Удалить" | "Добавить";
  key: number;
};
export type AllInfoForPeoplePage = {
  next: string;
  previous: string;
  results: Array<RowInTablePeople>;
};
