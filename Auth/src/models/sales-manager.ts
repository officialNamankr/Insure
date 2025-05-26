import { UserType } from "@insureit/common";
import { User, UserAttrs } from "./user";
import mongoose from "mongoose";

export interface SalesManagerAttrs extends UserAttrs {
    branch: string;
    agents?: mongoose.Schema.Types.ObjectId[];
}

interface SalesManagerDoc extends mongoose.Document {
    branch: string;
    agents?: mongoose.Schema.Types.ObjectId[];
}

interface SalesManagerModel extends mongoose.Model<SalesManagerDoc> {
    build(attrs: SalesManagerAttrs): SalesManagerDoc;
}

const salesManagerSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true,
    },
    agents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agent",
        },
    ],
});

salesManagerSchema.statics.build = (attrs: SalesManagerAttrs) => {
    return new SalesManager({
        name: attrs.name,
        email: attrs.email,
        password: attrs.password,
        mobile: attrs.mobile,
        branch: attrs.branch,
        agents: attrs.agents || [],
    });
};

const SalesManager = User.discriminator<SalesManagerDoc, SalesManagerModel>(
    "SalesManager",
    salesManagerSchema
);

export { SalesManager };