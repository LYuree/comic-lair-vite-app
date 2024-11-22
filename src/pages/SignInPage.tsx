const oath = "";
// const oath = "asdasdas";
(oath ? (() => location.href="/cart")() : "")


const SignInPage = () => {
    return ( 
        <div className="bg-white w-96 mx-auto pt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Вход в аккаунт</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="username">Логин</label>
                    <input className="mt-1 block w-full p-2 border border-gray-300 " type="text" id="username" placeholder="Введите логин" required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700" htmlFor="password">Пароль</label>
                    <input className="mt-1 block w-full p-2 border border-gray-300 " type="password" id="password" placeholder="Введите пароль" required/>
                </div>
                <button className="w-full bg-blue-500 text-white p-2  hover:bg-blue-600" type="submit">Войти</button>
            </form>
            <div className="mt-4 text-center">
                <a className="text-blue-500 hover:underline" href="/sign_up" >Зарегистрироваться</a>
                <span className="mx-2">|</span>
                <a className="text-blue-500 hover:underline" href="*">Восстановить пароль</a>
            </div>
        </div>
     );
}
 
export default SignInPage;