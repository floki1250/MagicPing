<template>
  <div>
    <div
      class="dark:bg-black/70 bg-white/50 transition-all ease-in-out duration-500 border border-gray-100 dark:border-gray-900 hover:dark:border-gray-600 hover:border-gray-300 h-full m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg p-4">

      <div class="flex justify-between">
        <div class="mr-5">
          <UBreadcrumb :links="[
            {
              label: 'Home',
              icon: 'i-heroicons-home',
              to: '/',
            },
            {
              label: 'Receive',
              icon: 'i-line-md-telegram',
            },
          ]"> <template #divider>
              <span class="w-8 h-1 rounded-full bg-gray-100 dark:bg-gray-700" />
            </template></UBreadcrumb>
          <br />
          <h1 class="text-3xl text-bold reem-kufi dark:text-white text-black/70">Receiver</h1>
          <p class="reem-kufi text-gray-500">I'm {{ characterName }}</p>
          <UDivider class="my-4" />
          <UInput color="white" variant="outline" type="text" v-model="sender" placeholder="Sender" :readonly="true" />
        </div>
        <div>
          <img :src="qrcode" alt="QR Code" v-if="qrcode"
            :class="$colorMode.value === 'dark' ? 'filter invert' : 'filter '" />
        </div>
      </div>
    </div>
    <div
      class="dark:bg-black/70 bg-white/50 transition-all ease-in-out duration-500 border border-gray-100 dark:border-gray-900 hover:dark:border-gray-600 hover:border-gray-300 h-full m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg p-4">
      <div ref="chatContainer" class="flex flex-col min-h-80 overflow-y-scroll p-4">
        <div class="text-center h-60 flex justify-center  items-center" v-if="messages.length === 0">
          <UIcon name="i-line-md-chat" class="w-24 h-24 opacity-5"></UIcon>
        </div>

        <div v-for="  message in messages  " :key="message.id" class="m-1">
          <div v-if="message.sender === 'me'" class="flex justify-end">
            <div class="bg-teal-400 text-white px-4 py-2 rounded-full rounded-br-none">
              {{ message.content }}
            </div>
          </div>
          <div v-else class="flex justify-start">
            <div class="bg-rose-400 text-white px-4 py-2 rounded-full rounded-bl-none">
              {{ message.content }}
            </div>
          </div>
        </div>

      </div>
      <div class="flex">
        <UModal v-model="showFileTransfer">
          <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                  File Transfer
                </h3>
              </div>
            </template>
            <div class="flex justify-center flex-col">
              <div class="p-2">
                <UInput type="file" @change="handleFileChange" class="transition-all ease-in-out duration-500" />
              </div>
              <div>
                <UButtonGroup size="sm" orientation="horizontal" class="w-full p-2">
                  <UButton @click="handleSendFile" icon="i-solar-paperclip-bold-duotone" color="primary" variant="solid"
                    :loading="sendingFile">Send File via P2P</UButton>
                  <UButton icon="i-solar-cloud-bold-duotone" color="violet" variant="solid" disabled>Send File Via Cloud
                  </UButton>
                </UButtonGroup>
              </div>
            </div>
          </UCard>
        </UModal>
        <UButtonGroup size="sm" orientation="horizontal" class="w-full">
          <UButton icon="i-solar-paperclip-bold-duotone" color="primary" variant="soft"
            @click="showFileTransfer = !showFileTransfer" />
          <UInput color="white" variant="outline" type="text" v-model="messageToSend" class="flex-grow w-full"
            placeholder="Type a message..." />
          <UButton @click="sendMessage" icon="i-line-md-telegram" color="primary" variant="soft">
          </UButton>
        </UButtonGroup>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useQRCode } from "@vueuse/integrations/useQRCode";
import { ref } from "vue";
import Peer from "peerjs";
import { uniqueNamesGenerator, starWars, adjectives } from "unique-names-generator";
const toast = useToast();
const chatContainer = ref(null);
const characterName = uniqueNamesGenerator({
  dictionaries: [adjectives, starWars],
}).replace(/\s/g, "");

const messages = ref([]);
const messageToSend = ref("");
const receivedFile = ref(null);
const sender = ref("");
const myPeer = new Peer(characterName, {
  host: 'magicping-server.vercel.app', // Replace with your server's host
  port: 443, // Replace with your server's port
  path: '/api/mpserver/peerjs/server'
});

const chunkSize = 16 * 1024;
const showFileTransfer = ref(false);
const file = ref(null);
let qrcode = useQRCode(characterName);
const sendingFile = ref(false);
const handleFileChange = (event) => {
  file.value = event.target.files[0];

};
const loading = ref(false);
const handleSendFile = async () => {
  sendingFile.value = true;
  if (!file.value) {
    return;
  }
  const reader = new FileReader();
  reader.readAsArrayBuffer(file.value);
  reader.onload = () => {
    const fileData = {
      name: file.value.name, // Send file name for download
      type: file.value.type, // Send file type for appropriate handling
      size: file.value.size, // Send file size for progress tracking
      chunks: [], // Array to store chunked data
    };
    for (let i = 0; i < reader.result.byteLength; i += chunkSize) {
      const chunk = reader.result.slice(i, i + chunkSize);
      fileData.chunks.push(chunk);
    }
    sendFile(fileData);
  };
};
const sendMessage = () => {
  const conn = myPeer.connect(sender.value);
  conn.on("open", async () => {
    conn.send({ dt: { id: characterName, message: messageToSend.value } });
    await messages.value.push({
      id: Math.random(),
      sender: "me",
      content: messageToSend.value,
    });
    messageToSend.value = "";
    scrollToBottom();
  });
};
const sendFile = (data) => {
  console.log("Sending file", data);
  const conn = myPeer.connect(sender.value);
  conn.on("open", async () => {
    conn.send({ dt: { id: characterName, message: data } });
    await messages.value.push({
      id: Math.random(),
      sender: "me",
      content: `📎 ${file.value.name} 📎`,
    });
    sendingFile.value = false;
    scrollToBottom();
  });
};
function scrollToBottom () {
  chatContainer.value.scroll(0, chatContainer.value.scrollHeight + 50);
}
onMounted(() => {
  try {
    myPeer.on("connection", (conn) => {
      conn.on("data", async (data) => {
        loading.value = true;
        sender.value = data.dt.id;
        if (typeof data.dt.message === "string") {
          await messages.value.push({ id: Math.random(), sender: "other", content: data.dt.message });
        } else {

          receivedFile.value = data.dt.message;
          await messages.value.push({ id: Math.random(), sender: "other", content: data.dt.message.name });
          if (
            receivedFile.value.chunks.length ===
            Math.ceil(receivedFile.value.size / chunkSize)
          ) {
            handleFileDownload();
          }
        }
      });
    });
  } finally {
    loading.value = false
  }
  scrollToBottom();
});
async function handleFileDownload () {
  try {
    const blob = new Blob(receivedFile.value.chunks, {
      type: receivedFile.value.type,
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = receivedFile.value.name;
    link.click();
    window.URL.revokeObjectURL(url); // Clean up memory leak
  } catch (error) {
    toast.add({
      id: "error",
      title: "Error",
      description: "Error: " + error?.message,
      icon: "i-heroicons-exclamation-circle",
      timeout: 6000,
      color: "rose",
    });
  }
}
</script>
