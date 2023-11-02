import React from "react";

import { Layout, Spin } from "antd";
import styled from "styled-components";

const { Content } = Layout;
const LoaderContainer = styled(Content)`
  display: flex;
  flex-direction: column;
`;
const InnerContainer = styled(Content)`
max-width: 200px,
text-align: center,
margin-bottom: 20px,
`;

const Loader = (props: any) => {
  const { description } = props;

  return (
    <LoaderContainer className="pageOrder__loader_Content">
      <InnerContainer>{description}</InnerContainer>
      <Spin size="large" />
    </LoaderContainer>
  );
};

export default Loader;
