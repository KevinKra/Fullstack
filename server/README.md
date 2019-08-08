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
