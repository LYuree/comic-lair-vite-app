const PageNotFound = () => {
    return (    
    <div className="bg-white py-32 text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Страница не найдена</h2>
        <p className="text-gray-600 mt-2">Извините, но запрашиваемая вами страница не существует.</p>
        <div className="mt-6">
            <a className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 inline-block" href="/">Вернуться на главную</a>
            <a className="text-blue-500 hover:underline ml-4" href="*">Перейти в раздел помощи</a>
        </div>
    </div>
);
}
 
export default PageNotFound;