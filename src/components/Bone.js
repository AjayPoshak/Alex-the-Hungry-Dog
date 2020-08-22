import React from 'react'
import BoneSVG from '../icons/bone.svg'
import RottenMeatSVG from '../icons/rotten_meat.svg'

const Bone = (props) => {
    const {isRotten = false} = props
    if(isRotten === true) {
        return <img className="bone rotten" src={RottenMeatSVG} alt="" />
    }
    return <img className="bone" src={BoneSVG} alt="" />
}

export default Bone