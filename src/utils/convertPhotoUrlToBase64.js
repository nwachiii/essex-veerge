export const getBase64ImageFromUrl = async imageUrl => {
  var res = await imageUrl;
  // var blob = await res?.blob();

  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.addEventListener(
      'load',
      function () {
        resolve(reader.result);
      },
      false
    );

    reader.onerror = () => {
      return reject(this);
    };
    reader.readAsDataURL(res);
  });
};

export const convertImageUrlToBase64 = imageUrl => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = reject;
    xhr.open('GET', imageUrl);
    xhr.responseType = 'blob';
    xhr.send();
  });
};

// async function getBase64ImageFromUrl(imageUrl) {
// 	var res = await fetch(imageUrl);
// 	var blob = await res.blob();

// 	return new Promise((resolve, reject) => {
// 		var reader = new FileReader();
// 		reader.addEventListener(
// 			'load',
// 			function () {
// 				resolve(reader.result);
// 			},
// 			false
// 		);

// 		reader.onerror = () => {
// 			return reject(this);
// 		};
// 		reader.readAsDataURL(blob);
// 	});
// }

// getBase64ImageFromUrl('https://graph.facebook.com/3938027626271800/picture?type=normal')
// 	.then((result) => console.log(result))
// 	.catch((err) => console.error(err));
