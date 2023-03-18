import { Schema, model } from 'mongoose';

const asesoresSchema = new Schema(
    {
        usuario:{
            type: String
        },
        correo:{
            type: String
        },
        password: {
            type: String
        }
    },
    {
        versionKey: false
    }
)

export default model("Asesores", asesoresSchema)