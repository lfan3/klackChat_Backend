const messages = []

module.exports = {
    addMessage: ({id, messagesArr})=>{
        messagesArr.forEach(each=>{
            messages.push({id, each})
        })
    },
}


