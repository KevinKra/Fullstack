# BACKEND

##OAUTH
####Passport

- automates multiple OAuth steps.
- 2 common complaints with Passport: One, it does help automate the OAuth flow, but it requires us to reach in for certain parts of the flow. Obscures the big picture and limits deeper understanding. Two, the inherent confusion regarding how the library is actually structured. Passport actually requires at least two different libraries: `passport` and `passport strategy`.

####Passport (Core)

- Generic logic in a library that handles the authentication logic within express.

####Passport Strategies

- Implementing OAuth flow with specific providers: Google, Facebook, etc. Each passport strategy is required to handle a specific OAuth. If you want 4 different options, you need to use 4 different passport strategies.

####Dependencies (for Google)

- passport, passport-google-oauth20 (short for 2.0 `npm install passport-google-oauth20@2 --save`)

###Theory of Authentication

- What is the value and purpose of OAuth?
- HTTP is stateless (duh, also AJAX requests are also just HTTP requests), it has no way to identify or share information between two different requests. Authentication resolves this by tracking the data between the initial request, and the follow up after it's been validated.
- User logs in, a unique token (or cookie, etc) is given back by the server proving that the user made the request. When the user makes a follow up request to the server (same day, a week later, whenever), the server will be provided the token and determine it's the same/correct user and return the appropriate data in response.

#### continued

- a header will be included inside the response sent back to the browser with a property called `Set-Cookie` with a value token string which will identify the user.
- browser will automatically strip the token, store it in the browsers memory, then the browser will automatically append that cookie/token to any other requests made to the server.
- the google profile's ID is the data we will use to determine that the user is the same between all login/interactions.
- logging out "unsets" the cookie/token
- new user: Google Account checked against mongoDB, if user is not in the database create a new user. The assumption is that any user, new or not, may be an existing user and we will need to first check that.
- returning user: Check against mongoDB if match, no need to create new account, instead return matching mongoDB user data.
- SUMMARY: We simply use OAuth to leverage the security and reliability of Google to confirm profiles and then garner a unique id from the google account that the user provided. That unique id will be used to check against the local mongoDB to determine whether the user is new or returning.

##MongoDB

- comprised of `collections` which contain n `records`. Example: collection of users, posts, payments, etc.
- `records` in collections are JSON objects, simply key-value pairs.
- Important!: MongoDB is a schema-less database. Which means each `record` in a `collection` can have unique properties. This is directly contrasting to traditional SQL / relational databases where every single `record` would need to have matching properties. However, leveraging Mongoose requires a schema to be built.

###Mongoose

- a `Model Class` represents an entire MongoDB collection. Each instance of this `Model Class` is a `Model Instance` that represents a single mongoDB `record`.
- 1 (Mongoose) `Model Class` === 1 (Mongo) `Collection`
- 1 (Mongoose) `Model Instance` === 1 (Mongo) `Record`
- Mongoose curtails the ability to have random properties on records, mongoose needs a schema to be built. Additionally, you can freely add / remove schema properties.

####Saving Model Instances

- When a `Model Instance` is created ( ex: `new User({ googleId: profile.id })` ), it will not persist because does not yet exist on the database. In order to save the `Model Instance` to the database the `.save()` method must be called on it.

####Querying Collections

- Any query made to the MongoDB is an asynchronous function. We have to interact with promises when querying the database.
- Check database to make sure duplicates (user accounts for instance) are not being created.
