export default defineNuxtPlugin((nuxtApp) => {
  const cordovaApp = {
    // Application Constructor
    initialize() {
      document.addEventListener(
        "deviceready",
        function () {
          var permissions = cordova.plugins.permissions;

          // Define the permissions you want to request (e.g., CAMERA and LOCATION)
          var requiredPermissions = [permissions.VIBRATE, permissions.NFC];

          // Function to request permissions
          function requestPermissions() {
            permissions.requestPermissions(
              requiredPermissions,
              function (status) {
                if (status.hasPermission) {
                  console.log("All permissions granted!");
                  // You can now access the features that require these permissions
                } else {
                  console.warn("Some permissions are denied.");
                  // Handle the case where permissions are denied
                }
              },
              function (error) {
                console.error("Permission request error:", error);
              }
            );
          }

          // Function to check if permissions are already granted
          function checkPermissions() {
            permissions.hasPermission(
              requiredPermissions[0], // Check one of the permissions
              function (status) {
                if (status.hasPermission) {
                  console.log("Permission already granted.");
                  // Proceed with functionality that requires the permission
                } else {
                  console.log("Permission not granted, requesting...");
                  requestPermissions();
                }
              },
              function (error) {
                console.error("Error checking permission:", error);
              }
            );
          }

          function enableNFC() {
            nfc.enabled(
              () => {
                console.log("NFC is enabled");
              },
              (error) => {
                console.log("NFC error: " + error);
              }
            );
          }

          // Check and request permissions when the app starts
          checkPermissions();
          enableNFC();
        },
        false
      );
    },
  };
  cordovaApp.initialize();
});
