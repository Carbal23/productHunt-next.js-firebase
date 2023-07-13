import React, { useContext } from "react";
import Search from "../ui/Search";
import Nav from "./Nav";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "../ui/Button";
import { useRouter } from "next/router";
import { FirebaseContext } from "@/firebase";
import { logout } from "@/firebase/firebase";

const ContainerHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
`;

const Header = () => {
  const router = useRouter();
  const {user} = useContext(FirebaseContext);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--grey3);
        padding: 1rem 0;
      `}
    >
      <ContainerHeader>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>

          <Search />
          <Nav />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hi {user.displayName}
              </p>
              <Button bgcolor="true" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button bgcolor="true" onClick={handleLogin}>
                Loging
              </Button>

              <Button onClick={handleRegister}>Register</Button>
            </>
          )}
        </div>
      </ContainerHeader>
    </header>
  );
};

export default Header;
