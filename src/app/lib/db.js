
/* eslint-disable */
const { username, password } = process.env;//fetch username and password for mongoDb from env.local i didnt hide my username or password we can use extension for the same 
//       For mongoDb Atlas   *************************************

export const URI = "mongodb+srv://" + username + ":" + password + "@cluster0.x74ty.mongodb.net/scrapperDb?retryWrites=true&w=majority&appName=Cluster0";//connection uri from mongoDb atlas


//***********************for LOCALLY connect database */
// export const URI = "mongodb://127.0.0.1:27017/scrapperDb";// if you connect database locally mongodb Atlas
