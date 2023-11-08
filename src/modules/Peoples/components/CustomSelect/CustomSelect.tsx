import React, { useState, useEffect } from "react";

import { specificPeopleByQueryStore } from "@store/index";
import { Layout, Input, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const { Content } = Layout;

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const ContainerSelect = styled(Content)`
  display: flex;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
`;
const InnerSelectrContainer = styled(Content)`
  position: relative;
  max-width: 800px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const InputSearch = styled(Input)`
  width: 800px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
const LoaderSpiner = styled(Spin)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const ContainerListPersons = styled(Content)`
  position: absolute;
  width: 800px;
  font-family: "DM Sans", sans-serif;
  padding-bottom: 0;
  vertical-align: text-bottom;
  border: 1px solid #b2bdc7;
  color: #2c555b;
  background-color: white;
  z-index: 10;
  top: 45px;
  margin-bottom: 200px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ContainerPositionPerson = styled(Content)`
  font-family: "DM Sans", sans-serif;
  margin-top: 0;
  color: black;
  font-size: 15px;
  padding-left: 20px;
  padding-top: 11px;
  padding-bottom: 0;
  border-bottom: 1px solid #b2bdc7;
  width: 100%;
  height: 30px;
  color: #2c555b;
  cursor: pointer;

  &:hover {
    background-color: #cdffff;
  }
`;

const ContainerPositionPersonWithOutHover = styled(Content)`
  font-family: "DM Sans", sans-serif;
  margin-top: 0;
  color: black;
  font-size: 15px;
  padding-left: 20px;
  padding-top: 11px;
  padding-bottom: 0;
  border-bottom: 1px solid #b2bdc7;
  width: 100%;
  height: 30px;
  color: #2c555b;
`;

interface FoundedPosition {
  id: string;
  name: string;
}

interface NotFoundedPosition {
  name: string;
}

const CustomSelect = observer(() => {
  const {
    getDataAboutSpecificPeopleByQuery,
    isLoading,
    error,
    listPeople,
    ResetToZeroAllState,
  } = specificPeopleByQueryStore;

  const [searchValue, setSerchValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const navigate = useNavigate();

  const navigateHandler = (id: string) => {
    navigate("/peoples/:" + id);
  };

  const HideFocusHandler = () => {
    setIsFocus(false);
  };
  const ShowFocusHandler = () => {
    setIsFocus(true);
  };

  useEffect(() => {
    document.addEventListener("click", HideFocusHandler);

    return () => {
      document.removeEventListener("click", HideFocusHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus]);
  useEffect(() => {
    if (!!!searchValue.trim()) {
      ResetToZeroAllState();
      return;
    }
    const controller = new AbortController();
    getDataAboutSpecificPeopleByQuery(searchValue, controller.signal);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  if (isLoading) {
    return (
      <ContainerSelect>
        <InnerSelectrContainer>
          <InputSearch
            placeholder="Search hero..."
            size="large"
            value={searchValue}
            onChange={(event: InputEvent) => setSerchValue(event.target.value)}
          />
          {isLoading && <LoaderSpiner size="small" />}
        </InnerSelectrContainer>
      </ContainerSelect>
    );
  }
  if (error && searchValue) {
    if (error === "canceled") {
      return (
        <ContainerSelect>
          <InnerSelectrContainer>
            <InputSearch
              placeholder="Search hero..."
              size="large"
              value={searchValue}
              onChange={(event: InputEvent) =>
                setSerchValue(event.target.value)
              }
            />
            {<LoaderSpiner size="small" />}
          </InnerSelectrContainer>
        </ContainerSelect>
      );
    }
    return (
      <ContainerSelect>
        <InnerSelectrContainer>
          <InputSearch
            placeholder="Search hero..."
            size="large"
            value={searchValue}
            onChange={(event: InputEvent) => setSerchValue(event.target.value)}
          />
        </InnerSelectrContainer>
      </ContainerSelect>
    );
  }

  if (listPeople[0]?.name === "Ничего не найдено") {
    return (
      <ContainerSelect>
        <InnerSelectrContainer
          onClick={(event) => {
            event.stopPropagation();
            ShowFocusHandler();
          }}
        >
          <InputSearch
            placeholder="Search hero..."
            size="large"
            value={searchValue}
            onChange={(event: InputEvent) => setSerchValue(event.target.value)}
          />
          {isFocus && (
            <ContainerListPersons>
              {listPeople.map((elem: NotFoundedPosition) => (
                <ContainerPositionPersonWithOutHover key={elem.name}>
                  {elem.name}
                </ContainerPositionPersonWithOutHover>
              ))}
            </ContainerListPersons>
          )}
        </InnerSelectrContainer>
      </ContainerSelect>
    );
  }

  return (
    <ContainerSelect>
      <InnerSelectrContainer
        onClick={(event) => {
          event.stopPropagation();
          ShowFocusHandler();
        }}
      >
        <InputSearch
          placeholder="Search hero..."
          size="large"
          value={searchValue}
          onChange={(event: InputEvent) => setSerchValue(event.target.value)}
        />
        {isLoading && <LoaderSpiner size="small" />}
        {!isLoading && listPeople.length > 0 && isFocus && (
          <ContainerListPersons>
            {listPeople.map((elem: FoundedPosition) => (
              <ContainerPositionPerson
                key={elem.id}
                onClick={() => {
                  navigateHandler(elem.id);
                }}
              >
                {elem.name}
              </ContainerPositionPerson>
            ))}
          </ContainerListPersons>
        )}
      </InnerSelectrContainer>
    </ContainerSelect>
  );
});

export default CustomSelect;
