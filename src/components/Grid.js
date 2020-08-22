import React from 'react'

import Dog from './Dog'
import Bone from './Bone'


const Grid = (props) => {
    const {N, gridList, dogDirection} = props
    return (
        <section className="grid-container">
            {gridList.map((row, index) => {
                return (
                    <section className="row" key={index}>
                        {row.map((element, index) => {
                            if(element === 'D') {
                                return (<div className="grid-element" key={index}>
                                    <Dog direction={dogDirection} />
                                    </div>)
                            }
                            if(element === 'B') {
                                return <div className="grid-element" key={index}><Bone isRotten={false}/></div>
                            }
                            if(element === 'R') {
                                return <div className="grid-element" key={index}><Bone isRotten/></div>
                            }
                            return <span className="grid-element" key={index}></span>
                        })}
                    </section>
                )
            })}
        </section>
    )
}

export default Grid