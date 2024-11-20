import React, { useState } from 'react';
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
      <Input
        type="date"
        name='startDate'
        className=''
        event={onHandleChange}
      />
      <Input
        type="date"
        name='endDate'
        className=''
        event={onHandleChange}
      />
      
      <InputButton
        className='filter_button'
        name='filter_button'
        value={<i className='bi bi-search'/>}
        event={onFilter}
      />
    </div>
  );
};

export default DateFilter;
