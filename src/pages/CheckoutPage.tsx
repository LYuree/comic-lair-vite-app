import { useEffect } from "react";
import { rootStore } from "../store";
import { observer } from "mobx-react";
import PhoneNumberInput from "../components/PhoneNumberInput/PhoneNumberInput";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const CheckOutPage = observer(() => {
  const {
    cartStore: { cartProducts, fetchCartProducts, totalCost },
    profileStore: { profileLoading },
  } = rootStore;
  useEffect(() => {
    fetchCartProducts();
  }, []);

  console.log(cartProducts);

  if (profileLoading) return <LoadingScreen />;

  return (
    <div className="flex py-8 px-16">
      <div className="bg-white w-96 pt-16">
        <h2 className="text-2xl font-bold mb-6 text-start">
          Оформление заказа
        </h2>
        <div className="text-start">
          Пожалуйста, укажите Вашу почту и контактный номер телефона для
          оформления заказа. Заказ будет рассмотрен, после чего на указанный
          адрес почты будет выслано письмо с деталями.
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 pt-4" htmlFor="email">
              E-mail
            </label>
            <input
              className="mt-1 block w-full p-2 border border-gray-300 "
              type="text"
              id="email"
              placeholder="Введите e-mail"
              required
            />
          </div>

          <div className="mb-6">
            <PhoneNumberInput />
          </div>

          <button
            className="w-full text-white p-2 bg-[#bd0000] duration-500 hover:bg-[maroon]"
            type="submit"
          >
            ОФОРМИТЬ ЗАКАЗ
          </button>
        </form>
      </div>
      <div className="pt-16 px-8 mt-8">
        <span className="text-start font-bold border-y border-black py-8">
          СУММА ЗАКАЗА: <span className="text-[green]">{totalCost}</span>
        </span>
      </div>
    </div>
  );
});

export default CheckOutPage;
