import React, { useState } from "react";

import { addOrRemoveDataFromLocalStorage } from "@utils/addOrRemoveDataFromLocalStorage";
import { mapInfoPeopleArrayToTableArray } from "@utils/mapInfoPeopleArrayToTableArray";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

const Favorites = () => {
  const favoritesPersons: any = localStorage.getItem("favorites");

  const favoritToArray: any = JSON.parse(favoritesPersons);

  const [favoritePerosnPerson, setDefenitePerson] =
    useState<any>(favoritToArray);

  const handler = (record: any) => {
    setDefenitePerson((prevState: any) => {
      return prevState.filter((elem: any) => elem.name !== record.name);
    });

    addOrRemoveDataFromLocalStorage(record.status, record);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "Height",
    },
    {
      title: "Mass",
      dataIndex: "mass",
      key: "mass",
    },
    {
      title: "Hair color",
      dataIndex: "hair_color",
      key: "hair_color",
    },
    {
      title: "Add or remove favorite hero",
      key: "actions",
      render: (record) => {
        return (
          <Button
            type="primary"
            danger={record.status === "Удалить" ? true : false}
            onClick={() => {
              handler(record);
            }}
          >
            {record.status}
          </Button>
        );
      },
    },
  ];

  if (favoritePerosnPerson?.length === 0 || favoritToArray === null) {
    return <div> You don't have favorite films</div>;
  }

  const ArrayWithInfoAboutFavoritePerson =
    mapInfoPeopleArrayToTableArray(favoritePerosnPerson);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={ArrayWithInfoAboutFavoritePerson}
        pagination={false}
      />
    </div>
  );
};

export default Favorites;
