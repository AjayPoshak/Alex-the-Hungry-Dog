import React from 'react'
import DogSVG from '../icons/dog.svg'

const Dog = ({direction}) => {
    return <img className={`dog ${direction}`} src={DogSVG} />
}

export default Dog