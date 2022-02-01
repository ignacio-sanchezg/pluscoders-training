// presentation

let id // user id

var user

let _token

const loginView = document.querySelector('.login')
const registerView = document.querySelector('.register')
const homeView = document.querySelector('.home')
const profileView = document.querySelector('.profile')
const passwordView = document.querySelector('.password')
const unregisterView = document.querySelector('.unregister')

const loginRegisterLink = loginView.querySelector('.button--signin')

loginRegisterLink.onclick = function (event) {
  event.preventDefault()

  loginForm.email.value = ''
  loginForm.password.value = ''

  const feedback = loginForm.querySelector('.feedback')

  feedback.innerText = ''
  feedback.classList.add('off')

  registerForm.firstname.value = ''
  registerForm.lastname.value = ''
  registerForm.city.value = ''
  registerForm.country.value = ''
  registerForm.email.value = ''
  registerForm.password.value = ''

  loginView.classList.add('off')

  registerView.classList.remove('off')
}
const registerLoginLink = registerView.querySelector('.button--signin')

registerLoginLink.onclick = function (event) {
  event.preventDefault()

  registerView.classList.add('off')

  loginView.classList.remove('off')
}

const registerForm = registerView.querySelector('form')

registerForm.onsubmit = function (event) {
  event.preventDefault()


  const firstname = registerForm.firstname.value
  const lastname = registerForm.lastname.value
  const city = registerForm.city.value
  const country = registerForm.country.value
  const email = registerForm.email.value
  const password = registerForm.password.value

  //console.log(firstname, lastname, city, country, email, password)

  const feedback = registerForm.querySelector('.feedback')

  try {
    registerUser(firstname, lastname, city, country, email, password, error => {
      if (error) return alert(error.message)

      registerForm.firstname.value = ''
      registerForm.lastname.value = ''
      registerForm.city.value = ''
      registerForm.country.value = ''
      registerForm.email.value = ''
      registerForm.password.value = ''

      registerView.classList.add('off')

      loginView.classList.remove('off')
    })
  } catch (error) {
    feedback.innerText = error.message

    feedback.classList.remove('off')
  }

}

const loginForm = loginView.querySelector('form')

loginForm.onsubmit = function (event) {
  event.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  const username = loginForm.email.value

  console.log(email, password)

  const feedback = loginForm.querySelector('.feedback')

  try {
    //id = authenticateUser(email, password)

    //const user = retrieveUser(id)

    authenticateUser(email, password, (error, token) => {
      if (error) {
        if (error instanceof ServerError)
          feedback.innerText = 'Sorry, the was an error an we will fix it as soon as possible'
        else
          feedback.innerText = error.message

        feedback.classList.remove('off')

        return
      }

      try {
        retrieveUser(token, (error, user) => {
          if (error) {
            feedback.innerText = error.message

            feedback.classList.remove('off')

            return
          }

          _token = token

          //console.log(token)

          loginForm.email.value = ''
          loginForm.password.value = ''

          loginView.classList.add('off')

          const homeTitle = homeView.querySelector('a')

          homeTitle.innerText = 'Hello,' + user.firstname + '!'

          homeView.classList.remove('off')


        })
      } catch (error) {
        feedback.innerText = error.message

        feedback.classList.remove('off')
      }

    })

  } catch (error) {
    feedback.innerText = error.message

    feedback.classList.remove('off')
  }

}

const homeProfileLink = homeView.querySelector('#myLinks #profile')

homeProfileLink.onclick = function (event) {
  event.preventDefault()

  //const user = retrieveUser(id)
  const token = _token

  try {
    retrieveUser(token, (error, user) => {
      if (error) {
        feedback.innerText = error.message

        feedback.classList.remove('off')

        return
      }

      const profileForm = profileView.querySelector('form')

      profileForm.firstname.value = user.firstname
      profileForm.lastname.value = user.lastName
      profileForm.city.value = user.city
      profileForm.country.value = user.country
      profileForm.email.value = user.username

      homeView.classList.add('off')

      profileView.classList.remove('off')
    })
  } catch (error) {
    alert(error.message)
  }

}

const profilePasswordLink = profileView.querySelector('.profile__password-button')

profilePasswordLink.onclick = function (event) {
  event.preventDefault()

  profileView.classList.add('off')

  passwordView.classList.remove('off')

}

const passwordForm = passwordView.querySelector('form')

passwordForm.onsubmit = function (event) {
  event.preventDefault()

  const oldPassword = passwordForm.oldPassword.value
  const password = passwordForm.password.value

  const token = _token

  try {
    updateUserPassword(token, oldPassword, password, (error, user) => {
      if (error) {
        feedback.innerText = error.message

        feedback.classList.remove('off')

        return
      }

      const passwordForm = passwordView.querySelector('form')


      profileView.classList.remove('off')

      passwordView.classList.add('off')
    })
  } catch (error) {
    alert(error.message)
  }
}

const passwordProfileLink = password.querySelector('.password__back-button')

passwordProfileLink.onclick = function (event) {
  event.preventDefault()

  passwordView.classList.add('off')

  profileView.classList.remove('off')

}


const homeSignoutLink = homeView.querySelector('#myLinks #signout')

homeSignoutLink.onclick = function (event) {
  event.preventDefault()

  id = undefined

  homeView.classList.add('off')

  loginView.classList.remove('off')

}

const profileForm = profileView.querySelector('form')

profileForm.onsubmit = function (event) {
  event.preventDefault()

  const feedback = profileForm.querySelector('.feedback')

  feedback.innerText = ' '
  feedback.classList.add('off')

  const token = _token

  const firstname = profileForm.firstname.value
  const lastname = profileForm.lastname.value
  const city = profileForm.city.value
  const country = profileForm.country.value
  const email = profileForm.email.value
  // const password = profileForm.password.value


  try {
    updateUser(token, firstname, lastname, city, country, email, error => {
      if (error) return alert(error.message)

      const homeTitle = homeView.querySelector('a')
    })
  } catch (error) {
    feedback.innerText = error.message

    feedback.classList.remove('off')
  }
}

const profileUnregisterLink = profileView.querySelector('.profile__unregister-button')

profileUnregisterLink.onclick = function (event) {
  event.preventDefault()

  profileView.classList.add('off')

  unregisterView.classList.remove('off')

}

const unregisterProfileLink = unregisterView.querySelector('.unregister__back-button')

unregisterProfileLink.onclick = function (event) {
  event.preventDefault()

  unregisterView.classList.add('off')

  profileView.classList.remove('off')

}



const unregisterForm = unregisterView.querySelector('form')

unregisterForm.onsubmit = function (event) {
  event.preventDefault()

  const feedback = unregisterForm.querySelector('.feedback')

  feedback.innerText = ' '
  feedback.classList.add('off')

  const token = _token

  const password = unregisterForm.password.value

  try {
    unregisterUser(token, password, error => {
      if (error) {
        return alert(error.message)
      }
      else {
        return alert('user unregistred')

      }


    })
    unregisterView.classList.add('off')
    loginView.classList.remove('off')

  } catch (error) {
    feedback.innerText = error.message

    feedback.classList.remove('off')
  }
}

const profileBackButton = profileView.querySelector('.profile__back-button')

profileBackButton.onclick = function () {
  profileView.classList.add('off')

  const token = _token

  retrieveUser(token, (error, user) => {
    if (error) {
      feedback.innerText = error.message

      feedback.classList.remove('off')

      return
    }

    const homeTitle = homeView.querySelector('a')

    homeTitle.innerText = 'Hello,' + user.firstname + '!'

    homeView.classList.remove('off')


  })

}


// search form


const searchForm = homeView.querySelector('form')

searchForm.onsubmit = function (event) {
  event.preventDefault()

  const results = homeView.querySelector('.results')
  results.innerHTML = ''

  const query = searchForm.brand.value
  const model = searchForm.model.value

  const filtered = searchVehicles(query, model)

  if (filtered.length) {
    const list = document.createElement('ul')

    filtered.forEach(function (car) {
      const result = document.createElement('li')

      const name = document.createElement('h3')
      const thumbnail = document.createElement('img')
      const price = document.createElement('span')
      const button = document.createElement('button')
      button.classList.add('button--small')

      name.innerText = car.name + ' (' + car.id + ')'
      thumbnail.src = car.thumbnail
      price.innerText = car.price + ' $'
      button.innerText = 'Add to basket'

      result.append(name, thumbnail, price, button)

      list.append(result)
    })

    results.append(list)
  } else {

    const error = document.createElement('p')

    error.innerText = 'No matches found with brand ' + searchForm.brand.value + " and model " + searchForm.model.value

    results.append(error)
  }

  results.classList.remove('off')
}


const cart = homeView.getElementsByClassName('button--small')


cart.onclick = function (event) {
  event.preventDefault()

  const cartResult = homeView.querySelector('.cartResult')
  cartResult.innerHTML = ''

  const counter = counterCart()

}

// const counts = 0;
// (".button--small").click(function () {
//   counts += +1;
//   (".cart-counter").animate({
//     (this).text(counts)
// });

