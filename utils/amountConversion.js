import Rates from '../data/currencies.json'

export const amountConversion = (amount, baseCurrency, targetCurrency) => {
  const ratesData = Rates.data
  const baseRate = ratesData[baseCurrency]?.value
  const targetRate = ratesData[targetCurrency]?.value

  if (!baseRate || !targetRate) {
    return null // Handle invalid currency cases
  }

  const convertedAmount = (amount / baseRate) * targetRate
  console.log('baseRate', baseRate)
  return parseFloat(convertedAmount.toFixed(2))
}
