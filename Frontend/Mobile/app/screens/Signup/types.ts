export type SignUpStackParamList = {
    BasicInfo: undefined;
    PersonalDetails: { firstName: string; lastName: string; username: string };
    Verification: { firstName: string; lastName: string; username: string; gender: string; dateOfBirth: Date; email: string };
    AdditionalInfo: { firstName: string; lastName: string; username: string; gender: string; dateOfBirth: Date; email: string };
  };
  