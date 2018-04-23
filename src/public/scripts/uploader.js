/* eslint-disable */
const init = () => {
  const form = document.getElementById('uploader')
  const error = document.getElementById('error')
  const info = document.getElementById('info')
  form.onsubmit = e => {
    e.preventDefault()
    const name = form.elements[0].value
    const files = form.elements[1].files
    if (!name) {
      error.innerText = 'Name Required'
      return false
    }
    if (files.length === 0) {
      error.innerText = 'File Required'
      return false
    }
    upload(name, files[0], error, info)
    return false
  }
}

const upload = function(name, file, error, info) {
  const xhr = new XMLHttpRequest()
  const _form = new FormData()
  _form.append('name', name)
  _form.append('file', file)
  xhr.onreadystatechange = function(e) {
    if (4 == this.readyState) {
      const res = JSON.parse(xhr.response)
      if (res.info) {
        info.innerText = res.info
      }
      if (res.error) {
        error.innerText = res.error
      }
    }
  }
  xhr.open('post', '/files/new', true)
  xhr.send(_form)
  info.innerText = 'Uploading'
}
window.addEventListener('load', init)
/* eslint-enable */
