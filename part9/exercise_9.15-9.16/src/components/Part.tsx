import React from 'react'
import { CoursePart } from '../types'

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

interface PartProps {
  part: CoursePart
}

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p><em>{part.description}</em></p>
        </div>
      )
    case 'group':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>Project exercises: {part.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p><em>{part.description}</em></p>
          <p>
            Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </div>
      )
    case 'special':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p><em>{part.description}</em></p>
          <p>Requirements: {part.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(part)
  }
}

export default Part
