// Utilizamos una expresión regular única para validar tanto el nombre como el apellido
const RegExpressionText = /^[a-zA-Z\s]*$/;

// Utilizamos una expresión regular única para validar el número de teléfono
const RegExpressionNum = /^[0-9,$]*$/;

// Utilizamos una expresión regular única para validar la dirección URL
const RegExpressionUrl =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

// Utilizamos una expresión regular única para validar el correo electrónico
const RegExpressionEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function validate(values) {
  let errors = {};

  // Utilizamos una función de validación genérica para validar los campos que comparten el mismo comportamiento de validación
  function validateField(
    fieldName,
    fieldValue,
    requiredMessage,
    patternMessage,
    pattern
  ) {
    if (!fieldValue) {
      errors[fieldName] = requiredMessage;
    } else if (pattern && !pattern.test(fieldValue)) {
      errors[fieldName] = patternMessage;
    }
  }

  // Utilizamos destructuring para simplificar el código y hacerlo más legible
  const { fullName, documento, cargo, email, celular } = values;

  // Validamos el nombre y el apellido utilizando la función de validación genérica
  validateField(
    "fullName",
    fullName,
    "Please enter a fullname name",
    "Numbers and special characters are not allowed",
    RegExpressionText
  );

  // Validamos el número de teléfono utilizando la función de validación genérica
  validateField(
    "documento",
    documento,
    "Please enter a phone number",
    "Only numbers are allowed",
    RegExpressionNum
  );
  validateField(
    "celular",
    celular,
    "Please enter a phone number",
    "Only numbers are allowed",
    RegExpressionNum
  );

  // Validamos la dirección utilizando la función de validación genérica
  validateField("cargo", cargo, "Please enter an address");

  // Validamos el correo electrónico utilizando la función de validación genérica
  validateField(
    "email",
    email,
    "Please enter an email",
    "Invalid email",
    RegExpressionEmail
  );

  return errors;
}
