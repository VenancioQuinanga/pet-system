export default function expirationDate(value: string, expirationDaies: any){
  let date = new Date(value)

  date.setDate(date.getDate() + expirationDaies as number)

  return date.toLocaleDateString()
}
