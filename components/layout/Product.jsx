import React from "react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Link from "next/link";

const ProductLi = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
`;

const DescriptionProduct = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Comments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`;

const Votes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;
  div {
    font-size: 2rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const Image = styled.img`
  width: 200px;
`;

const Product = ({ product }) => {
  const {
    name,
    company,
    urlImage,
    url,
    description,
    id,
    votes,
    comments,
    created,
  } = product;

  return (
    <ProductLi>
      <DescriptionProduct>
        <div>
          <Image src={urlImage} alt={name} />
        </div>
        <div>
          <Link href="/productos/[id]" as={`/productos/${id}`}>
            <Title>{name}</Title>
          </Link>

          <Description>{description}</Description>
        </div>
        <Comments>
          <div>
            <img src="/static/img/comments.png" alt="" />
            <p>{comments.length} comments</p>
          </div>
        </Comments>
        <p>Posted ago: {formatDistanceToNow(new Date(created))}</p>
      </DescriptionProduct>
      <Votes>
        <div>&#9650;</div>
        <p>{votes}</p>
      </Votes>
    </ProductLi>
  );
};

export default Product;
