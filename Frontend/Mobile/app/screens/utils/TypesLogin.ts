import { NativeStackScreenProps } from '@react-navigation/native-stack';


export type SigninPage = {
    Login: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
    Main: {user:object};
}

export type LoginProps = NativeStackScreenProps<SigninPage, 'Login'>;
export type SignupNavigatorProps = NativeStackScreenProps<SigninPage, 'SignUp'>;
export type ForgotPasswordProps = NativeStackScreenProps<SigninPage, 'ForgotPassword'>;
export type MainProps = NativeStackScreenProps<SigninPage, 'Main'>;