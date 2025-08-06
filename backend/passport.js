const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('./models/User');
const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy;

// Replace these with your actual values
const CLIENTID = process.env.GOOGLE_REAL_CLIENT_ID
const CLIENTSECRET = process.env.GOOGLE_REAL_CLIENT_SECRET

const AppleStrategy = require('passport-apple');


passport.use(new GoogleStrategy(
  {
    clientID: CLIENTID,
    clientSecret: CLIENTSECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Check if user already signed in via Google before
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      // 2. Check if user exists with same email (but not via Google)
      const existingUser = await User.findOne({ email: profile.emails[0].value });

      if (existingUser && !existingUser.googleId) {
        return done(null, false, {
          message: "This email is already registered. Please login using email and password.",
        });
      }

      // 3. If not exists or registered via Google, create a new user
      if (!existingUser) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
        });
        return done(null, user);
      }

      return done(null, false, {
        message: "Something went wrong. Please try a different login method.",
      });

    } catch (err) {
      console.error("Google Strategy Error:", err);
      return done(err, null);
    }
  }
));





passport.serializeUser((user, done) => {
done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});



// MICROSOFT

passport.use('microsoft', new AzureAdOAuth2Strategy({
  clientID: "YOUR_MICROSOFT_CLIENT_ID",
  clientSecret: "YOUR_MICROSOFT_CLIENT_SECRET",
  callbackURL: "http://localhost:5000/api/auth/microsoft/callback",
  tenant: 'common'  // or your specific tenant ID
},
async (accessToken, refreshToken, params, profile, done) => {
  const decoded = jwt.decode(params.id_token);

  let user = await User.findOne({ microsoftId: decoded.oid });

  if (!user) {
    user = await User.create({
      microsoftId: decoded.oid,
      email: decoded.preferred_username,
      name: decoded.name,
    });
  }

  return done(null, user);
}
));


// Apple



passport.use(new AppleStrategy({
  clientID: "com.your.bundle.id",  // Your Service ID (example: com.example.app)
  teamID: "YOUR_TEAM_ID",          // Apple Developer Team ID
  keyID: "YOUR_KEY_ID",             // Key ID generated from Apple Developer
  privateKey: `-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----`, // Your Private Key
  callbackURL: "http://localhost:5000/api/auth/apple/callback",
  scope: ['name', 'email']
},
async (accessToken, refreshToken, idToken, profile, done) => {
  let user = await User.findOne({ appleId: profile.id });

  if (!user) {
    user = await User.create({
      appleId: profile.id,
      email: profile.email,
      name: profile.name ? `${profile.name.firstName} ${profile.name.lastName}` : '',
    });
  }

  return done(null, user);
}
));
