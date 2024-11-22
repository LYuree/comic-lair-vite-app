const SignUpPage = () => {
    return ( 
        <div className="bg-white pt-16 w-96 mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
        <form>
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="first-name">Имя</label>
                <input className="mt-1 block w-full p-2 border border-gray-300 " type="text" id="first-name" placeholder="Введите имя" required/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="last-name">Фамилия</label>
                <input className="mt-1 block w-full p-2 border border-gray-300 " type="text" id="last-name" placeholder="Введите фамилию" required/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">Почта</label>
                <input className="mt-1 block w-full p-2 border border-gray-300 " type="email" id="email" placeholder="Введите почту" required/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700" htmlFor="password">Пароль</label>
                <input className="mt-1 block w-full p-2 border border-gray-300 " type="password" id="password" placeholder="Введите пароль" required/>
            </div>
            <button className="w-full bg-blue-500 text-white p-2  hover:bg-blue-600" type="submit">Зарегистрироваться</button>
        </form>
        <div className="mt-4 text-center">
            <a className="text-blue-500 hover:underline" href="/sign_in" >Уже есть аккаунт? Войти</a>
        </div>
    </div>
    );
}
 
export default SignUpPage;