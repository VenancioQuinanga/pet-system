'use client'

import { InputInterface } from "@/src/interfaces/Layout/InputInterface";

export default function Input(props: InputInterface) {

  return (
    <>
      <input 
        id={props.id}
        className={props.className} 
        type={props.type} 
        name={props.name} 
        placeholder={props.placeholder}
        onInput={props.event}
        value={props.value}
        required={true}
      />
    </>
  );
}
