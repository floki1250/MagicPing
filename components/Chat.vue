<template>
  <div class="flex flex-col">
    <div class="flex flex-col h-full overflow-y auto p-4">
      <div v-for="message in messages" :key="message.id">
        <div v-if="message.sender === 'me'" class="flex justify-end">
          <div class="bg-blue-500 text-white px-4 py-2 rounded-lg">
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
    <div class="flex">
      <UInput
        type="text"
        v-model="newMessage"
        class="flex-grow px-4 py-2 rounded-lg"
        placeholder="Type a message..."
      />
      <UButton @click="sendMessage" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Send
      </UButton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
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
