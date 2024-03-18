<template>
  <div
    class="dark:bg-black/70  bg-white/50 border border-gray-200 dark:border-gray-500  h-full m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg p-4">
    <div class="flex flex-col h-full min-h-40 overflow-y auto p-4">
      <div v-for="message in messages" :key="message.id">
        <div v-if="message.sender === 'me'" class="flex justify-end">
          <div class="bg-teal-500 text-white px-4 py-2 rounded-lg">
            {{ message.content }}
          </div>
        </div>
        <div v-else class="flex justify-start">
          <div class="bg-gray-300 text-black px-4 py-2 rounded-lg">
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex ">
      <UButtonGroup size="md" orientation="horizontal" class="w-full">
        <UInput color="primary" variant="outline" type="text" v-model="newMessage" class="flex-grow w-full"
          placeholder="Type a message..." />
        <UButton @click="sendMessage" icon="i-line-md-telegram" color="primary" variant="solid">
        </UButton>
      </UButtonGroup>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messages: [],
      newMessage: "",
    };
  },
  methods: {
    sendMessage () {
      if (this.newMessage.trim()) {
        // Simulate sending message (replace with actual logic)
        this.messages.push({
          id: Math.random(),
          sender: "me",
          content: this.newMessage,
        });
        this.newMessage = "";
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
