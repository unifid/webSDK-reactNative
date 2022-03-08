import React, {useEffect, useCallback, useState} from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';

function HomeScreen({ navigation }) {

  const [sdkAccess, setSdkAccess] = useState();

  useEffect(() => {
    console.log("sdkAccess on update", sdkAccess)
  }, [sdkAccess])

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const secret = "THLFEOges8yzL/1hThEfcrEXb1lQMshzzSHcPcArVS8kxLt7vh5PnVhwyTyfbqRd";

      var myHeaders = new Headers();
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(`https://npd.utils.unifid.io/sdk/verifier?secret=${secret}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          setSdkAccess(JSON.parse(result))
        })
        .catch(error => console.log('error', error));
        
      return () => {
        isActive = false;
      };
    }, [])
  );

  const onSdkValidate = () => {
    navigation.navigate('ACME CORP Mobile App', {sdkAccess: sdkAccess})
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <Text style={{fontSize: 24, marginTop: 50, marginBottom: 200}}>Welcome to Acme Corporation</Text>
      {/* <View style={{marginBottom: 20}}>
        <Button
          title="Validate with UNIFID Fullscreen"
          onPress={() => navigation.navigate('Unifid')}
        />
      </View> */}
      <Button
        title="Validate with UNIFID in app"
        // onPress={() => navigation.navigate('ACME CORP Mobile App', {sdkAccess: {"sdkKey":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZGsiLCJqdGkiOiI0YWEyNGZlNS0yZThmLTRiNzUtOWRiYi00OTlmYjZkYmJhYjQiLCJpYXQiOjE2NDY1OTc0NTB9.ZZODKZgH84roxoajtdPrRyY29KEMSMRq6WN15FjkVRs","sdkURL":"https://unifid-sdk-git-main-im-sunil.vercel.app"}})}
        onPress={onSdkValidate}
      />
    </View>
  );
}

// function UnifidScreen({ navigation }) {
//   const webviewRef = useRef();

//   useFocusEffect(
//     useCallback(() => {
//       let isActive = true;
//       // webviewRef.current.reload();
//       // sendDataToWebView();
//       return () => {
//         isActive = false;
//       };
//     }, [])
//   );

//   // webviewRef1.current.postMessage(JSON.stringify({message: "Want proof", title: "Credify", body: "Want the proof"}));
//     // webviewRef1.current.contentWindow.postMessage(
//     //   { message: "onInit", value: message },
//     //   "*"
//     // );
//     // console.log("webviewRef1 current", webviewRef1.current)
//     // webviewRef1.current.UNIFIDSDK.onInit(JSON.stringify({
//     //   sdkKey : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZGsiLCJqdGkiOiI0YWEyNGZlNS0yZThmLTRiNzUtOWRiYi00OTlmYjZkYmJhYjQiLCJpYXQiOjE2NDYzODM2NTl9.AmakuxSejgxaQfhDBS4PUvFORktmvHPvLhPHdrLAChQ",
//     //   verifierID : "sasasas",
//     //   message : "Message",
//     //   notification:"Message"
//     // }));
//     // webviewRef1.current.postMessage({message: "onInit", value: JSON.stringify({
//     //   sdkKey : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZGsiLCJqdGkiOiI0YWEyNGZlNS0yZThmLTRiNzUtOWRiYi00OTlmYjZkYmJhYjQiLCJpYXQiOjE2NDYzODM2NTl9.AmakuxSejgxaQfhDBS4PUvFORktmvHPvLhPHdrLAChQ",
//     //   verifierID : "sasasas",
//     //   message : "Message",
//     //   notification:"Message"
//     // })}, "*");

//   function onMessage(event) {
//     console.log("Unifid received the data 1", event);
//     console.log("Unifid received the data 2", event.nativeEvent);
//     console.log("Unifid received the data 3", event.nativeEvent.data);
//   }

//   function sendDataToWebView() {
//     webviewRef.postMessage(JSON.stringify({message: "Want proof", title: "Credify", body: "Want the proof"}));
//   }

//   return (
//     // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     //   <Text>Details Screen</Text>
//     //   <Button
//     //     title="Go to Details... again"
//     //     onPress={() => navigation.navigate('Home')}
//     //   />
//     // </View>
//     <WebView
//       source={{ uri: 'https://unifid-sdk-git-main-im-sunil.vercel.app/' }}
//       onMessage={onMessage}
//       ref={webviewRef}
//       style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
//     />
//   );
// }

function UnifidInAppScreen({ navigation, route }) {
  const {sdkAccess} = route.params;
  let webviewRef1;

  const onMessage = (event) => {
    const data = event.nativeEvent.data;
    console.log("data", data);
    navigation.goBack();
  }

  const sendDataToWebView = () => {
    const verifierID = "4aa24fe5-2e8f-4b75-9dbb-499fb6dbbab4";
    const message = {
      sdkKey: sdkAccess.sdkKey,
      verifierID: verifierID,
      message: "Message",
      notification: "Message",
      customData: { name: "Name" },
    };
    webviewRef1.postMessage(JSON.stringify(
      { message: "onInit", value: message }
    ));
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 25,
        marginTop: 25
      }}
    >
      <WebView
        originWhitelist={['*.vercel.app/']}
        source={{ uri: sdkAccess.sdkURL}} 
        onLoadEnd={sendDataToWebView}
        onMessage={onMessage}
        ref={(el) => (webviewRef1 = el)}
      />
      {/* <WebView
        originWhitelist={['*.vercel.app/']}
        source={{ uri: sdkAccess.sdkURL}} 
        // onLoadEnd={sendDataToWebView}
        onMessage={onMessage}
        ref={(el) => (webviewRef1 = el)}
      /> */}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  // const route = useNavigationState(state => state.routes.length);
  // console.log("route", route)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Acme Corporation' }} />
        {/* <Stack.Screen name="Unifid" options={{headerShown: false}} component={UnifidScreen} /> */}
        <Stack.Screen name="ACME CORP Mobile App" component={UnifidInAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;