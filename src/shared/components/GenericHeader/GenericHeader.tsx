import React, { FC, PropsWithChildren } from "react";

import { Layout } from "antd";
import styled from "styled-components";

const { Header } = Layout;
const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
`;

type GenericHeaderProps = PropsWithChildren<{}>;

export const GenericHeader: FC<GenericHeaderProps> = ({ children }) => {
  return (
    <StyledHeader>
      <>{children}</>
    </StyledHeader>
  );
};

export default GenericHeader;
