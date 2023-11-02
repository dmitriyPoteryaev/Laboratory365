import React from "react";

import { Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;
const ErrorContainer = styled(Content)`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;
const InnerContainer = styled(Content)`
  display: flex;
  flex-direction: column;
`;

const Error = ({ error }: any) => {
  return (
    <ErrorContainer>
      <InnerContainer>
        <div
          style={{
            maxWidth: "200px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <br />
          {`${error}. Что пошло не так! Перезагрузите страницу`}
        </div>
      </InnerContainer>
    </ErrorContainer>
  );
};

export default Error;
