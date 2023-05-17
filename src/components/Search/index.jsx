import React from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import styles from './search.module.scss';
import { setSearchValue } from '../../reducers/search';
import { useState } from 'react';
import { useCallback } from 'react';

const Search = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
   debounce((value) => {
      dispatch(setSearchValue(value))
    }, 350) , []
    )

  const onChangeInput = (e) => {
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