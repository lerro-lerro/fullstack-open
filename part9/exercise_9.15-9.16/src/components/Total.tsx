import React from 'react'

interface TotalProps {
  total: number
}

const Total: React.FC<TotalProps> = ({ total }) => (
  <p><strong>Number of exercises {total}</strong></p>
)

export default Total
