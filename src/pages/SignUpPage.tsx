import { Link, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { IUserSignup } from "../types/user.type";
import { register } from "../services/auth.service";
import Popup from "../components/Popup/Popup";
import { rootStore } from "../store";
import { observer } from "mobx-react-lite";

const SignUpPage: React.FC = observer(() => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  
  const navigate = useNavigate();

  const initialValues: IUserSignup = {
    username: "",
    email: "",
    password: "",
  };

  const {
    signUpStore: {
      isSignupPopupOpen, setSignupPopupOpen
    }
  } = rootStore;

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "Длина никнейма должна быть от 3 до 20 символов.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("Заполните это поле!"),
    email: Yup.string()
      .email("E-mail не корректен.")
      .required("Заполните это поле!"),
    password: Yup.string()
      .test(
        "len",
        "Длина пароля должна быть от 6 до 40 символов.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue: IUserSignup) => {
    const { username, email, password } = formValue;
    const active = false;
    const role = 'USER';

    register(crypto.randomUUID(), username, email, password, active, role).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        setSignupPopupOpen(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  const handleClosePopup = () => {
    setSignupPopupOpen(false);
    navigate("/signin");
    };

  return (
    <>
    <div className="bg-white pt-16 w-96 mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username"> Имя пользователя </label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email"> E-mail </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"> Пароль </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button className="w-full mt-4 bg-[#bd0000] text-white p-2  hover:bg-[maroon]" type="submit">Зарегистрироваться</button>
                </div>
                <div className="mt-4 text-center">
                  <Link to={"/signin"} className="text-[maroon] hover:underline">Уже есть аккаунт? Войти</Link>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
    </div>
      {isSignupPopupOpen ? <Popup
        title={"Остался последний шаг"}
        content={`На указанный адрес почты было отправлено письмо
                  со ссылкой для подтверждения. Не забудьте перейти
                  по ней для завершения регистрации!`}
        onClose={() => {
          handleClosePopup();
        }}
        /> : ""
              }
    </>
  );
});

export default SignUpPage;