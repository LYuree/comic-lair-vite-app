import { Link } from "react-router-dom";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../types/user.type";
import { register } from "../services/auth.service";

const SignUpPage: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue: IUser) => {
    const { username, email, password } = formValue;

    register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
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

  return (
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
                  <label htmlFor="username"> Username </label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"> Password </label>
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
                <button className="w-full mt-4 bg-[#bd0000] text-white p-2  hover:bg-[maroon]" type="submit">Зарегистрироваться</button>                </div>
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
  );
};

export default SignUpPage;


// v1

// const SignUpPage = () => {
//     return ( 
//         <div className="bg-white pt-16 w-96 mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
//         <form>
//             <div className="mb-4">
//                 <label className="block text-gray-700" htmlFor="first-name">Имя</label>
//                 <input className="mt-1 block w-full p-2 border border-gray-300 " type="text" id="first-name" placeholder="Введите имя" required/>
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700" htmlFor="last-name">Фамилия</label>
//                 <input className="mt-1 block w-full p-2 border border-gray-300 " type="text" id="last-name" placeholder="Введите фамилию" required/>
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700" htmlFor="email">Почта</label>
//                 <input className="mt-1 block w-full p-2 border border-gray-300 " type="email" id="email" placeholder="Введите почту" required/>
//             </div>
//             <div className="mb-6">
//                 <label className="block text-gray-700" htmlFor="password">Пароль</label>
//                 <input className="mt-1 block w-full p-2 border border-gray-300 " type="password" id="password" placeholder="Введите пароль" required/>
//             </div>
//             <button className="w-full bg-[#bd0000] text-white p-2  hover:bg-[maroon]" type="submit">Зарегистрироваться</button>
//         </form>
//         <div className="mt-4 text-center">
//             <Link to={"/sign_in"} className="text-[maroon] hover:underline">Уже есть аккаунт? Войти</Link>
//         </div>
//     </div>
//     );
// }
 
// export default SignUpPage;