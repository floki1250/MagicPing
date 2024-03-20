<template>
  <div>
    <div
      class="dark:bg-black/70 bg-white/50 border border-gray-200 dark:border-gray-500 h-full m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg p-4">
      <UBreadcrumb :links="[
        {
          label: 'Home',
          icon: 'i-heroicons-home',
          to: '/',
        },
        {
          label: 'Send',
          icon: 'i-line-md-telegram',
        },
      ]" />
      <br />

      <h1 class="text-3xl text-bold reem-kufi dark:text-white text-black/70">Sender</h1>

      <p class="reem-kufi text-gray-500">I'm {{ characterName }}</p>

      <UDivider class="my-4" />
      <div class="flex justify-between">
        <UButtonGroup size="sm" orientation="horizontal" class="pr-2">
          <UInput color="primary" variant="outline" type="text" v-model="receiver" placeholder="Enter receiver" />
          <UButton icon="i-solar-qr-code-bold-duotone" color="primary" variant="solid" @click="isOpen = true" />
        </UButtonGroup>
        <UButton @click="connect" variant="solid" icon="i-solar-link-line-duotone" :loading="loading">Connect</UButton>
      </div>
    </div>
    <div
      class="dark:bg-black/70 bg-white/50 border border-gray-200 dark:border-gray-500 h-full m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg p-4">
      <div ref="chatContainer" class="flex flex-col h-40 overflow-y-scroll p-4">
        <div v-for="message in messages" :key="message.id" class="m-1">
          <div v-if="message.sender === 'me'" class="flex justify-end">
            <div class="bg-teal-400 text-white px-4 py-2 rounded-full rounded-br-none">
              {{ message.content }}
            </div>
          </div>
          <div v-else class="flex justify-start">
            <div class="bg-gray-300 text-black px-4 py-2 rounded-full rounded-bl-none">
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <UButtonGroup size="sm" orientation="horizontal" class="w-full">
          <UInput type="file" @change="handleFileChange" class="transition-all ease-in-out duration-500" />
          <UButton @click="handleSendFile" icon="i-solar-paperclip-bold-duotone" color="primary" variant="solid">Send
            File</UButton>
        </UButtonGroup>
        <UButtonGroup size="sm" orientation="horizontal" class="w-full">
          <UButton icon="i-solar-paperclip-bold-duotone" color="primary" variant="solid"
            @click="showInputFile = !showInputFile" />

          <UInput color="primary" variant="outline" type="text" v-model="messageToSend" class="flex-grow w-full"
            placeholder="Type a message..." />
          <UButton @click="sendMessage" icon="i-line-md-telegram" color="primary" variant="solid">
          </UButton>
        </UButtonGroup>
      </div>
    </div>
    <UModal v-model="isOpen" fullscreen>
      <UCard class="h-full" :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Qr Scanner
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="stopScan" />
          </div>
        </template>
        <UButton icon="i-solar-qr-code-bold-duotone" color="primary" variant="solid" @click="scan" label="Scan" />
        <video ref="videoElement" class="w-full rounded-lg" v-show="qrscannerEl"></video>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import QrScanner from "qr-scanner";
import { ref } from "vue";
import Peer from "peerjs";
import { uniqueNamesGenerator, starWars, adjectives } from "unique-names-generator";
const toast = useToast();
const loading = ref(false);
const videoElement = ref(null);
const chatContainer = ref(null);
const characterName = uniqueNamesGenerator({
  dictionaries: [adjectives, starWars],
}).replace(/\s/g, "");
const messageReceived = ref([]);
const messages = ref([]);
const messageToSend = ref("");
const receiver = ref("");
const myPeer = new Peer(characterName, {});
let qrScanner;
const qrscannerEl = ref(false);
const isOpen = ref(false);

const showInputFile = ref(false);
const file = ref(null);

const handleFileChange = (event) => {
  file.value = event.target.files[0];
  console.log(file.value);
};

const handleSendFile = async () => {
  if (!file.value) {
    return;
  }
  const reader = new FileReader();
  reader.readAsArrayBuffer(file.value);
  reader.onload = () => {
    const fileData = {
      name: file.value.name,
      type: file.value.type,
      size: file.value.size,
      chunks: [],
    };

    const chunkSize = 15 * 1024 * 1024; // Adjust chunk size as needed

    for (let i = 0; i < reader.result.byteLength; i += chunkSize) {
      const chunk = reader.result.slice(i, i + chunkSize);
      fileData.chunks.push(chunk);
    }

    sendFile(fileData);
  };
  /*const reader = new FileReader();
  reader.readAsDataURL(file.value);
  reader.onload = () => sendFile(reader.result);*/
};
async function scan () {
  qrscannerEl.value = true;
  try {
    qrScanner = new QrScanner(
      videoElement.value,
      (r) => ((receiver.value = r.data), stopScan()),
      {
        onDecodeError: (error) => console.log(error),
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    await qrScanner.start();
  } catch (error) {
    toast.add({
      id: "errors",
      title: "Error",
      description: "Error: " + error?.message,
      icon: "i-heroicons-exclamation-circle",
      timeout: 6000,
      color: "rose",
    });
    qrscannerEl.value = false;
  }
}
function stopScan () {
  if (qrScanner) {
    qrScanner.stop();
  }
  isOpen.value = false;
}

const connect = () => {
  loading.value = true;
  const conn = myPeer.connect(receiver.value);
  conn.on("open", () => {
    loading.value = false;
    toast.add({
      id: "Connected",
      title: "Connected",
      description: "Connected to peer successfully",
      icon: "i-heroicons-check-circle",
      timeout: 6000,
      color: "green",
    });
    console.log("Connected to peer");
    conn.on("data", (data) => {
      messageReceived.value = data;
    });
  });
};

const sendMessage = () => {
  const conn = myPeer.connect(receiver.value);
  conn.on("open", async () => {
    conn.send(messageToSend.value);

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
  const conn = myPeer.connect(receiver.value);
  conn.on("open", async () => {
    conn.send(data);

    await messages.value.push({
      id: Math.random(),
      sender: "me",
      content: `📎 ${file.value.name} 📎`,
    });

    scrollToBottom();
  });
};
function scrollToBottom () {
  chatContainer.value.scroll(0, chatContainer.value.scrollHeight + 50);
}
onMounted(() => {
  myPeer.on("connection", (conn) => {
    conn.on("data", (data) => {
      messages.value.push({ id: Math.random(), sender: "other", content: data });
    });
  });
  scrollToBottom();
});
</script>
