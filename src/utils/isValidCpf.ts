export const isValidCPF = (cpf: string) => {
  const cleaned = cpf.replace(/\D/g, "");
  return cleaned.length === 11;
};
