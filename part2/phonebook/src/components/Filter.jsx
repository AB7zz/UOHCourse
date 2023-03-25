import React from 'react'

const Filter = ({handleFilter}) => {
  return (
    <p>filter shown with <input onChange={handleFilter} /> </p>
  )
}

export default Filter