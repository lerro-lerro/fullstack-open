import React from 'react'
import { CoursePart } from '../types'
import Part from './Part'

interface ContentProps {
  parts: CoursePart[]
}

const Content: React.FC<ContentProps> = ({ parts }) => (
  <div>
    {parts.map((p, i) => <Part key={i} part={p} />)}
  </div>
)

export default Content
