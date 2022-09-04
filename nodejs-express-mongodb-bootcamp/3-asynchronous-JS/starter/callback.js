// Promise
function httpGetAsync(theUrl, resolve) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) resolve(xmlHttp);
  };
  xmlHttp.open('GET', theUrl, true);
  xmlHttp.send(null);
}

const currentPromise = new Promise((resolve, reject) => {
  httpGetAsync('https://picsum.photos/200/300', resolve);
});

const promise2 = new Promise((resolve, reject) => {
  httpGetAsync('https://picsum.photos/200/300', resolve);
});

const promise3 = new Promise((resolve, reject) => {
    httpGetAsync('https://picsum.photos/200/300', resolve);
});

const executeAsync = async () => {
    const response = await currentPromise;
    document.getElementById('img1').setAttribute('src', response.responseURL);
    const response2 = await promise2;
    document.getElementById('img2').setAttribute('src', response2.responseURL);
    const response3 = await promise3;
    document.getElementById('img3').setAttribute('src', response3.responseURL);
}

executeAsync();

// currentPromise
//   .then((data) => {
//     console.log(data);
//     document.getElementById('img1').setAttribute('src', data.responseURL);
//     return promise2;
//   })
//   .then((data) => {
//     document.getElementById('img2').setAttribute('src', data.responseURL);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// function httpGetAsync(theUrl, callback) {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp);
//     }
//     xmlHttp.open("GET", theUrl, true);
//     xmlHttp.send(null);
// }

// httpGetAsync('https://picsum.photos/200/300', (data) => {
//     console.log(data);
// });
