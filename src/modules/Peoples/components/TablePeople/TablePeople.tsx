import React from "react";

import { mapInfoPeopleArrayToTableArray } from "@utils/mapInfoPeopleArrayToTableArray";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

import {
  RowInTablePeople,
  AllInfoForPeoplePage,
} from "../../typesInPeoplesPage";

export type TablePeopleProps = {
  /** */
  data?: AllInfoForPeoplePage;

  functionForChangeData: (value: RowInTablePeople) => void;
};

const TablePeople: React.FC<TablePeopleProps> = (props) => {
  const { data, functionForChangeData } = props;

  const ArrayWithInfoAboutAllPerson = mapInfoPeopleArrayToTableArray(data);

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
      render: (changinRow: RowInTablePeople) => {
        return (
          <Button
            type="primary"
            danger={changinRow.status === "Удалить" ? true : false}
            onClick={() => {
              functionForChangeData(changinRow);
            }}
          >
            {changinRow.status}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        scroll={{ x: 500 }}
        columns={columns}
        dataSource={ArrayWithInfoAboutAllPerson}
        pagination={false}
      />
    </div>
  );
};
export default TablePeople;
