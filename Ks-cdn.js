console.log('ready!')
var start = new Date()
window.addEventListener('click', function (e) {
  var firstClick = sessionStorage.getItem('firstClick')
  if (firstClick == 'true') {
    var end = new Date()
    var userIpv4
    var urlpage = window.location.href

    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((response) => {
        userIpv4 = response.ip
        sessionStorage.setItem('ip', userIpv4)
      })
      .catch((err) => console.log(err))
    var ip = sessionStorage.getItem('ip')
    fetch('https://knews-vscaleup-api.herokuapp.com/api/analytics/create', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        timeSpent: Math.floor((end - start) / 1000),
        ip: ip,
        page: urlpage,
        appVersion: window.navigator.appVersion,
      }),
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err)
      })
    sessionStorage.setItem('firstClick', 'false')
  }
})

window.onload = function () {
  sessionStorage.setItem('firstClick', 'true')
}
