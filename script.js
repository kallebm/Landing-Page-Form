const form = document.querySelector(".formDecor")

const nameInput = document.querySelector("#nameForm")
const emailInput = document.querySelector("#emailForm")
const telInput = document.querySelector("#telForm")
const interestSelect = document.querySelector("#interestSection")
  
function verifyName (name) {

  return name.value === "" ? false : true
}

function verifyEmail (email) {
  const emailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
  
  return !emailVerify ?  false :   true
}

function verifyPhone (tel) {
  const telVerify = tel.value.length === 15

  return !telVerify ?  false :   true
}

function verifySelect (select) {
  const selectValue = select.options[select.selectedIndex].value
  const selectPlaceHolderValue = select.options[0].value

  return selectValue === selectPlaceHolderValue ? false : true
}

function handleFormStyle () {
  const inputs = [...document.querySelectorAll("input"), interestSelect]

  inputs.forEach((input) => {
    input.style.border = "2px solid transparent"
    input.nextElementSibling.style.display = "none"
  })
}

const handlePhone = (ev) => {
  let input = ev.target
  input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
  if(!value) return ""

  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

const getPhoneNumber = (tel) => {

  let phoneNumber = tel.value.replace("-", "")
  phoneNumber = phoneNumber.replace("(", "")
  phoneNumber = phoneNumber.replace(")", "")
  phoneNumber = phoneNumber.replace(" ", "")
  
  return Number(phoneNumber) 
}

telInput.addEventListener("keydown", handlePhone)


form.addEventListener("submit", async (ev) => {
  ev.preventDefault()

  const errors = []
  const success = []

  !verifyName(nameInput) === true ? errors.push(nameInput) : success.push(nameInput)

  !verifyEmail(emailInput) === true ? errors.push(emailInput) : success.push(emailInput)

  !verifyPhone(telInput) === true ? errors.push(telInput) : success.push(telInput)

  !verifySelect(interestSelect) === true ? errors.push(interestSelect) : success.push(interestSelect)

  if( errors.length > 0) {
    errors.forEach((err) => {
      err.style.border = "2px solid rgb(255, 60, 60)"
      err.nextElementSibling.style.display = "block"
    })
    if (success.length > 0) {
      success.forEach((suc) => {
        suc.style.border = "2px solid rgb(75, 181, 67)" 
        suc.nextElementSibling.style.display = "none"
      })
    }
    return
  }


  const data = {
    name: nameInput.value,
    emailInput: emailInput.value,
    telInput: getPhoneNumber(telInput),
    interest: interestSelect.options[interestSelect.selectedIndex].value
  }

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })

  handleFormStyle()
  form.reset()
  
})



