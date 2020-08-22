import React, {useReducer, useEffect, useRef} from 'react'

import Dog from './Dog'
import Bone from './Bone'
import reducer, {generateRandomPosition} from './Reducer'


const Grid = (props) => {
    const {N} = props
    let timer = useRef(null)
    const gridList = new Array(N).fill(0)
    for(let i=0; i<gridList.length; i++) {
        gridList[i] = new Array(N).fill(0)
    }
    gridList[0][0] = 'D'
    const [state, dispatch] = useReducer(reducer, {
        gridList,
        speed: 2000,
        isGameOver: false,
        dogDirection: 'down',
        currentDogPosition: [0,0],
    });
    // const gameEndsRef = useRef(state.gameEnds)
    useEffect(() => {
        const {row: boneRow, col: boneCol} = generateRandomPosition(gridList)
        dispatch({ type: 'add_position', row: boneRow, col: boneCol, value: 'B' })
        const {row: rottenBoneRow, col: rottenBoneCol} = generateRandomPosition(gridList)
        dispatch({ type: 'add_position', row: rottenBoneRow, col: rottenBoneCol, value: 'R' })

        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useEffect(() => {
        if(state.isGameOver) return
        timer.current = setInterval(() => {
            dispatch({ type: 'update_dog_position' })
        }, state.speed);

        if(state.isGameOver) {
            clearInterval(timer.current)
            timer.current = null
        }
        return () => {
            if(timer.current) clearInterval(timer.current)
        }
    })

    const handleKeyUp = (event) => {
        switch (event.key) {
            case "ArrowUp":
                dispatch({type: 'update_dog_direction', direction: 'up'})
                break;
            case "ArrowDown":
                dispatch({type: 'update_dog_direction', direction: 'down'})
                break;
            case "ArrowLeft":
                dispatch({type: 'update_dog_direction', direction: 'left'})
                break;
            case "ArrowRight":
                dispatch({type: 'update_dog_direction', direction: 'right'})
                break;

            default:
                break;
        }
    }

    return (
        <section className="grid-container">
            {state.gridList.map((row, index) => {
                return (
                    <section className="row" key={index}>
                        {row.map((element, index) => {
                            if(element === 'D') {
                                return (<div className="grid-element" key={index}>
                                    <Dog direction={state.dogDirection} />
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