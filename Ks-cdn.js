async function fetchIp() {
        const response = await fetch('https://api.ipify.org?format=json')
        const jsonIp = await response.json()
        if (jsonIp?.ip) {
          let pageUrl = window.location.href
          let currentIp = jsonIp.ip

          // document.addEventListener('click', function () {
          if (
            sessionStorage.getItem('user_ip') !== currentIp ||
            sessionStorage.getItem('page_url') !== pageUrl
          ) {
            // let end = TimeMe.getTimeOnCurrentPageInSeconds()

            fetch('https://knews-vscaleup-api.herokuapp.com/api/analytics/create', {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              method: 'post',
              body: JSON.stringify({
                // timeSpent: end,
                ip: currentIp,
                page: pageUrl,
                appVersion: window.navigator.appVersion,
                pageTitle: document.title.split('|')[0],
                // category: document.title.split('|')[1],
              }),
            })
              .then((response) => {
                sessionStorage.setItem('page_title', document.title)
                sessionStorage.setItem('user_ip', currentIp)
                sessionStorage.setItem('page_url', pageUrl)
              })
              .catch((err) => console.log(err))
          }
          // })
        }
      }
      // TimeMe.initialize({
      //   currentPageName: 'my-home-page', // current page
      //   idleTimeoutInSeconds: 30, // seconds
      // })
      fetchIp()
