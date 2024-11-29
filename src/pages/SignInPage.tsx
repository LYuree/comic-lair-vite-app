import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../services/auth.service";

type Props = {}

const SignInPage: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    login(username, password).then(
      () => {
        navigate("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="bg-white w-96 mx-auto pt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Вход в аккаунт</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group mb-4">
              <label htmlFor="username" className="block text-gray-700">Логин</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="w-full bg-[#bd0000] text-white p-2 mt-8  hover:bg-[maroon]" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Войти</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
        <div className="mt-4 text-center">
          <Link to={"/sign_up"} className="text-[maroon] hover:underline">Зарегистрироваться</Link>
          <span className="mx-2">|</span>
          <Link to={"*"} className="text-[maroon] hover:underline">Восстановить пароль</Link>
        </div>
    </div>
  );
};



// trash


// function Login() {

//   const handleSubmit = (email: string, password: string) => {
//     //reqres registered sample user
//     const loginPayload = {
//       email: 'eve.holt@reqres.in',
//       password: 'cityslicka'
//     }

//     axios.post("https://reqres.in/api/login", loginPayload)
//       .then(response => {
//         //get token from response
//         const token = response.data.token;

//         //set JWT token to local
//         localStorage.setItem("token", token);

//         //set token to axios common header
//         setAuthToken(token);

//         //redirect user to home page
//         window.location.href = '/'

//       })
//       .catch(err => console.log(err));
//   };

//   const emailInput = useRef(null);
//   const passwordInput = useRef(null);

//   return (
//     <form
//       onSubmit={(event) => {
//         event.preventDefault();
//         // const [email, password] = event.target.children;
//         handleSubmit(email, password);
//       }}
//     >
//       <label htmlFor="email">Email</label><br />
//       <input type="email" id="email" name="email"/><br />
//       <label htmlFor="password">Password</label><br />
//       <input type="password" id="password" name="password"/><br></br>
//       <input type="submit" value="Submit" />
//     </form>
//   );
// }


//  v1

// const SignInPage = () => {

//     const handleSubmit = (email: string, password: string) => {
//         console.log(email, password);
//         const loginPayload = {
//           email,
//           password
//         };
    
//         axios.post("https://backend.example//api/login", loginPayload)
//           .then(response => {
//             //запрос по данным пользователя
//             const userExists = response.data.user_exists;
    
//             // данные найдены
//             (userExists ? localStorage.setItem("token", token) : "");
    
//             //set token to axios common header
//             setAuthToken(token);
    
//             //redirect user to home page
//             window.location.href = '/'
    
//           })
//           .catch(err => console.log(err));
//       };
    
//       const emailInput = useRef<HTMLInputElement>(null);
//       const passwordInput = useRef<HTMLInputElement>(null);

//     return ( 
//         <div className="bg-white w-96 mx-auto pt-16">
//             <h2 className="text-2xl font-bold mb-6 text-center">Вход в аккаунт</h2>
//             <form onSubmit={(event) => {
//                     event.preventDefault();
//                     if(emailInput.current && passwordInput.current){
//                         const email = emailInput.current.value;
//                         const password = passwordInput.current.value;
//                         handleSubmit(email, password);
//                     }
//                 }}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700" htmlFor="username">Логин</label>
//                     <input className="mt-1 block w-full p-2 border border-gray-300 "
//                         type="text" id="username"
//                         placeholder="Введите логин"
//                         ref={emailInput}
//                         required/>
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700" htmlFor="password">Пароль</label>
//                     <input className="mt-1 block w-full p-2 border border-gray-300"
//                         type="password" id="password"
//                         placeholder="Введите пароль"
//                         ref={passwordInput}
//                         required/>
//                 </div>
//                 <button className="w-full bg-blue-500 text-white p-2  hover:bg-blue-600" type="submit">Войти</button>
//             </form>
            // <div className="mt-4 text-center">
            //     <a className="text-blue-500 hover:underline" href="/sign_up" >Зарегистрироваться</a>
            //     <span className="mx-2">|</span>
            //     <a className="text-blue-500 hover:underline" href="*">Восстановить пароль</a>
            // </div>
//         </div>
//      );
// }`
 
export default SignInPage;