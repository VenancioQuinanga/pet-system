'use client'

import { InputInterface } from "@/src/interfaces/Layout/InputInterface";

export default function InputButton(props: InputInterface) {

  return (
    <>
      <button 
        id={props.id}
        className={props.className} 
        name={props.name} 
        onClick={props.event}>
          <i className={props.icone}/>
          {props.value}
      </button>
    </>
  );
}
