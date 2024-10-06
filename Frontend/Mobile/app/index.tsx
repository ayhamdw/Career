import { ThemeProvider } from '../assets/styles/ThemeContext';


// import {Colors} from '../../constants';
import Login from './Login'
import Introduction_1 from './introduction_1';
export default function HomeScreen() {
  return (
    <ThemeProvider>
        <Introduction_1 />
    </ThemeProvider>
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
