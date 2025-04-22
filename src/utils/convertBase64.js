import nextBase64 from 'next-base64';
import {convertImageUrlToBase64} from './convertPhotoUrlToBase64';

export const convertBase64 = file => {
  //deprecated
  const result = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = error => {
      reject(error);
    };
  });
  result.then(
    res => {
      //   console.log(res);
      return res;
    },
    error => {
      console.log(error);
    }
  );
};

export const encodeFileToBase64 = file => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      const errorMessage = "Invalid parameter: 'file' must be a Blob or File.";
      console.error(errorMessage, file);
      return reject(new Error(errorMessage));
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to Base64: result is not a string.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('FileReader encountered an error while reading the file.'));
    };

    reader.readAsDataURL(file);
  });
};

// export const extractBase64 = async (arr) => {
// 	const base64 = await arr?.map((file) => {
// 		return file?.search('http') !== -1 ? convertImageUrlToBase64(file) : file?.image;
// 	});
// 	console.log('ghghghg', base64);
// };

export const extractBase64 = arr =>
  arr.map(file => (file?.image !== undefined ? file.image : null));

/* USAGE : 
    DESCRIPTION: For every image/file uploaded by the user, create a base64 string for each of those files, and then setFiles to the base64 string, file deatails, and the preview (to display the image uploaded)
  
   acceptedFiles.forEach((file) =>
          encodeFileToBase64(file)
            .then((res) => {
              setFiles((prevValue) => [
                ...prevValue,
                Object.assign({image: res}, file, {
                  preview : URL.createObjectURL(file)
                })
              ]);
            })
            .catch((err) => {
              return err;
            })
        );
  */

// export const base64ToUrl = base64String => {
//   return new Promise((resolve, reject) => {
//     try {
//       if (typeof base64String !== 'string' || !base64String.startsWith('data:')) {
//         reject(new Error('Invalid Base64 string format'));
//         return;
//       }

//       const base64Content = base64String.split(';base64,').pop();
//       const contentType = base64String.split(';')[0].split(':')[1];

//       const byteCharacters = atob(base64Content);
//       const byteNumbers = new Array(byteCharacters.length);

//       for (let i = 0; i < byteCharacters.length; i++) {
//         byteNumbers[i] = byteCharacters.charCodeAt(i);
//       }

//       const byteArray = new Uint8Array(byteNumbers);
//       const fileBlob = new Blob([byteArray], {type: contentType});

//       resolve(URL.createObjectURL(fileBlob));
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const base64ToUrl = async file => {
  const base64String = nextBase64.encode(file);
  // console.log('base64String', base64String);
  return await new Promise((resolve, reject) => {
    try {
      const contentType = 'application/pdf';
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const fileBlob = new Blob([byteArray], {type: contentType});

      resolve(URL.createObjectURL(fileBlob));
    } catch (error) {
      reject(error);
    }
  });
};

export const decodeBase64URL = async file => await base64ToUrl(file).then(res => res);
