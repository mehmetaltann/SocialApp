import axios from "axios";
import * as Yup from "yup";
import { Fragment, useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

const CreatePost = () => {
  const initialValues = {
    title: "",
    postText: "",
  };

  const { isLogin } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Konu Girmelisiniz !!!"),
    postText: Yup.string().required("Düşüncenizi Girmelisiniz !!!"),
  });

  const onSubmitHandler = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log("lets work");
      });
    navigate("/");
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
            <label>Konu: </label>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="Konu ..."
            />
            <label>Tweet: </label>
            <ErrorMessage name="postText" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="postText"
              placeholder="Düşünceniz ..."
            />
            <button type="submit">Post Oluştur</button>
          </Form>
        </Formik>
      </div>
    </Fragment>
  );
};

export default CreatePost;
