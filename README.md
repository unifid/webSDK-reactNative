## Getting Started SDK


UNIFID webSDK allows Verifier to embed UNIFID flow into their **app or website** allowing customers to share credentials.

This is a reference implementation of UNIFID webSDK for Reach Native platform. 

For detailed understanding of webSDK integration refer to [UNIFID SDK Integration Guide](https://docs.unifid.io)

```js
unifidSDK().onInit({
  sdkUrl : "SDK_URL",
  sdkKey : "JWT Token",
  verifierID : "sasasas",
  message : "Message",
  notification:"Message",
  customData = {name: "Name"},
})
```

```js
/*
 @return log
 with errorCode="", errorMsg = ""
 param
*/
unifidSDK().onError():
```

```js
UNIFIDSDK.onClose(({ state }) => {
  if (state === 0) {
    console.log("Incomplete");
  }
  if (state === 1) {
    console.log("Completed");
  }
  console.log("state", state);
});
```
