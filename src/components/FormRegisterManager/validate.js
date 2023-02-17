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
  const { nombre, email, password, confirmPassword } = values;
  validateField("nombre", nombre, "Insertar Nombre");
  validateField(
    "email",
    email,
    "Insertar email",
    "Email invalido",
    RegExpressionEmail
  );

  // Validamos la contraseña utilizando la función de validación genérica
  validateField("password", password, "Insertar contraseña");

  // Comparamos la contraseña y la confirmación de contraseña
  if (password.length < 7) {
    errors.password = "se requiere una contraseña mas larga";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "La contraseña no coincide";
  }

  // Validamos la confirmación de contraseña utilizando la función de validación genérica
  validateField(
    "confirmar contraseña",
    confirmPassword,
    "Insertar confirmacion de contraseña"
  );

  return errors;
}
