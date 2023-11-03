import React from "react";

import { Layout, Spin } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const LoaderContainer = styled(Content)`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const InnerLoaderContainer = styled(Content)`
  display: flex;
  flex-direction: column;
`;
export const DescriptionContainer = styled(Content)`
  text-align: center;
  margin-top: 50px;
`;

type LoaderProps = {
  description: string;
};

const Loader: React.FC<LoaderProps> = (props) => {
  const { description } = props;

  return (
    <LoaderContainer>
      <InnerLoaderContainer>
        <Spin size="large" />
        <DescriptionContainer>{description}</DescriptionContainer>
      </InnerLoaderContainer>
    </LoaderContainer>
  );
};

export default Loader;
