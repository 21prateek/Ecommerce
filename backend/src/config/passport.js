import passport from "passport";
import { Strategy as GoogleStrategy } from "passport";
import { db } from "../db/db";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //accessToken: Lets you call Google APIs on behalf of the user (you can ignore it if not using).
      //refreshToken: Can be used to refresh the accessToken.
      //profile: Contains the user's info (like email, name).
      //done: A function you must call to pass the authenticated user to Passport
      const email = profile.emails[0].value; //select the email which we want

      let user = await db.user.findUnique({ where: { email } }); //search it in our database

      //if not found then create one
      if (!user) {
        user = await db.user.create({
          data: {
            email,
            name: profile.displayName,
            password: "",
            provider: "GOOGLE", // <- HERE , as here we are not setting a password , and if someone try to login  using our email in that website login they wont be able to pass through because in that we have set to null while registering , and here we are putting value to it
            role: "USER",
          },
        });
      }

      done(null, user);
    }
  )
);

//It usually stores the user ID (not the whole user object — that would be too large and insecure).Defines what gets stored in the session cookie.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Fetch the full user object from the DB using the ID stored in the session cookie.
passport.deserializeUser(async (id, done) => {
  const user = await db.user.findUnique({ where: { id } });
  done(null, user);
});

//Flow is like this
//User logs in with Google -> Passport authenticates them -> passport.serializeUser(user) → stores user.id in session ->Passport reads cookie : gets user.id -> Calls deserializeUser(user.id) : fetches full user ->  Sets req.user = user
