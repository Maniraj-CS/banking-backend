import mongoose from "mongoose";
import { ELedgerType } from "../utils/types/ledger.types.js";
// ✅ Prevent any update/delete once created (ledger must be immutable)
function preventLedgerModification(schema) {
    // ✅ Block query-based update/delete operations
    schema.pre(/^(updateOne|updateMany|findOneAndUpdate|replaceOne|deleteOne|deleteMany|findOneAndDelete|findOneAndRemove)$/, function () {
        throw new Error("Ledger entries are immutable. Updates/Deletes are not allowed.");
    });
    // ✅ Block document save updates (i.e., existing doc modified + save)
    schema.pre("save", function () {
        if (!this.isNew) {
            throw new Error("Ledger entries are immutable. Save updates are not allowed.");
        }
    });
}
const ledgerSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "account is required"],
        index: true,
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [true, "transaction is required"],
        index: true,
        immutable: true
    },
    amount: {
        type: Number,
        required: [true, "amount is required"],
        min: [0.01, "amount must be greater than 0"],
        immutable: true
    },
    type: {
        type: String,
        enum: Object.values(ELedgerType),
        required: true,
        index: true,
        immutable: true
    },
}, { timestamps: true });
// ✅ Fast queries: account statement
ledgerSchema.index({ account: 1, createdAt: -1 });
// ✅ Idempotent safety: same transaction should not create duplicate ledger rows for same account+type
ledgerSchema.index({ transaction: 1, account: 1, type: 1 }, { unique: true });
// ✅ Apply immutability plugin
preventLedgerModification(ledgerSchema);
const ledgerModel = mongoose.model("ledger", ledgerSchema);
export default ledgerModel;
//# sourceMappingURL=ledger.model.js.map