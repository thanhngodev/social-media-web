import imageCompression from 'browser-image-compression';
import { storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '../firebase';


export const compressFile = async(file) => {
    const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.log(error);
    }
};

export const uploadFireBase = (file,fileName) => {
    return new Promise((resolve, reject) => {
        const metadata = {
            contentType: file.type
        };
        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                
                const progress = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress);
            }, 
            (error) => {
                reject(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    resolve(url);
                });
            }
        );
    });
};

export const deleteImage = (imageName) => {
    const desertRef = ref(storage, "images/"+imageName);
    deleteObject(desertRef).then().catch((err) => {
        console.log(err);
    })
};