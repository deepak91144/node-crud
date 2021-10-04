const expressJwt = require("express-jwt");

exports.isSignedIn = expressJwt({
  secret: "merncrud",
  userProperty: "auth",
  algorithms: ["sha1", "RS256", "HS256"],
});
