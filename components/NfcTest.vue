<template>
    <div>
        <div v-if="nfcMessage">
            NFC Message: {{ nfcMessage }}
        </div>
        <div v-if="errorMessage">
            Error: {{ errorMessage }}
        </div>
        <div v-if="writeStatus">
            {{ writeStatus }}
        </div>

        <UInput v-model="messageToWrite" placeholder="Enter message to write" />

        <UButton @click="writeNFC(messageToWrite)">Write NFC</UButton>
        <UButton @click="readNFC">Read NFC</UButton>
        <UButton @click="stopNFC">Stop NFC</UButton>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNFC } from '~/composables/useNFC'

const { nfcMessage, errorMessage, writeStatus, readNFC, writeNFC, stopNFC } = useNFC()
const messageToWrite = ref('')
</script>
