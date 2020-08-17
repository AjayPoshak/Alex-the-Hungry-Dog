import React, {useReducer, useEffect, useRef} from 'react'
import Dog from './Dog'
import Bone from './Bone'

function reducer(state, action) {
    switch (action.type) {
        case 'add_bone_position':
            const {boneRow, boneCol} = action
            const copiedGridList = [...state.gridList]
            copiedGridList[boneRow][boneCol] = 'B'
            return {...state, gridList: copiedGridList}

        case 'init_dog_position': {
            const [dogRow, dogCol] = state.currentDogPosition
            const copiedGridList = [...state.gridList]
            copiedGridList[dogRow][dogCol] = 'D'
            return {...state, gridList: copiedGridList}
        }

        case 'add_rotten_bone_position': {
            const {rottenBoneRow, rottenBoneCol} = action
            const copiedGridList = [...state.gridList]
            copiedGridList[rottenBoneRow][rottenBoneCol] = 'R'
            return {...state, gridList: copiedGridList}
        }

        case 'update_dog_position': {
            const {dogDirection} = state
            const [dogRow, dogCol] = state.currentDogPosition
            let updatedDogRow = dogRow, updatedDogCol = dogCol, updatedDogDirection = dogDirection
            switch (dogDirection) {
                case 'up':
                    updatedDogRow -= 1
                    if(updatedDogRow < 0) {
                        updatedDogDirection = 'down'
                        updatedDogRow = 0
                    }
                    break;
            
                case 'down':
                    updatedDogRow += 1
                    if(updatedDogRow >= 8) {
                        updatedDogDirection = 'up'
                        updatedDogRow = 7
                    }
                    break;

                case 'left':
                    updatedDogCol -= 1
                    if(updatedDogCol < 0) {
                        updatedDogDirection = 'right'
                        updatedDogCol = 0
                    }
                    break;

                case 'right':
                    updatedDogCol += 1
                    if(updatedDogCol >= 8) {
                        updatedDogDirection = 'left'
                        updatedDogCol = 7
                    }
                    break;

                default:
                    break;
            }
            const copiedGridList = [...state.gridList]
            copiedGridList[dogRow][dogCol] = 0
            if(copiedGridList[updatedDogRow][updatedDogCol] === 'B') {
                const {row: boneRow, col: boneCol}  = generateRandomPosition(copiedGridList)
                copiedGridList[boneRow][boneCol] = 'B'
            }
            let gameEnds = false
            if(copiedGridList[updatedDogRow][updatedDogCol] === 'R') {
                console.log('Game Over !!!!!')
                gameEnds = true
            }
            copiedGridList[updatedDogRow][updatedDogCol] = 'D'
            return {
                ...state,
                gameEnds,
                gridList: copiedGridList,
                dogDirection: updatedDogDirection,
                currentDogPosition: [updatedDogRow, updatedDogCol]
            }
        }

        case 'update_dog_direction': {
            return {...state, dogDirection: action.direction,}
        }
        default:
            return {...state}
    }
}


function generateRandomPosition(grid) {
    // bone position randomly
    let randomRow = Math.floor(Math.random() * 100) % 7
    let randomCol = Math.floor(Math.random() * 100) % 7

    while(randomRow >= 0 && randomRow < 8 && randomCol >=0 && randomCol < 8 && grid[randomRow][randomCol] !== 0) {
        randomRow = Math.floor(Math.random() * 100) % 7
        randomCol = Math.floor(Math.random() * 100) % 7
    }
    // bone position in non-empty cell
    return {
        row: randomRow,
        col: randomCol
    }
}

const Grid = (props) => {
    const {N} = props
    let timer = ''
    const gridList = new Array(N).fill(0)
    for(let i=0; i<gridList.length; i++) {
        gridList[i] = new Array(N).fill(0)
    }

    const [state, dispatch] = useReducer(reducer, {gridList, dogDirection: 'down', currentDogPosition: [0,0], gameEnds: false});
    // const gameEndsRef = useRef(state.gameEnds)
    useEffect(() => {
        // dispatch({ type: 'init_dog_position' })
        const {row: boneRow, col: boneCol} = generateRandomPosition(gridList)
        dispatch({ type: 'add_bone_position', boneRow, boneCol })
        const {row: rottenBoneRow, col: rottenBoneCol} = generateRandomPosition(gridList)
        dispatch({ type: 'add_rotten_bone_position', rottenBoneRow, rottenBoneCol })

        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useEffect(() => {
        setInterval(() => {
            dispatch({ type: 'update_dog_position' })
        }, 2000);
    }, [])

    const handleKeyUp = (event) => {
        // const dogDirection = directionRef.current
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
                                return <div className="grid-element" key={index}><Dog /></div>
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