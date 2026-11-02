import type { ITransactionEmail } from "../types/email.types.js";
declare function sendRegisterationEmail(userEmail: string, name: string): Promise<void>;
declare function sendTransactionEmail({ userEmail, name, amount, toAccount, }: ITransactionEmail): Promise<void>;
declare function sendTransactionFailedEmail({ userEmail, name, amount, toAccount, }: ITransactionEmail): Promise<void>;
export { sendRegisterationEmail, sendTransactionEmail, sendTransactionFailedEmail };
//# sourceMappingURL=email.controller.d.ts.map