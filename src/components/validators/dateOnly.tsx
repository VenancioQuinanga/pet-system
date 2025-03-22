export default function dateOnly(value: string){
  const date = new Date(value)

  return date.toLocaleDateString()
}
