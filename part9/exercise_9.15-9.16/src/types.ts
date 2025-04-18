interface CoursePartBase {
    name: string
    exerciseCount: number
  }
  
  interface CoursePartDescription extends CoursePartBase {
    description: string
  }
  
  export interface CoursePartBasic extends CoursePartDescription {
    kind: 'basic'
  }
  
  export interface CoursePartGroup extends CoursePartBase {
    kind: 'group'
    groupProjectCount: number
  }
  
  export interface CoursePartBackground extends CoursePartDescription {
    kind: 'background'
    backgroundMaterial: string
  }
  
  export interface CoursePartSpecial extends CoursePartDescription {
    kind: 'special'
    requirements: string[]
  }
  
  export type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial
  