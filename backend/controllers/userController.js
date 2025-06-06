const User = require("../model/user");
const Restaurant = require("../model/restaurant");
const Booking = require("../model/bookings");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../model/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmails");
const uploadToCloudinary = require("../utils/cloudinary");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    console.log(req.body);
    console.log(req.params);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const token = new Token({
      userId: user._id,
      token: verificationToken,
    });
    await token.save();

    // Send the verification email
    const verificationUrl = `http://192.168.162.1:5106/app/users/verify-email/${verificationToken}`;
    await sendEmail(
      email,
      "Email Verification",
      `Click the link to verify your email: ${verificationUrl}`
    );

    res.status(201).json({
      message:
        "You have registered successfully. Check your email to verify your account.",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔹 Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 🔹 If user is an owner, fetch restaurant details
    let restaurant = null;
    let bookings = [];

    if (user.isOwner && user.restaurantId) {
      restaurant = await Restaurant.findById(user.restaurantId);
      bookings = await Booking.find({ restaurantId: user.restaurantId });
    }


    // console.log("Userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr:", user.profilePic); // Correct 
    

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isOwner: user.isOwner,
        isAdmin: user.isAdmin,
        profilePic: user.profilePic,
        restaurant,
        bookings, // All bookings for the restaurant
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
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
    res.redirect(
      `http://localhost:8081/app/users/email-verification-success?token=${token}`
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const resSignup = async (req, res) => {
  const { name, email, password, restaurantId } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
      restaurantId,
      isOwner: true,
      verified: true,
    });
    await user.save();

    console.log(req.body);
    console.log(req.params);

    // Generate a verification token
    // const verificationToken = crypto.randomBytes(32).toString("hex");
    // const token = new Token({
    //   userId: user._id,
    //   token: verificationToken,
    // });
    // await token.save();

    res.status(201).json({
      message: "Restaurant have registered successfully. ",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const resLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`Attempting to log in user with email: ${email}`);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // 🔹 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        restaurantId: user.restaurantId,
        isOwner: user.isOwner,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};

const adminFind = async (req, res) => {
  try {
    const users = await User.find(); // Exclude sensitive fields like password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// const updateLoginStatus = async (req, res) => {
//   try {
//     const { userId, isLogedin } = req.body;

//     if (!userId)
//       return res.status(400).json({ message: "User ID is required" });

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { isLogedin },
//       { new: true }
//     );

//     if (!user) return res.status(404).json({ message: "User not found" });

//     return res.status(200).json({ message: "Login status updated", user });
//   } catch (error) {
//     console.error("Error updating login status:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// Update Name
const updateName = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    );
    res.json({ message: "Name updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfilePic = async (req, res) => {
  try {
      console.log("Request Body:", req.body); // Debugging
      console.log("Request User:", req.user); // Debugging
      
      const userId = req.user?.id; // Make sure `req.user` exists
      if (!userId) {
          return res.status(400).json({ error: "User ID not found!" });
      }

      const imageUrl = req.file?.path; // Get the uploaded image URL
      if (!imageUrl) {
          return res.status(400).json({ error: "No file uploaded!" });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: imageUrl }, { new: true });

      res.json({ message: "Profile picture updated successfully", user: updatedUser });
  } catch (error) {
      res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = {
  signup,
  verifyEmail,
  login,
  resSignup,
  findUserById,
  adminFind,
  resLogin,
  updateName,
  updateProfilePic,
};
