console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    messageOne.textContent = 'Loading weather...'
    messageTwo.textContent = ''

    console.log(location)
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log('error message')
                console.log(data)
                messageOne.textContent = data.error
            } else {              
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log('Successfully passed address through function.')
                console.log(data.location)

            }

        })
    })
})