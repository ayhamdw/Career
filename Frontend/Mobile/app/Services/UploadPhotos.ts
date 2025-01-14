import uuid from "react-native-uuid";
import Amazon from "./Amazon";

  const uploadPhotos = async (tempPhotos,id) => {
    const photos = [];
    for (const element of tempPhotos) {
      const uniqueId = uuid.v4();
      const photo = element;
      const ext = photo.split(".").pop();
      const newFileName = `projects/${id}/${uniqueId}.${ext}`.trim();
      const url = await Amazon.uploadImageToS3(newFileName, photo);
      photos.push(url);
    }
    return photos;
  };

  export {uploadPhotos} ;