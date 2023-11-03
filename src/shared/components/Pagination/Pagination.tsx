import React from "react";

import { getNumberPageFromURL } from "@utils/getNumberPageFromURL";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Content } = Layout;

const PaginationConteiner = styled(Content)`
  display: flex;
  width: 100%;
  justify-content: end;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const InnerPaginationConteiner = styled(Content)`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;

const PaginationButton = styled(Button)`
  color: black;
  height: 30px;
  width: 100px;
`;

const Pagination: React.FC<any> = (props) => {
  const { data } = props;

  const navigate = useNavigate();

  const NextPageHadler = () => {
    const nextPage: string = getNumberPageFromURL(data?.next);

    navigate("/peoples?page=" + nextPage);
  };

  const PreviouesPageHadler = () => {
    const prevPage: string = getNumberPageFromURL(data?.previous);

    navigate("/peoples?page=" + prevPage);
  };

  return (
    <PaginationConteiner>
      <InnerPaginationConteiner>
        <PaginationButton
          disabled={data.previous ? false : true}
          type="primary"
          onClick={PreviouesPageHadler}
        >
          Previous
        </PaginationButton>
        <PaginationButton
          disabled={data.next ? false : true}
          type="primary"
          onClick={NextPageHadler}
        >
          Next
        </PaginationButton>
      </InnerPaginationConteiner>
    </PaginationConteiner>
  );
};

export default Pagination;
