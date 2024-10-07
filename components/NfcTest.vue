<template>
    <div class="grid grid-cols-4 gap-4">
        <UButton @click="shareMessage" icon="i-solar-share-bold-duotone" variant="soft">Share Message</UButton>
        <UButton @click="openSettings" icon="i-solar-settings-bold-duotone" variant="soft">Settings</UButton>
        <UButton @click="requestPermissions" icon="i-solar-key-bold-duotone" variant="soft">Request Permissions
        </UButton>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Trigger permission requests when button is clicked
const requestPermissions = () => {
    const permissions = cordova.plugins.permissions;

    // Define NFC and VIBRATE permissions
    const nfcPermission = permissions.NFC;
    const vibratePermission = permissions.VIBRATE;

    // Check and request NFC permission
    permissions.checkPermission(nfcPermission, status => {
        if (!status.hasPermission) {
            alert('NFC permission not granted. Requesting permission...');
            permissions.requestPermission(nfcPermission, success => {
                alert('NFC permission granted');
            }, error => {
                alert('NFC permission denied');
            });
        } else {
            alert('NFC permission already granted');
        }
    }, error => {
        alert('Permission check failed: ' + error);
    });

    // Check and request VIBRATE permission
    permissions.checkPermission(vibratePermission, status => {
        if (!status.hasPermission) {
            alert('VIBRATE permission not granted. Requesting permission...');
            permissions.requestPermission(vibratePermission, success => {
                alert('VIBRATE permission granted');
            }, error => {
                alert('VIBRATE permission denied');
            });
        } else {
            alert('VIBRATE permission already granted');
        }
    }, error => {
        alert('Permission check failed: ' + error);
    });
}

// Setup to listen for the Cordova device ready event
onMounted(() => {
    document.addEventListener("deviceready", () => {
        alert('Device is ready');
    }, false);
});
</script>
