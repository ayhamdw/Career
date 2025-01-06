import AWS from 'aws-sdk';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
const EXPO_PUBLIC_AWS_ACCESS_KEY_ID = process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID || "";
const EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY = process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY;
const EXPO_PUBLIC_AWS_REGION = process.env.EXPO_PUBLIC_AWS_REGION;
const EXPO_PUBLIC_AWS_BUCKET_NAME = process.env.EXPO_PUBLIC_AWS_BUCKET_NAME;

AWS.config.update({
  accessKeyId: EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: EXPO_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

const uploadImageToS3 = async (newImageName: string, uri: string): Promise<string> => {
  try {
    const imageData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const imageBuffer = Buffer.from(imageData, 'base64');

    const params = {
      Bucket: process.env.EXPO_PUBLIC_AWS_BUCKET_NAME || "", 
      Key: newImageName, 
      Body: imageBuffer,
      ContentType: 'image/jpeg', 
      ACL: 'public-read',
    };


    const data = await s3.upload(params).promise();

    console.log('Image uploaded successfully:', data.Location);
    return data.Location; 
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw new Error('Failed to upload image to S3');
  }
};

const uploadFileToS3 = async (newFileName: string, uri: string): Promise<string> => {
  try {
    const fileData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const fileBuffer = Buffer.from(fileData, 'base64');

    const params = {
      Bucket: process.env.EXPO_PUBLIC_AWS_BUCKET_NAME || "", 
      Key: newFileName, 
      Body: fileBuffer,
      ContentType: 'application/pdf', 
      ACL: 'public-read',
    };

    const s3Response = await s3.upload(params).promise();
    return s3Response.Location; // Return the public URL of the uploaded file
  } catch (error) {
    console.error("Failed to upload file to S3:", error);
    throw error;
  }
};


const getImageUrl = (fileName: string): string => {
  const bucketUrl = `https://${EXPO_PUBLIC_AWS_BUCKET_NAME}.s3.${EXPO_PUBLIC_AWS_REGION}.amazonaws.com/`;
  const imageUrl = `${bucketUrl}${fileName}`;
  return imageUrl;
};

const deleteObject = (key:string) => {

  s3.deleteObject({
    Bucket: "${EXPO_PUBLIC_AWS_BUCKET_NAME}",
    Key: key
  },function (err,data){})
}

export default { uploadImageToS3, getImageUrl , deleteObject,uploadFileToS3 };
