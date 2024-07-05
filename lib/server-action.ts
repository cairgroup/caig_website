export interface ReturnStatus {
  status: number;
  statusMessage: "error" | "success";
  output: any;
  message?: string;
}
