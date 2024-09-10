import mongoose from "mongoose";
import { EnumStatusReuniao } from "../enum/reuniao-status";

export interface ReuniaoInterface {
    idMentoria: mongoose.Types.ObjectId;
    diaReuniao: string;
    status: EnumStatusReuniao;
    feedback: string;
    materialAnexado: string[];
    link: string;
}