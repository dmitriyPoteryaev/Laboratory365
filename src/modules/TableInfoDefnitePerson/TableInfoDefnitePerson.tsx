import React, { useState, useEffect } from "react";

import { DefinitePersonAPI } from "@api/getInfoAboutDedenitePerson";
import Error from "@modules/Error";
import Loader from "@modules/Loader";
import { addOrRemoveDataFromLocalStorage } from "@utils/addOrRemoveDataFromLocalStorage";
import { mapInfoPeopleArrayToTableArray } from "@utils/mapInfoPeopleArrayToTableArray";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

import useFetching from "../../hooks/useFetching";

const TableInfoDefnitePerson = () => {
  const [definitePerson, setDefenitePerson] = useState<any>([]);

  const { getInfoAboutDedenitePerson } = DefinitePersonAPI;

  const handler = (record: any) => {
    const currentStatus = record.status === "Удалить" ? "Добавить" : "Удалить";
    setDefenitePerson((prevState: any) => {
      return [
        {
          ...prevState[0],
          status: currentStatus,
        },
      ];
    });

    addOrRemoveDataFromLocalStorage(record.status, record);
  };

  const fetch = async (id: string) => {
    const res = await getInfoAboutDedenitePerson(id);

    if (typeof res !== "object") {
      throw Error(res);
    }

    setDefenitePerson([res]);
  };

  const [fetching, isLoading, error]: [Function, boolean, string] =
    useFetching(fetch);

  useEffect(() => {
    const aa = location.pathname.split(":");

    const id = aa[aa.length - 1];

    fetching(id);
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
        if (record.status === "Удалить") {
          return <></>;
        }
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

  if (isLoading) {
    return <Loader description="Ожидайте..." />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const ArrayWithInfoAboutDefinitePerson =
    mapInfoPeopleArrayToTableArray(definitePerson);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={ArrayWithInfoAboutDefinitePerson}
        pagination={false}
      />
    </div>
  );
};

export default TableInfoDefnitePerson;
