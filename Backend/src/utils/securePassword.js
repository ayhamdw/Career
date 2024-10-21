const securePassword = async (password) => {
  const salt = await bcrypt.genSalt(password);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
module.exports = securePassword;
