

To Run the app you need to run below two steps, 

1. create a apikey key from below site, each mail id can generate only one free key which has limitations per 24 hours.
https://www.coinapi.io/pricing?apikey
2. create a local instance of mongodb or create a cluster on 
https://www.mongodb.com/cloud/atlas
3. once bothe the above steps are done create a .env file in the directory at parent level with below values

MONGODB_URL='local or atlas url'
SECRET="anycomplexsecretforjwt"
COINAPI='keygenerated on coinapi'

once you complete the above steps you can run below steps to run your application.

### `npm install`

### `npm start`

once aboce both steps are run successfull, you can call the api's on http://localhost:8080/
