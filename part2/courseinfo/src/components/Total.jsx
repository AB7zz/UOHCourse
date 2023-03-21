import React from 'react'

const Total = ({parts}) => {
  const init = 0
  const sum = parts.reduce((prev, curr) => 
    prev + curr.exercises, init
  )
  return (
    <b>total of {sum} exercises</b>
  )
}

export default Total