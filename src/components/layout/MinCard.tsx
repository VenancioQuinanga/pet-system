'use client'

import styles from "./MinCard.module.css";

//Interface
import { MinCardInterface } from "@/src/interfaces/Layout/MinCardInterface";

export default function MinCard(props: MinCardInterface) {

  return (
    <>
      <div className={`${styles.my_card} shadow`}>
        <i className={`bi ${props.icone} me-2 bg-ccc border-sm ps-3 pe-3 pt-2 text-dark p-1 mt-1`}></i>
        <span>{props.title}</span>
        <p>{props.value || 'processando...'}</p>
      </div>
    </>
  );
}

