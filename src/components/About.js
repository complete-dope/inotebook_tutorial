import React , {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'


const About = () => {
  // console.log(noteContext);
  // console.log(useContext(noteContext));
  const a = useContext(noteContext)
  return (
    <>
      <div className='container'>
        This is about js file and is for {a.name} and age is {a.age}
        </div>
    </>
  )
}

export default About