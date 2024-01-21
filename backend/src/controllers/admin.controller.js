import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";      
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

  export const register = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    try {
      const adminFound = await Admin.findOne({ email });
      if (adminFound) return res.status(400).json( ["The email already exists"],);
      
      const passhash = await bcrypt.hash(password, 10); // String aleatorio para cifrado.
      const newAdmin = new Admin({
        name,
        lastname,
        email,
        password: passhash,
      });
  
      const AdminSaved = await newAdmin.save();
      const token = await createAccessToken({ id: AdminSaved._id });
  
      res.cookie("tokenadmin", token);
      res.json({
        id: AdminSaved._id,
        name: AdminSaved.name,
        lastname: AdminSaved.lastname,
        email: AdminSaved.email,
        createdAt: AdminSaved.createdAt,
        updatedAt: AdminSaved.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      await crearAdminPrincipal();
      const adminFound = await Admin.findOne({ email });
      if (!adminFound) return res.status(400).json({ message: "Admin not Found" });
  
      const isMatch = await bcrypt.compare(password, adminFound.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid Password." });
  
      const token = await createAccessToken({ id: adminFound._id });
      res.cookie("tokenadmin", token);
      res.json({
        id: adminFound._id,
        name: adminFound.name,
        lastname: adminFound.lastname,
        email: adminFound.email,
        createdAt: adminFound.createdAt,
        updatedAt: adminFound.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const logout = (req, res) => {
    res.cookie("tokenadmin", "", {
      expires: new Date(0),
    });
    return res.sendStatus(200);
  };
  
  export const profile = async (req, res) => {
    const adminFound = await Admin.findById(req.user.payload.id);
    if (!adminFound) return res.status(400).json({ message: "Admin not found" });
    return res.json({
      id: adminFound._id,
      name: adminFound.name,
      lastname: adminFound.lastname,
      email: adminFound.email,
      createdAt: adminFound.createdAt,
      updatedAt: adminFound.updatedAt,
    });
  };
  
  export const verifyToken = async (req, res) => {
    const { tokenadmin } = req.cookies;
    if (!tokenadmin) return res.status(401).json({ message: "1" });
  
    jwt.verify(tokenadmin, TOKEN_SECRET, async (error, user) => {
      if (error) return res.status(401).json({ message: "2" });
      console.log(user);
      const adminFound = await Admin.findById(user.payload.id);
      if (!adminFound) return res.status(401).json({ message: "No encontrado usuario" });
  
      return res.json({
        id: adminFound._id,
        name: adminFound.name,
        lastname: adminFound.lastname,
        email: adminFound.email,
      });
    });
  };

  export const getAdmins = async (req, res) => {
    try {
      const admins = await Admin.find();
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const getUserbyName = async (req, res) => {
    try {
      const users = await User.find({name: req.params.name});
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const userDeleted = await User.findByIdAndDelete(id);
      res.json(userDeleted);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

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

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "Fallo en la busqueda del usuario" });
  }
}

export const changePasswordOnly = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  try {
    const passhash = await bcrypt.hash(newPassword, 10); // String aleatorio para cifrado.
    const userUpdated = await User.findByIdAndUpdate(id, {
      password : passhash,
    });
    res.json(userUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

  const crearAdminPrincipal = async () => {
    try {
      const admins = await Admin.find();
      if (admins.length === 0) {
        const passhash = await bcrypt.hash("adminAppPF452312", 10); // String aleatorio para cifrado.
        const newAdmin = new Admin({
          name: "admin",
          lastname: "admin",
          email: "adminAppPF4523@gmail.com",
          password: passhash,
        });
        await newAdmin.save();
      }
    } catch (error) {
      console.log(error);      
    }
  }

  //

  export const getAdminById = async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);
      if (!admin) return res.status(400).json({ message: "Admin not found" });
      res.json(admin);
    } catch (error) {
      res.status(404).json({ message: "Fallo en la busqueda del admin" });
    }
  }

  export const changePasswordOnlyAdmin = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;
    try {
      const passhash = await bcrypt.hash(newPassword, 10); // String aleatorio para cifrado.
      const adminUpdated = await Admin.findByIdAndUpdate(id, {
        password : passhash,
      });
      res.json(adminUpdated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  }

  export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, email} = req.body;
    try {
      const adminUpdated = await Admin.findByIdAndUpdate(id, {
        name,
        lastname,
        email
      });
      res.json(adminUpdated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
      const adminDeleted = await Admin.findByIdAndDelete(id);
      res.json(adminDeleted);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export const createAdmin = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  try {
    // Verificar si el correo electrónico ya existe
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
    }
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo administrador
    const newAdmin = new Admin({
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    // Guardar el nuevo administrador en la base de datos
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}