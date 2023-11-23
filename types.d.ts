export interface ITransaction {
  title: string;
  amount: number;
  type: "credit" | "debit";
}
