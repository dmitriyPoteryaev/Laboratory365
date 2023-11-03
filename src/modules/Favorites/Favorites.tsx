import React, { useState } from "react";

import GenericHeader from "@shared/components/GenericHeader";
import { addOrRemoveDataFromLocalStorage } from "@utils/addOrRemoveDataFromLocalStorage";
import { getArrayWithFavoriteFilmsFromLocalStorage } from "@utils/getArrayWithFavoriteFilmsFromLocalStorage";
import { mapInfoPeopleArrayToTableArray } from "@utils/mapInfoPeopleArrayToTableArray";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

import {
  LoaderContainer,
  InnerLoaderContainer,
  DescriptionContainer,
} from "../Loader/Loader";
import { RowInTablePeople } from "../Peoples/typesInPeoplesPage";

const Favorites: React.FC = () => {
  const navigate = useNavigate();

  const favoritToArray = getArrayWithFavoriteFilmsFromLocalStorage();

  const [favoritePerosnPerson, setDefenitePerson] =
    useState<RowInTablePeople[]>(favoritToArray);

  const handler = (record: RowInTablePeople) => {
    setDefenitePerson((prevState: RowInTablePeople[]) => {
      return prevState.filter(
        (elem: RowInTablePeople) => elem.name !== record.name,
      );
    });

    addOrRemoveDataFromLocalStorage(record.status, record);
  };

  const columns: ColumnsType<RowInTablePeople> = [
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
    return (
      <>
        <GenericHeader>
          <Button
            style={{ color: "white" }}
            onClick={() => navigate(-1)}
            type="text"
          >
            Back
          </Button>
        </GenericHeader>
        <LoaderContainer>
          <InnerLoaderContainer>
            <DescriptionContainer>
              You don't have favorite films
            </DescriptionContainer>
          </InnerLoaderContainer>
        </LoaderContainer>
      </>
    );
  }

  const ArrayWithInfoAboutFavoritePerson =
    mapInfoPeopleArrayToTableArray(favoritePerosnPerson);

  return (
    <>
      <GenericHeader>
        <Button
          style={{ color: "white" }}
          onClick={() => navigate(-1)}
          type="text"
        >
          Back
        </Button>
      </GenericHeader>
      <Table
        scroll={{ x: 500 }}
        columns={columns}
        dataSource={ArrayWithInfoAboutFavoritePerson}
        pagination={false}
      />
    </>
  );
};

export default Favorites;
