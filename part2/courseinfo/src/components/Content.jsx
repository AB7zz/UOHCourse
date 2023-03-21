import React from 'react'

const Content = ({parts}) => {
  return (
    <>
    {parts.map(part=>{
      return(
        <p>
          {part.name} {part.exercise} <br />
        </p>
      )
    })}
    </>
  )
}

export default Content