import React from 'react';
// @ts-ignore
import debounce from 'lodash.debounce';
import { useAppDispatch } from "../../store";
import styles from './search.module.scss';
import { setSearchValue } from '../../reducers/search';
import { useState } from 'react';
import { useCallback } from 'react';

const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch();

  const updateSearchValue = useCallback(
   debounce((value: string) => {
      dispatch(setSearchValue(value))
    }, 350) , []
    )

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <input
    value={value}
    onChange={(e) => onChangeInput(e)} 
    className={styles.input} placeholder='Поиск пиццы...'/>
  )
}

export default Search