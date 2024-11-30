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
    // Read file from the provided URI
    const imageData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

    // Convert base64 to Buffer for S3 upload
    const imageBuffer = Buffer.from(imageData, 'base64');

    // Set up S3 upload parameters
    const params = {
      Bucket: process.env.EXPO_PUBLIC_AWS_BUCKET_NAME || "", // Your S3 bucket name
      Key: newImageName, // Desired file name in the bucket
      Body: imageBuffer, // File data
      ContentType: 'image/jpeg', // Adjust content type as needed
      ACL: 'public-read', // Set the file as public read
    };

    // Upload the image to S3
    const data = await s3.upload(params).promise();

    // Return the URL of the uploaded image
    console.log('Image uploaded successfully:', data.Location);
    return data.Location; // URL to save in MongoDB or elsewhere
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw new Error('Failed to upload image to S3');
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

export default { uploadImageToS3, getImageUrl , deleteObject };
