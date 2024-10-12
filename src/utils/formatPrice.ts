const priceWithSpaces = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const formatPrice = (price: number): string =>
  price?.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

export { priceWithSpaces, formatPrice, formatPrice as default };