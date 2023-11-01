import React, { useState, memo } from "react";

import { mapInfoPeopleArrayToTableArray } from "@utils/mapInfoPeopleArrayToTableArray";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

let counter = 0;
const TablePeople: React.FC<any> = (props) => {
  const { data, numberPage, setGettedInfoAboutPeopleWithDenifePage } = props;

  const ggg = mapInfoPeopleArrayToTableArray(data[numberPage]);

  // console.log("currentPeople", currentPeople, data);
  counter++;

  console.log("TAble", counter);

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Height",
      dataIndex: "Height",
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
              setGettedInfoAboutPeopleWithDenifePage(record);
            }}
          >
            {record.status}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={ggg}
        pagination={{
          total: 50,
          onChange: (page, pageSize) => {},
        }}
      />
    </div>
  );
};
export default TablePeople;
