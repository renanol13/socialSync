export const VerifyForm = (data) => {
  const { name, email, password, passwordConfirm } = data;

  if (name)
    if (name.length < 4) {
      return {
        boolerForm: false,
        msgForm: "Nome muito curto (min: 3 digitos)",
      };
    }

  if (!email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{3,}$/i)) {
    return { boolerForm: false, msgForm: "Formato de email inválido" };
  }

  if (password.length < 6) {
    return { boolerForm: false, msgForm: "Senha muito curta (min: 6 digitos)" };
  }
  if (passwordConfirm) {
    if (password != passwordConfirm) {
      return { boolerForm: false, msgForm: "Senhas não coincidem" };
    }
  }
  return { boolerForm: true };
};
