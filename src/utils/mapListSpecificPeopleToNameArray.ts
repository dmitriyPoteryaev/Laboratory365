import { InfoAboutSpecificPerson } from "../api/peopleApi/typesPeopleApi";
export const mapListSpecificPeopleToNameArray = (
  arr: InfoAboutSpecificPerson[],
) => {
  return arr.map((elem: InfoAboutSpecificPerson) => {
    const splitUrlToArray: string[] = elem.url.split("/");
    const lenghArray = splitUrlToArray.length;
    const id = splitUrlToArray[lenghArray - 2];

    return { name: elem.name, id: id };
  });
};
