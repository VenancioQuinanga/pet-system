
type optionType = {
  id: number,
  value?: string,
  gender?: string,
  category?: string,
  description?: string,
  type?: string,
  name?: string,
  family?: string
}

interface selectProps{
  className: string,
  name: string,
  defaultOption?: string,
  options: optionType[],
  fk?: number,
  event?: any,
}

export default function Select({ className, name, defaultOption, options, event, fk }: selectProps) {
  return (
    <>
      <select
        name={name}
        className={className}
        onInput={event}
        required={true}
      >
        {defaultOption &&(
          <option value={0}>{defaultOption}</option>
        )}
        {options.length > 0 &&
          options.map((option) => (
            <option value={option.id} key={option.id} selected={option.id === fk}>
              {option.value || option.gender || option.category || option.description
                || option.type || option.family || option.name || null}
            </option>
          ))
        }
        {options.length === 0 &&(
          <option value="">Sem opções encontradas!</option>
        )}
      </select>
    </>
  )
}

