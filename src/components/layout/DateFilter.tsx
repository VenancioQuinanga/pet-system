import React from 'react';
import Input from '../form/Input';
import InputButton from '../form/InputButton';
import styles from './DateFilter.module.css'

interface FilterProps {
  onFilter: Function,
  onHandleChange: Function
}

const DateFilter = ({ onFilter, onHandleChange }: FilterProps) => {

  return (
    <div className={styles.date_filter}>
      <div className={styles.input_box}>
        <label>De</label>
        <Input
          type="date"
          name='startDate'
          className=''
          event={onHandleChange}
        /> 
      </div>
      <div className={styles.input_box}>
        <label>Até</label>
        <Input
          type="date"
          name='endDate'
          className=''
          event={onHandleChange}
        />
      </div>
      
      <div className={styles.input_box}>
        <InputButton
          className='filter_button'
          name='filter_button'
          value={<i className='bi bi-search'/>}
          event={onFilter}
        />
      </div>
    </div>
  );
};

export default DateFilter;
