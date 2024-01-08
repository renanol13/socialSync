export const VerifyForm = (data) => {
  const { name, userName, email, password, passwordConfirm } = data;

  if (name)
    if (name.length < 4) {
      return {
        boolerForm: false,
        msgForm: "Nome muito curto (min: 3 digitos)",
      };
    }
  
  if (userName) {
    if (!userName.match(/^\b\w+\b$/)) {
      return { boolerForm: false, msgForm: "Nome de usuário não deve conter espaços em branco"}
    }
    
    if (userName.length > 7) {
      return { boolerForm: false, msgForm: "Nome de usuário deve conter no máximo 7 caracteres"}
    }

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
