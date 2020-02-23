const ADD = "ADD"
const CHECK = "CHECK"
const DELETE = "DELETE"
const add = (item, id) => ({
    type: ADD,
    payload: {
        itemName: item,
        completed: false,
        id: id
    }
})

const check = (value) => ({
    type: CHECK,
    payload: {
        id: value
    }
})
const del = (value) => ({
    type: DELETE,
    payload: {
        id: value
    }
})

export { add, check, del }