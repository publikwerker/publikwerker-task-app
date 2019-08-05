const calculateTip = (total, tipPercent = .2) => total + (total * tipPercent);

const fahrenheitToCelsius = (temp) => {
  return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
  return (temp * 1.8) + 32
}

module.exports = {
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius
}