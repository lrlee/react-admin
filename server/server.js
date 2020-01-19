import express from 'express'
import path from 'path'
import loader from './loader'
const server = express()
console.log(222)
server.use(loader)
server.listen(3001, function() {
    console.log(`Server is running on port 3000`);
})