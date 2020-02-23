
const ADD = "ADD"
const CHECK = "CHECK"
const DELETE = "DELETE"
const todoReducer = (state = [], action) => {
    switch (action.type) {
        case ADD: {
            return [...state, action.payload]
        }
        case CHECK: {
            var id = action.payload.id
            let newstate = state.map((ele) => ele.id === id ? { ...ele, completed: !ele.completed } : ele)
            return newstate
        }
        case DELETE: {
            var id = action.payload.id
            let newstate = state.filter((ele) => {
                if (ele.id !== id) {
                    return ele
                }
            })
            return newstate
        }
        default: {
            return state
        }
    }
}

export default todoReducer