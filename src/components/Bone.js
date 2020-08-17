import React from 'react'

const Bone = (props) => {
    const {isRotten = false} = props
    if(isRotten === true) {
        return <div>R</div>
    }
    return <div>B</div>
}

export default Bone