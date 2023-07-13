import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Router from "next/router";

const InputText = styled.input`
  border: 1px solid var(--grey3);
  padding: 1rem;
  min-width: 300px;
`;

const ButtonSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url("static/img/searchicon.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  background-color: #fff;
  border: none;
  text-indent: -999px;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;
const Search = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;

    //redireccionar busqueda
    Router.push({
      pathname: "/search",
      query: { q: search },
    });
  };

  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={handleSubmit}
    >
      <InputText
        type="text"
        placeholder="Search product"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ButtonSubmit type="submit">Search</ButtonSubmit>
    </form>
  );
};

export default Search;
