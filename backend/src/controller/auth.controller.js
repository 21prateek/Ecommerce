import { db } from "../db/db.js";
import bcrypt from "bcryptjs";
import { generateToken, cookieOptions } from "../utils/auth.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendError(res, 400, "Name, email, and password are required");
  }

  try {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return sendError(res, 400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "USER",
      },
    });

    const token = generateToken(user.id);
    res.cookie("jwt", token, cookieOptions);

    return sendSuccess(res, 201, "User created successfully", {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    return sendError(res, 500, "Internal server error", err.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 400, "Email and password are required");
  }

  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return sendError(res, 403, "Invalid email or password");
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return sendError(res, 403, "Invalid email or password");
    }

    const token = generateToken(user.id);
    res.cookie("jwt", token, cookieOptions);

    return sendSuccess(res, 200, "User logged in successfully", {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return sendError(res, 500, "Internal server error", err.message);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", cookieOptions);
    return sendSuccess(res, 200, "User logged out successfully");
  } catch (err) {
    console.error("Logout error:", err);
    return sendError(res, 500, "Internal server error", err.message);
  }
};
