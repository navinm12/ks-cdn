async function fetchIp() {
  const response = await fetch('https://api.ipify.org?format=json')
  const jsonIp = await response.json()
  if (jsonIp?.ip) {
    let pageUrl = window.location.href
    let currentIp = jsonIp.ip

    if (
      sessionStorage.getItem('user_ip') !== currentIp ||
      sessionStorage.getItem('page_url') !== pageUrl
    ) {
      fetch('https://knews-vscaleup-api.herokuapp.com/api/analytics/create', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          ip: currentIp,
          page: pageUrl,
          appVersion: window.navigator.appVersion,
        }),
      })
        .then((response) => {
          sessionStorage.setItem('user_ip', currentIp)
          sessionStorage.setItem('page_url', pageUrl)
        })
        .catch((err) => console.log(err))
    }
  }
}
fetchIp()
