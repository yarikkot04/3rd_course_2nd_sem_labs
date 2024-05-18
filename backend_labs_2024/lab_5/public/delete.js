const hiddenInput = document.querySelector('input[type="hidden"][name="id"]')
const confirmButton = document.querySelector('input[type="button"][value="Yes"]')

const cardId = hiddenInput.value

confirmButton.addEventListener('click', (event) => {
  fetch(`/delete/${cardId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === 0) {
        window.location.href = '/cards'
      } else {
        console.log(res.error)
      }
    })
})
