import { TextInput, View, Text } from "react-native";
import styles from "../../assets/styles/SignupStyle";
interface VerificationComponentProps {
  placeholder: string;
  verificationCode: string;
  onChangeText: (value: string) => void;
}

const VerificationComponent: React.FC<VerificationComponentProps> = ({
  placeholder,
  verificationCode,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={verificationCode.trim()}
      onChangeText={onChangeText}
      keyboardType="numeric"
    />
  );
};

export default VerificationComponent;
