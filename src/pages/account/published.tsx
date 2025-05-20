import { type JSX } from 'react'
import img from '../../assets/img/empty_box.png'


function PublishedPage(): JSX.Element {


  return (
    <>
        <div>PublishedPage</div>
        <img src={img} />
        <p>Looks like you dont have any published syllabus.</p>
    </>
  )
}

export default PublishedPage