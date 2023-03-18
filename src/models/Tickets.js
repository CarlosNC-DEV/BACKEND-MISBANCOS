import { Schema, model } from 'mongoose';

const ticketSchema = new Schema(
    {
        nombreCliente:{
            type: String,
        },
        identidadCliente:{
            type: String,
        },
        tipoConsulta:{
            type: String
        },
        codigoTiket:{
            type: String
        },
        enEspera:{
            type: Boolean,
            default: true
        },
        atendiendo:{
            type: Boolean,
            default: false
        },
        atendido:{
            type: Boolean,
            default: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model("Tickets", ticketSchema)