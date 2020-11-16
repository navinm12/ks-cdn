console.log('ready!')

var start = new Date()

window.addEventListener('click', function (e) {
  var firstClick = sessionStorage.getItem('firstClick')
  // console.log("firstClick");
  if (firstClick == 'true') {
    var end = new Date()
    var userIpv4
    var urlpage = window.location.href
    $.getJSON('https://api.ipify.org?format=json', function (data) {
      // Setting text of element P with id gfg
      userIpv4 = data.ip
      sessionStorage.setItem('ip', userIpv4)
    })
    //send data to the server before page close
    var ip = sessionStorage.getItem('ip')
    // console.log(ip);

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
  // console.log("onloadworks");
  sessionStorage.setItem('firstClick', 'true')
  // sessionStorage.setItem("start",start.toString());
}
