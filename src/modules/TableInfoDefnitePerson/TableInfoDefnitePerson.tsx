import React, { useState, useEffect } from "react";

import { DefinitePersonAPI } from "@api/getInfoAboutDedenitePerson";
import Error from "@modules/Error";
import Loader from "@modules/Loader";
import GenericHeader from "@shared/components/GenericHeader";
import { addOrRemoveDataFromLocalStorage } from "@utils/addOrRemoveDataFromLocalStorage";
import { mapInfoPeopleArrayToTableArray } from "@utils/mapInfoPeopleArrayToTableArray";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

import useFetching from "../../hooks/useFetching";
import { RowInTablePeople } from "../Peoples/typesInPeoplesPage";

const TableInfoDefnitePerson: React.FC = () => {
  const [definitePerson, setDefenitePerson] = useState<RowInTablePeople[]>([]);

  const { getInfoAboutDedenitePerson } = DefinitePersonAPI;

  const handler = (record: RowInTablePeople) => {
    const currentStatus = record.status === "Удалить" ? "Добавить" : "Удалить";
    setDefenitePerson((prevState: RowInTablePeople[]) => {
      return [
        {
          ...prevState[0],
          status: currentStatus,
        },
      ];
    });

    addOrRemoveDataFromLocalStorage(record.status, record);
  };

  const [fetching, isLoading, error]: [Function, boolean, string] = useFetching(
    getInfoAboutDedenitePerson,
  );

  const navigate = useNavigate();

  useEffect(() => {
    const aa = window.location.pathname.split(":");

    const id = aa[aa.length - 1];

    fetching(id).then((res: any) => {
      setDefenitePerson([res]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          record.status === "Добавить" && (
            <Button
              type="primary"
              danger={record.status === "Удалить" ? true : false}
              onClick={() => {
                handler(record);
              }}
            >
              {record.status}
            </Button>
          )
        );
      },
    },
  ];

  if (isLoading) {
    return <Loader description="Ожидайте..." />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const ArrayWithInfoAboutDefinitePerson =
    mapInfoPeopleArrayToTableArray(definitePerson);
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
        columns={columns}
        dataSource={ArrayWithInfoAboutDefinitePerson}
        pagination={false}
      />
    </>
  );
};

export default TableInfoDefnitePerson;
