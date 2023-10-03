// take 100 and return 1 €

export const formatPrice = (price: number) => {
  const IntlNumberFormat = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  return IntlNumberFormat.format(price / 100);
};
