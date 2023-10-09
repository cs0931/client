# Photo Upload App 
  http://photoapp-host.s3-website-us-west-2.amazonaws.com/
   ### Users
             Admin:   johnsphotos@gmail.com
             Guest:   guestphotos@gmail.com

   Created from AWS Cognito User Pool

# AWS Architecture
![AWSArchitecture](https://github.com/cs0931/client/assets/4726719/9690d5ce-2f3f-4694-9b5c-b25d5a7ff3dc)


## Brief explanation of the implementation

React frontend client calls AWS Cognito Service for authentication and authorization based on UserGroup.Authenticated admin account is navigated to the gallery view with upload functionality. 
After authentication of admin account, 
1) React client calls API Gateway which communicates with AWS Lambda function getImages which gets all the image objects from AWS S3 bucket and provides with preSigned URLs.
2) On upload of image[jpeq,jpg,png], React client calls API Gateway which communicates with AWS Lambda function uploadImage which generates a unique identifier for the image and stores it in AWS S3 and Dynamo DB with the same identifier and the attribute isPublic to denote whether the image is displayed public or private.

After authentication of guest account,
1) React client calls API Gateway which communicates with AWS Lambda function getGuestImages which calls DynamoDB to query and filter out those photo unique identifiers whose isPublic attribute is false, then it queries the AWS S3 bucket for those unique identifiers and responds with presigned URLs.
   
