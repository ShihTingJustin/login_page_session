function userVerify(input) {
  const users = [
    {
      firstName: 'Tony',
      email: 'tony@stark.com',
      password: 'iamironman'
    },
    {
      firstName: 'Steve',
      email: 'captain@hotmail.com',
      password: 'icandothisallday'
    },
    {
      firstName: 'Peter',
      email: 'peter@parker.com',
      password: 'enajyram'
    },
    {
      firstName: 'Natasha',
      email: 'natasha@gamil.com',
      password: '*parol#@$!'
    },
    {
      firstName: 'Nick',
      email: 'nick@shield.com',
      password: 'password'
    }
  ]
  const userCheck = users.filter(u => u.email === input.email)
  if (userCheck.length > 0) {
    return true
  } else {
    return false
  }
}

module.exports = userVerify
// let input = { email: 'captain@hotmail.com' }
// userVerify(input)