export default function reducer(state, action) {
    switch (action.type) {
        case 'add_position': {
            const {row, col, value} = action
            const copiedGridList = [...state.gridList]
            copiedGridList[row][col] = value
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
                state.speed -= 200
                state.score += 1
                copiedGridList[updatedDogRow][updatedDogCol] = 'D'
                return {
                    ...state,
                    score: state.score,
                    speed: state.speed,
                    gridList: copiedGridList,
                    dogDirection: updatedDogDirection,
                    currentDogPosition: [updatedDogRow, updatedDogCol]
                }
            }
            if(copiedGridList[updatedDogRow][updatedDogCol] === 'R') {
                console.log('Game Over !!!!!')
                return {
                    ...state,
                    isGameOver: true,
                    gridList: copiedGridList,
                    dogDirection: updatedDogDirection,
                    currentDogPosition: [updatedDogRow, updatedDogCol]
                }
            }
            copiedGridList[updatedDogRow][updatedDogCol] = 'D'
            return {
                ...state,
                gridList: copiedGridList,
                dogDirection: updatedDogDirection,
                currentDogPosition: [updatedDogRow, updatedDogCol]
            }
        }

        case 'update_dog_direction': {
            return {...state, dogDirection: action.direction,}
        }

        case 'reset_game_state': {
            return {...action.newState}
        }

        case 'start_game': {
            return {...state, shouldStartGame: true}
        }

        default:
            return state
    }
}

export function generateRandomPosition(grid) {
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
