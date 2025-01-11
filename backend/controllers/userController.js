const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../model/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmails");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();
    
    console.log(req.body)
    console.log(req.params)

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const token = new Token({
      userId: user._id,
      token: verificationToken,
    });
    await token.save();

    // Send the verification email
    const verificationUrl = `${process.env.BASE_URL}/app/users/verify-email/${verificationToken}`;
    await sendEmail(
      email,
      "Email Verification",
      `Click the link to verify your email: ${verificationUrl}`
    );

    res.status(201).json({
      message:
        "User registered successfully. Check your email to verify your account.",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  console.log(req.body)
  console.log(req.params)

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user's email is verified
    if (!user.verified) {
      return res
        .status(400)
        .json({ message: "Please verify your email before logging in." });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password!" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const verificationToken = await Token.findOne({ token });
    if (!verificationToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(verificationToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verified = true;
    await user.save();
    await verificationToken.deleteOne();

    // Redirect user to frontend success page after verification
    res.redirect(`http://localhost:8081/app/users/email-verification-success?token=${token}`);
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = { signup, verifyEmail, login };
