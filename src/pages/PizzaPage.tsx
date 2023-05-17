import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

const PizzaPage = () => {

const {id} = useParams();
const [pizza, setPizza] = useState<{
  imageUrl: string,
  title: string,
  price: string
}>();

useEffect(() => {
    axios.get(`https://6450d98ae1f6f1bb22a09070.mockapi.io/pizza/items/${id}`)
    .then(({data}) => setPizza(data))
    .catch((err) => alert('Not found'))
}, [id])

if(!pizza) {
  return <div className='container'><h2>Загрузка...</h2></div>
}

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt="img" />
      <h2>Название: {pizza.title}</h2>
      <h2>Цена: {pizza.price} ₽</h2>
    </div>
  )
}

export default PizzaPage