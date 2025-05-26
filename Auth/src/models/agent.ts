import { UserType } from "@insureit/common";
import { User, UserAttrs } from "./user";
import mongoose, { mongo } from "mongoose";

export interface AgentAttrs extends UserAttrs {
    branch: string;
    salesManagers?: mongoose.Schema.Types.ObjectId[];
}

interface AgentDoc extends mongoose.Document {
    branch: string;
    salesManagers?: mongoose.Schema.Types.ObjectId[];
}

interface AgentModel extends mongoose.Model<AgentDoc> {
    build(attrs: AgentAttrs): AgentDoc;
}

const agentSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true,
    },
    salesManagers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SalesManager",
        },
    ],
});

agentSchema.statics.build = (attrs: AgentAttrs) => {
    return new Agent({
        name: attrs.name,
        email: attrs.email,
        password: attrs.password,
         mobile: attrs.mobile,
        branch: attrs.branch,
        salesManagers: attrs.salesManagers || [],
    });
}

const Agent = User.discriminator<AgentDoc, AgentModel>("Agent", agentSchema);

export { Agent };