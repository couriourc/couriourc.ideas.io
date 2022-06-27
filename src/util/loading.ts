function setLoading() {
  let app
  let loading
  document.addEventListener('DOMContentLoaded', (e) => {
    console.log(e)
    app = document.querySelector('#app')
    app.style.display = 'none'

    loading = document.querySelector('#loading')
  })
  window.addEventListener('load', (e) => {
    console.log(e)
    app.style.display = ''
    loading.remove()
  })
}
setLoading()
