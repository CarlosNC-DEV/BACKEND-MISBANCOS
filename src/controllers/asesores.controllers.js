import Asesores from "../models/Asesores.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import Tickets from "../models/Tickets.js";

export const crearAsesor = async (req, res) => {
  try {
    const { usuario, correo, password } = req.body;
    if (!usuario || !correo || !password) {
      return res.status(400).json("Todos los datos son requeridos");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const asesorModel = new Asesores(req.body);
    asesorModel.password = hashedPassword;

    await asesorModel.save();

    res.status(200).json("Asesor creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const auchAsesor = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const asesorExiste = await Asesores.findOne({ correo: correo });
    if (!asesorExiste) {
      return res.status(400).json("Correo Incorrecto");
    }

    const validarPassword = await bcryptjs.compare(
      password,
      asesorExiste.password
    );
    if (!validarPassword) {
      return res.status(400).json("Contraseña Incorrecto");
    }

    const token = jwt.sign({ asesorId: asesorExiste._id }, JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};