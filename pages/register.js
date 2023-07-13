import React, { useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "@/components/layout/Layout";
import { Error, Field, Form, InputSubmit } from "@/components/ui/Form";
import useValidation from "@/hooks/useValidation";
import registerValidation from "@/validation/registerValidation";
import { register } from "@/firebase/firebase";


const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function Register() {
  const [error, setError] = useState("");
  const registerSubmit = async () => {
    try {
      await register(name, email, password);
      Router.push("/");
    } catch (error) {
      console.error("Hubo un error", error);
      setError(error.message);
    }
  };

  const { values, errors, handleSubmit, handleOnchange, handleBlur } =
    useValidation(initialState, registerValidation, registerSubmit);

  const { name, email, password } = values;

  return (
    <>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 4rem;
              margin-bottom: 0;
            `}
          >
            Register
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
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
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Write your email"
                name="email"
                value={email}
                onChange={handleOnchange}
                onBlur={handleBlur}
               
              />
            </Field>
            {errors.email && <Error>{errors.email}</Error>}
            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Write your password"
                name="password"
                value={password}
                onChange={handleOnchange}
                onBlur={handleBlur}
            
              />
            </Field>
            {errors.password && <Error>{errors.password}</Error>}
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Register acount" />
          </Form>
        </>
      </Layout>
    </>
  );
}
