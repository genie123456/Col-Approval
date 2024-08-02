export interface VerificationData {
  serviceName: string;
  currentTask: string;
  appRefNo: string;
  appReceivedDate: string;
  action?: string;  
  official?: string;
  remarks?: string; 
  paymentDetails?: string;  // New optional property
  provisionalLayoutFee?: string;  // New optional property
}