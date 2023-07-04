import User from "../domain/user.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userToRegister = await User.fromJson({
    username,
    email,
    password,
  });

  const registeredUser = await userToRegister.registerInDb();

  res.json({ registeredUser });
};
