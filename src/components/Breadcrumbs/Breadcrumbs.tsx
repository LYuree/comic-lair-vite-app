import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on the home page
  if (pathnames.length === 0) {
    return null;
  }

  // Customize these names for your routes
  const getDisplayName = (path: string) => {
    const nameMap: Record<string, string> = {
      products: "Товары",
      about: "О нас",
      signin: "Войти",
      signup: "Регистрация",
      profile: "Профиль",
      cart: "Корзина",
      checkout: "Оформить заказ",
      product_details: "Товар",
    };

    return nameMap[path] || path.replace(/-/g, " ").replace(/_/g, " ");
  };

  return (
    <div className="text-white bg-black pt-4 flex">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="text-white hover:text-gray-500"
            aria-label="Home"
          >
            <HomeIcon className="h-5 w-5 flex-shrink-0" />
          </Link>
        </li>
        {pathnames.map((path, index) => {
          const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayName = getDisplayName(path);

          return (
            <li key={routeTo} className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                aria-hidden="true"
              />
              {isLast ? (
                <span className="ml-2 text-sm font-medium text-white">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumbs;
