import axios from "axios";
import { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(4).max(20).required("Şifre Giriniz"),
    username: Yup.string()
      .min(3)
      .max(15)
      .required("Kullanıcı adı en az 3 en fazla 15 karakter olmalıdır !!!"),
  });

  const onSubmitHandler = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log("lets work");
      navigate("/login");
    });
  };

  return (
    <Fragment>
      <div className="createPostContainer">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitHandler}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Kullanıcı Adı: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="Kullanıcı Adı ..."
            />
            <label>Şifre: </label>
            <ErrorMessage name="password" component="span" />
            <Field
            type="password"
              autoComplete="off"
              id="inputCreatePost"
              name="password"
              placeholder="Şifre ..."
            />
            <button type="submit">Kullanıcı Oluştur</button>
          </Form>
        </Formik>
      </div>
    </Fragment>
  );
};

export default Registration;
