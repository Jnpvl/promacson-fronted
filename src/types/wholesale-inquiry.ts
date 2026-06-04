export type WholesaleStatus = "NEW" | "CONTACTED" | "CLOSED";

export type WholesaleInquiryRecord = {
  id: string;
  folio: string | null;
  status: WholesaleStatus;
  statusLabel: string;
  clientType: string;
  clientTypeLabel: string;
  clientTypeOther: string | null;
  institution: string;
  customerName: string;
  email: string | null;
  phone: string | null;
  volume: string | null;
  interest: string | null;
  message: string | null;
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type WholesaleFormValues = {
  clientType: string;
  clientTypeOther: string;
  institution: string;
  customerName: string;
  email: string;
  phone: string;
  volume: string;
  interest: string;
  message: string;
};
