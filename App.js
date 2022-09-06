import {Dimensions, Platform, StatusBar, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';

import {GlobalView} from './src/components/Atom/Atom';
import {Splash} from './src/screens';
import Routes from './src/navigation/Routes';

import FlashMessage from 'react-native-flash-message';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

const App = props => {
  const [splasStatus, setSplasStatus] = React.useState(true);
  const [userAuth, setUserAuth] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        setSplasStatus(false);
      }, 4500);
    } else {
      setTimeout(() => {}, 4500);
    }
  }, []);

  useEffect(async () => {
    const userToken = await AsyncStorage.getItem('Token');
    setUserAuth(userToken);
  }, []);

  if (
    splasStatus === true &&
    Platform.OS === 'android' &&
    Platform.OS === 'ios'
  ) {
    return (
      <>
        <GlobalView style={styles.container}>
          <Splash />
        </GlobalView>
      </>
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <Routes authFlow={userAuth} />
        <FlashMessage position="top" />
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});

// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import Clipboard from '@react-native-community/clipboard';

// const App = () => {
//   const [copiedText, setCopiedText] = useState('');

//   const copyToClipboard = () => {
//     Clipboard.setString('hello world');
//   };

//   const fetchCopiedText = async () => {
//     const text = await Clipboard.getString();
//     setCopiedText(text);
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <TouchableOpacity onPress={copyToClipboard}>
//           <Text>Click here to copy to Clipboard</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={fetchCopiedText}>
//           <Text>View copied text</Text>
//         </TouchableOpacity>

//         <Text style={styles.copiedText}>{copiedText}</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   copiedText: {
//     marginTop: 10,
//     color: 'red',
//   },
// });

// export default App;
