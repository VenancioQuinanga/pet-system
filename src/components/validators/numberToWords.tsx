import extenso from "extenso";
import upperCaseWord from "./upperCaseWord";

export default function NumberToWords(number: any) {

  try {
    const numberValue = parseFloat(number);
    if (!isNaN(numberValue)) {
      const result = extenso(numberValue, {
        mode: 'number',
        locale: 'pt'
      })

      return upperCaseWord(result)
    } else {
      return 'Número inválido.'
    }
  } catch (error) {
    return 'Erro ao converter o número.'
  }
};
