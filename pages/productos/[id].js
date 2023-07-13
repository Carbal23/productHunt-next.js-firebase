import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Layout from "@/components/layout/Layout";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Error404 from "@/components/layout/Error404";
import Loading from "@/components/ui/Spinner";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Field, InputSubmit } from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import { FirebaseContext } from "@/firebase";

const Container = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CreatorProduct = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;
const ProductId = () => {
  const [productData, setProductData] = useState("");
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({});
  const [requestDb, setRequestDb] = useState(true);
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && requestDb) {
      try {
        const getProductData = async () => {
          const productRef = doc(getFirestore(), "productos", id);
          const ProductSnap = await getDoc(productRef);
          if (ProductSnap.exists()) {
            setProductData(ProductSnap.data());
            setRequestDb(false);
          } else {
            setError(true);
            setRequestDb(false);
          }
        };
        getProductData();
      } catch (error) {
        console.error("hubo un error", error);
      }
    }
  }, [id, requestDb]);

  const {
    name,
    company,
    urlImage,
    url,
    votes,
    comments,
    description,
    created,
    creator,
    userVoted,
  } = productData;

  const onclickVotar = async () => {
    if (!user) {
      return router.push("/login");
    }

    //verificar si el usuario actual a votado
    if (userVoted.includes(user.uid)) return;

    try {
      //obtener suma de nuevo voto
      const newValueVotes = votes + 1;

      //guardar el id del usuario que ha votado
      const voted = [...userVoted, user.uid];

      //actualizar en la db
      const productRef = doc(getFirestore(), "productos", id);
      await updateDoc(productRef, {
        votes: newValueVotes,
        userVoted: voted,
      });

      //Actualizar el state
      setProductData({
        ...productData,
        votes: newValueVotes,
      });

      setRequestDb(true); //actualizamos requerimiento a la base de dato para ver cambios
    } catch (error) {
        console.error("hubo un error", error);
    }
  };

  const handleComment = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  //es creador
  const isCreator = (id) => {
    if (creator.id == id) {
      return true;
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      return router.push("/login");
    }

    try {
      //informacion extra al comentario
      comment.userId = user.uid;
      comment.userName = user.displayName;

      //tomar copia de comentarios y agregarlos al arrelgo
      const newsComments = [...comments, comment];

      //actualizar db
      const productRef = doc(getFirestore(), "productos", id);
      await updateDoc(productRef, {
        comments: newsComments,
      });

      //actualizar state
      setProductData({
        ...productData,
        comments: newsComments,
      });

      setRequestDb(true); //actualizamos requerimiento a la base de dato para ver cambios
      setComment({
        message: ""
      }); //limpio el input
    } catch (error) {
      console.error("hubo un error", error);
    }
  };

  const buttonDeleteAvailable = () => {
    if (!user) {
      return false;
    }

    if (creator.id === user.uid) {
      return true;
    }
  };

  const onclickDelete = async () => {
    if (!user) {
      return router.push("/");
    }

    if (creator.id !== user.uid) {
      return router.push("/");
    }

    try {
      const productRef = doc(getFirestore(), "productos", id);
      await deleteDoc(productRef);
      router.push("/");
    } catch (error) {
      console.log("hubo un error", error);
    }
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : Object.keys(productData).length === 0 ? (
          <Loading />
        ) : (
          <div className="contenedor">
            <h1
              css={css`
                margin-top: 3rem;
                text-align: center;
              `}
            >
              {name}
            </h1>

            <Container>
              <div>
                <p>Posted ago: {formatDistanceToNow(new Date(created))}</p>
                <p>
                  created by: {creator.name} from {company}
                </p>
                <img src={urlImage} alt={name} />
                <p>{description}</p>

                {user && (
                  <>
                    <h2>add a comment</h2>
                    <form onSubmit={handleSubmitComment}>
                      <Field>
                        <input
                          type="text"
                          onChange={handleComment}
                          name="message"
                          value={comment.message}
                        />
                      </Field>
                      <InputSubmit type="submit" value="add comment" />
                    </form>
                  </>
                )}

                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  comments
                </h2>
                {comments.length === 0 ? (
                  <p>No hay comentarios aun</p>
                ) : (
                  <ul>
                    {comments.map((comment, i) => (
                      <li
                        key={`${comment.userId}-${i}`}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                      >
                        <p>{comment.message}</p>
                        <p>
                          Writed by:
                          <span
                            css={css`
                              font-weight: bold;
                            `}
                          >
                            {" "}
                            {comment.userName}
                          </span>
                        </p>
                        {isCreator(comment.userId) && (
                          <CreatorProduct>Creator comment</CreatorProduct>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <aside>
                <Button target="blank" bgcolor="true" href={url}>
                  Visitar url
                </Button>
                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {votes} Votes
                  </p>
                  {user && !userVoted.includes(user.uid) ? (
                    <Button onClick={onclickVotar}>Vote</Button>
                  ) : user && userVoted.includes(user.uid) ? (
                    <p
                      css={css`
                        text-align: center;
                        font-weight: bold;
                        background-color: green;
                        color: #fff;
                        border-radius: 5px;
                      `}
                    >
                      Muchas gracias por tu voto
                    </p>
                  ) : null}
                </div>
              </aside>
            </Container>
            {buttonDeleteAvailable() && (
              <Button onClick={onclickDelete}>Delete Product</Button>
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default ProductId;
