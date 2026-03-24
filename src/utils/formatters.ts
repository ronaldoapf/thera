/**
 * Formata um número de telefone para o formato brasileiro
 * Input: "11999998888" -> Output: "(11) 99999-8888"
 */
export function formatPhone(value: string): string {
  const cleaned = value.replace(/\D/g, "")
  
  if (cleaned.length <= 2) {
    return cleaned
  }
  if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
  }
  if (cleaned.length <= 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
}

/**
 * Remove formatação do telefone e retorna no formato E.164
 * Input: "(11) 99999-8888" -> Output: "+5511999998888"
 */
export function unformatPhone(value: string): string {
  const cleaned = value.replace(/\D/g, "")
  if (cleaned.length >= 10) {
    return `+55${cleaned}`
  }
  return cleaned
}

/**
 * Formata um CPF
 * Input: "12345678900" -> Output: "123.456.789-00"
 */
export function formatCPF(value: string): string {
  const cleaned = value.replace(/\D/g, "")
  
  if (cleaned.length <= 3) {
    return cleaned
  }
  if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`
  }
  if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`
  }
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`
}

/**
 * Remove formatação do CPF
 * Input: "123.456.789-00" -> Output: "12345678900"
 */
export function unformatCPF(value: string): string {
  return value.replace(/\D/g, "")
}

/**
 * Valida CPF com algoritmo completo (dígitos verificadores)
 */
export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "")
  if (digits.length !== 11) return false
  
  // Rejeita CPFs com todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(digits)) return false

  const calc = (len: number) => {
    let sum = 0
    for (let i = 0; i < len; i++) {
      sum += Number(digits[i]) * (len + 1 - i)
    }
    const remainder = (sum * 10) % 11
    return remainder === 10 ? 0 : remainder
  }

  const d1 = calc(9)
  const d2 = calc(10)
  return Number(digits[9]) === d1 && Number(digits[10]) === d2
}

/**
 * Valida se o telefone tem entre 10 e 11 dígitos
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "")
  return cleaned.length >= 10 && cleaned.length <= 11
}

/**
 * Retorna a data máxima permitida (hoje) no formato YYYY-MM-DD
 */
export function getMaxDate(): string {
  return new Date().toISOString().split('T')[0]
}

export function formatBirthDate(birthDate: { value: string } | null): string {
  if (!birthDate?.value) return ""
  return new Date(birthDate.value).toISOString().split('T')[0]
}
