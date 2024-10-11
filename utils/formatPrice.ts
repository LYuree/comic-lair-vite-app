export const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("ru",
    {
        style: "currency",
        currency: "RUB"
    }).format(amount);
}