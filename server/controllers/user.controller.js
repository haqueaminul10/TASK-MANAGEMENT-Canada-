const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { username, email, contactnumber, password } = req.body;

    const newUser = await User.create({
      username,
      email,
      contactnumber,
      password,
    });
    console.log(newUser);

    res.json({ message: "User registered successfully", newUser });
  } catch (err) {
    console.error(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    //console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      "ABCDE",
      { expiresIn: "2d" }
    );
    console.log(token);

    res.json({
      message: "Login successful",
      token: token,
      username: user.username,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, login };
