const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const helpers = require('handlebars-helpers')()
const app = express()
const port = 3000
const session = require('express-session')
const userVerify = require('./user_verify')
const passwordVerify = require('./password_verify')
const getUserInfo = require('./get_user_info')
let user = ''
let newEmail = ''

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'mercedes',
  cookie: {
    maxAge: 60 * 1000  //ms
  }
}))

app.get('/', (req, res) => {
  if (req.session.name) {
    res.redirect(`${user.firstName}`)
  } else res.render('index')
})

app.post('/create_account', (req, res) => {
  newEmail = req.body.email
  console.log(req.body)
  res.render('create')
})


// 第一階段判斷用戶帳號存在
app.post('/login-1', (req, res) => {
  user = getUserInfo(req.body)
  if (userVerify(user)) {
    res.redirect(`/login-2`)
  } else {
    res.render('index', { result: false, wrongEmail: req.body.email })
  }
})

app.get('/login-2', (req, res) => {
  if (req.session.name) {
    res.redirect(`${user.firstName}`)
  } else {
    res.render('password', { email: user.email })
  }
})

// 第二階段比對用戶帳號密碼
app.post('/login-2', (req, res) => {
  if (passwordVerify(user.email, req.body.password)) {

    // 成功登入就在session加入name
    req.session.name = `${user.firstName}`
    res.redirect(`/${user.firstName}`)
  } else {
    res.render('password', { result: false, email: user.email })
  }
})

// 進入個人頁面
app.get('/:username', (req, res) => {
  if (req.session.name) {
    res.render('profile', { userName: user.firstName, email: user.email })
  } else {
    res.redirect('/')
  }
})

app.post('/logout', (req, res) => {
  // 登出要銷毀 session
  req.session.destroy()
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})