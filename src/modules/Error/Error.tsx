import React from "react";

import {
  LoaderContainer,
  InnerLoaderContainer,
  DescriptionContainer,
} from "../Loader/Loader";

type ErrorProps = {
  error: string;
};

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <LoaderContainer>
      <InnerLoaderContainer>
        <DescriptionContainer>
          {`${error}. Что пошло не так! Перезагрузите страницу`}
        </DescriptionContainer>
      </InnerLoaderContainer>
    </LoaderContainer>
  );
};

export default Error;
