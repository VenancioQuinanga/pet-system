export default function customDate(value: string){
  const date = new Date(value)

  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}
