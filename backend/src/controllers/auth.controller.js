import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {

  const { name, lastname, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json( ["The email already exists"],);
    
    const passhash = await bcrypt.hash(password, 10); // String aleatorio para cifrado.
    const newUser = new User({
      name,
      lastname,
      email,
      password: passhash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastname: userSaved.lastname,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not Found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password." });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      name: userFound.name,
      lastname: userFound.lastname,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.payload.id);
  if (!userFound) return res.status(400).json({ message: "user not found" });
  return res.json({
    id: userFound._id,
    name: userFound.name,
    lastname: userFound.lastname,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "1" });

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({ message: "2" });
    console.log(user);
    const userFound = await User.findById(user.payload.id);
    if (!userFound) return res.status(401).json({ message: "No encontrado usuario" });

    return res.json({
      id: userFound._id,
      name: userFound.name,
      lastname: userFound.lastname,
      email: userFound.email,
    });
  });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
    } catch (error) {
    console.error(error);
  }
}


export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.payload.id; // Obtener el ID del usuario desde el token

  try {
    // Obtener el usuario actual
    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

    // Validar que la nueva contraseña tenga al menos 6 caracteres
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
    }

    // Cifrar la nueva contraseña
    const newPasshash = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    userFound.password = newPasshash;
    await userFound.save();

    res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, password } = req.body;
  try {
    const passhash = await bcrypt.hash(password, 10); // String aleatorio para cifrado.
    const userUpdated = await User.findByIdAndUpdate(id, {
      name,
      lastname,
      email,
      password : passhash,
    });
    res.json(userUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const updateUserwoPassword = async (req, res) => {
  const idUser = req.user.payload.id;
  const { name, lastname, email } = req.body;
  try {
    const userUpdated = await User.findByIdAndUpdate(idUser, {
      name,
      lastname,
      email
    });
    res.json(userUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
