const express = require('express')
const cors = require('cors')
const app = express()
const sequelize = require('./util/database.js')
const {User} = require('./models/user.js')
const {Post} = require('./models/post.js')
require('dotenv').config()

const { register, login } = require('./controllers/auth.js')
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost } = require('./controllers/posts.js')
const { isAuthenticated } = require('./middleware/isAuthenticated.js')

const {PORT} = process.env



 app.use(express.json())
 app.use(cors())

 // ENDPOINTS

 // AUTH
 app.post('/login', login)
 app.post('/register', register)

// GET POSTS - no auth
 app.get('/posts', getAllPosts)

// CRUD POSTS - auth required
 app.get('/userposts/:userId', getCurrentUserPosts)
 app.post('/posts', isAuthenticated, addPost)
 app.put('/posts/:id', isAuthenticated,editPost)
 app.delete('/posts/:id', isAuthenticated, deletePost)


 User.hasMany(Post)
 Post.belongsTo(User)


// the force: true is for development -- it DROPS tables!!!
// you can use it if you like while you are building
// sequelize.sync({ force: true })

sequelize.sync()
.then(() => {
    app.listen(PORT,() => console.log(`Database sync is successful and the server is running at port ${PORT}`))
})
.catch(err => console.log(err))









