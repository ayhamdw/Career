export type SignUpStackParamList = {
    BasicInfo: undefined;
    PersonalDetails: { firstName: string; lastName: string; username: string, profileImage:string };
    Verification: { firstName: string; lastName: string; username: string; profileImage:string;  gender: string; dateOfBirth: Date; email: string, code:number };
    AdditionalInfo: { firstName: string; lastName: string; username: string; profileImage:string; gender: string; dateOfBirth: Date; email: string };
    CareerDetails: {firstName: string; lastName: string; username: string; profileImage:string; gender: string; dateOfBirth: Date; email: string,city:string, latitude: number, longitude: number};
    PasswordPage: {firstName: string; lastName: string; username: string; profileImage:string; gender: string; dateOfBirth: Date; email: string,city:string, latitude: number, longitude: number,category:string,career:string,bio:string,experience:string};
    MainNavigation: undefined;
  };
  