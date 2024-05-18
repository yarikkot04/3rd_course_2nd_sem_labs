const submitButton = document.querySelector('button[type="button"]')

submitButton.addEventListener('click', (event) => {
  const form = document.querySelector('.edit-form')

  const cardId = form.querySelector('#cardId').value
  const detailName = form.querySelector('#detailName').value
  const processTypeName = form.querySelector('#processTypeName').value
  const duration = form.querySelector('#duration').value
  const creationDate = form.querySelector('#creationDate').value
  const description = form.querySelector('#description').value

  const updatedData = {
    detailName,
    processTypeName,
    duration,
    creationDate,
    description
  }

  fetch(`/edit/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === 0) {
        window.location.href = `/cards/${cardId}`
      } else {
        console.log(res.error)
      }
    })
})
