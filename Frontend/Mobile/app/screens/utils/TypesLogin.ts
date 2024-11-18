import { NativeStackScreenProps } from '@react-navigation/native-stack';


export type SigninPage = {
    Login: undefined;
    SignupNavigator: undefined;
    ForgotPassword: undefined;
    Main: {user:object}
}

export type LoginProps = NativeStackScreenProps<SigninPage, 'Login'>;