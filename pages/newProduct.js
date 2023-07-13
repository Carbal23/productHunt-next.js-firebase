import React, { useContext, useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "@/components/layout/Layout";
import { Error, Field, Form, InputSubmit } from "@/components/ui/Form";
import useValidation from "@/hooks/useValidation";
import newProductValidation from "@/validation/NewproductValidation";
import { FirebaseContext } from "@/firebase";
import { collection, getFirestore, addDoc,  } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Error404 from "@/components/layout/Error404";

const initialState = {
  name: "",
  company: "",
  fileImage: "",
  url: "",
  description: "",
};

export default function NewProduct() {
  const [error, setError] = useState("");

  const addNewProduct = async () => {
    if (!user) {
      return Router.push("/login");
    }

    let urlImage;

    try {
      // insertar fileImage en el storage
      const storageRef = ref(getStorage(), `images/${fileImage.name}`);
      await uploadBytesResumable(storageRef, fileImage);
      urlImage = await getDownloadURL(storageRef);

      //crear objeto del nuevo producto
      const product = {
        name,
        company,
        url,
        description,
        urlImage: urlImage,
        votes: 0,
        comments: [],
        created: Date.now(),
        creator: {
          id: user.uid,
          name: user.displayName,
        },
        userVoted: []
      };

      //insertar en la base de datos
      await addDoc(collection(getFirestore(), "productos"), product);
      Router.push("/");
      console.log("producto agregado exitosamente");
    } catch (error) {
      console.error("hubo un error", error);
    }
  };

  const { values, errors, handleSubmit, handleOnchange, handleBlur } =
    useValidation(initialState, newProductValidation, addNewProduct);

  const { name, company, fileImage, url, description } = values;

  const { user } = useContext(FirebaseContext);

  return (
    <>
      <Layout>
        {!user ? (
          <Error404 />
        ) : (
          <>
            <h1
              css={css`
                text-align: center;
                margin-top: 4rem;
                margin-bottom: 0;
              `}
            >
              New Product
            </h1>
            <Form onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>General Information</legend>
                <Field>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Write your name"
                    name="name"
                    value={name}
                    onChange={handleOnchange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.name && <Error>{errors.name}</Error>}
                <Field>
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Write the company name"
                    name="company"
                    value={company}
                    onChange={handleOnchange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.company && <Error>{errors.company}</Error>}
                <Field>
                  <label htmlFor="fileImage">Image</label>
                  <input
                    type="file"
                    id="fileImage"
                    placeholder="upload your image"
                    name="fileImage"
                    onChange={handleOnchange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.fileImage && <Error>{errors.fileImage}</Error>}
                <Field>
                  <label htmlFor="url">URL</label>
                  <input
                    type="url"
                    id="url"
                    placeholder="Write your url"
                    name="url"
                    value={url}
                    onChange={handleOnchange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.url && <Error>{errors.url}</Error>}
              </fieldset>
              <fieldset>
                <legend>About the product</legend>
                <Field>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    placeholder="Write your description"
                    name="description"
                    value={description}
                    onChange={handleOnchange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.description && <Error>{errors.description}</Error>}
              </fieldset>
              {error && <Error>{error}</Error>}
              <InputSubmit type="submit" value="Create Product" />
            </Form>
          </>
        )}
      </Layout>
    </>
  );
}
