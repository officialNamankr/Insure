import mongoose from "mongoose";


export interface PolicyAttrs {
    policyId: number,
    productId: number,
    policyStartDate: Date,
    policyEndDate: Date,
    policyStatus: string,
    policyStage: string,
    policyIssueDate: Date,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    policySource: string,
    proposalNo: string,
    policyNo: string,
    quoteNo: string,
}

interface PolicyDoc extends mongoose.Document {
    policyId: number,
    productId: number,
    policyStartDate: Date,
    policyEndDate: Date,
    policyStatus: string,
    policyStage: string,
    policyIssueDate: Date,    
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    policySource: string,
    proposalNo: string,
    policyNo: string,
    quoteNo: string,
}

interface PolicyModel extends mongoose.Model<PolicyDoc> {
    build(attrs: PolicyAttrs): PolicyDoc;
}

const policySchema = new mongoose.Schema({
    policyId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    policyStartDate: {
        type: Date,
        required: true
    },
    policyEndDate: {
        type: Date,
        required: true
    },
    policyStatus: {
        type: String,
        required: true
    },
    policyStage: {
        type: String,
        required: true
    },
    policyIssueDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    policySource: {
        type: String,
        required: true

    },
    proposalNo: {
        type: String,
        required: true
    },
    policyNo: {
        type: String,
    }
}, {
    timestamps: true,
    discriminatorKey: 'role',
});

policySchema.statics.build = (attrs: PolicyAttrs) => {
    return new Policy(attrs);
}

const Policy = mongoose.model<PolicyDoc, PolicyModel>('Policy', policySchema);

export { Policy };

