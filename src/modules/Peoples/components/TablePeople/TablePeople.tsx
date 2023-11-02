import React from "react";

import { mapInfoPeopleArrayToTableArray } from "@utils/mapInfoPeopleArrayToTableArray";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

let counter = 0;
const TablePeople: React.FC<any> = (props) => {
  const { data, numberPage, setGettedInfoAboutPeopleWithDenifePage } = props;

  const ArrayWithInfoAboutAllPerson = mapInfoPeopleArrayToTableArray(
    data[numberPage],
  );

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
        dataSource={ArrayWithInfoAboutAllPerson}
        pagination={false}
      />
    </div>
  );
};
export default TablePeople;
