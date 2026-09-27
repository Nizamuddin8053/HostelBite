const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

exports.emailFilter = (email) => ({
  email: new RegExp(`^${escapeRegex(email)}$`, "i"),
});
