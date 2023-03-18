import Tickets from "../models/Tickets.js";

export const crearTiket = async (req, res) => {
  try {
    const { nombreCliente, identidadCliente, tipoConsulta } = req.body;

    if (!nombreCliente || !identidadCliente || !tipoConsulta) {
      return res.status(400).json("Se requieren todos los datos");
    }

    let codigoTicket;
    let numeroTicket;

    if (tipoConsulta === "asesoria") {
      if (!global.asesorias) {
        global.asesorias = { contador: 0 };
      }
      global.asesorias.contador++;
      numeroTicket = global.asesorias.contador.toString().padStart(2, "0");
      codigoTicket = "AS" + numeroTicket;
    } else if (tipoConsulta === "caja") {
      if (!global.cajas) {
        global.cajas = { contador: 0 };
      }
      global.cajas.contador++;
      numeroTicket = global.cajas.contador.toString().padStart(2, "0");
      codigoTicket = "CJ" + numeroTicket;
    }

    const tiketModel = new Tickets(req.body);
    tiketModel.codigoTiket = codigoTicket;

    const tiketSave = await tiketModel.save();

    res
      .status(200)
      .json(
        `Felicidades ${tiketSave.nombreCliente} tu tiket es: ${tiketSave.codigoTiket}`
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const atenderTicket = async (req, res) => {
  try {
    const { id } = req.params;
    await Tickets.findByIdAndUpdate(id, {
      enEspera: false,
      atendiendo: true,
      atendido: false,
    });
    res.status(200).json("Atendiendo");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const terminarAtencion = async (req, res) => {
  try {
    const { id } = req.params;
    await Tickets.findByIdAndUpdate(id, {
      enEspera: false,
      atendiendo: false,
      atendido: true,
    });
    res.status(200).json("Termino la atencion");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
