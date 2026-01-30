import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "en-US",
}: ConvertToLocaleParams) => {
  // Medusa stores prices in cents (smallest currency unit)
  // We need to divide by 100 to get the actual currency amount
  const amountInCurrency = amount / 100

  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency_code,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amountInCurrency)
    : amountInCurrency.toString()
}
