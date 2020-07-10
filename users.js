const users = []

module.exports = {
    addUser: ({id, pseudo})=>{
        const user = {id, pseudo}
        users.push(user)
        return {user}
    },
    removeUser: (id)=>{
        const index = users.findIndex((user)=>user.id === id)
        if(index != -1) return users.splice(index,1)[0]
    },
    getUserById: (id)=> users.find((user)=>user.id === id),
    getAllUsers : ()=> users
}


