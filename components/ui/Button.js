import styled from "@emotion/styled";

const Button = styled.a`
  display: block;
  font-weight: 700;
  margin: 2rem auto;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  background-color: ${(props) => (props.bgcolor ? "#da552f" : "#fff")};
  color: ${(props) => (props.bgcolor ? "#fff" : "#000")};

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
