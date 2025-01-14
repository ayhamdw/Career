export type SignUpStackParamList = {
    BasicInfo: undefined;
    PersonalDetails: { firstName: string; lastName: string; username: string; profileImage:string | null};
    Verification: { firstName: string; lastName: string; username: string; profileImage:string | null;  gender: string; dateOfBirth: Date; email: string, code:number };
    AdditionalInfo: { firstName: string; lastName: string; username: string; profileImage:string | null; gender: string; dateOfBirth: Date; email: string };
    CareerDetails: {firstName: string; lastName: string; username: string; profileImage:string | null; gender: string; dateOfBirth: Date; email: string,city:string, latitude: number, longitude: number};
    PasswordPage: {firstName: string; lastName: string; username: string; profileImage:string | null; gender: string; dateOfBirth: Date; email: string,city:string, latitude: number, longitude: number,category:string,career:string,bio:string,experience:string , verificationStatus:boolean,dayRate:string, certificates:string[], images:string[]};
    MainNavigation: undefined;
  };
  