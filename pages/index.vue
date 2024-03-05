<template>
  <div>
    <header>
      <div class="flex justify-between">
        <div>Dashboard</div>
        <div>Logo</div>
        <div>
          <h1>Color mode: {{ $colorMode }}</h1>
          <select v-model="$colorMode.preference">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
          </select>
          <UToggle
            on-icon="i-heroicons-check-20-solid"
            off-icon="i-heroicons-x-mark-20-solid"
            :model-value="false"
          />
        </div>
      </div>
    </header>

    <div class="flex justify-center h-full">
      <div
        class="w-1/2 m-4 bg-[#FA5B7E]/80 flex justify-center items-center flex-col rounded-3xl frostedGlass border-white/15 border-2 shadow-xl"
      >
        <div
          class="text-3xl bg-white dark:bg-black p-4 rounded-full flex justify-center m-4"
        >
          <UIcon name="i-solar-upload-bold" class="text-[#FA5B7E]" />
        </div>
        <div class="w-full p-4">
          <UButton color="white" variant="solid" block>
            <NuxtLink to="SendFile"> Sender</NuxtLink>
          </UButton>
        </div>
      </div>
      <div
        class="w-1/2 m-4 bg-[#7968F8]/80 flex justify-center items-center flex-col rounded-3xl frostedGlass border-white/15 border-2 shadow-xl"
      >
        <div
          class="text-3xl bg-white dark:bg-black p-4 rounded-full flex justify-center m-4"
        >
          <UIcon name="i-solar-download-bold" class="text-[#7968F8]" />
        </div>
        <div class="w-full p-4">
          <UButton color="white" variant="solid" block>
            <NuxtLink to="SendFile"> Receiver</NuxtLink>
          </UButton>
        </div>
      </div>
      <UButton @click="refresh">Refresh</UButton>
      <h1>{{ data }}</h1>
    </div>
  </div>
</template>

<script setup>
const { data, error, refresh } = await useFetch("http://localhost:9000/peerjs/peers");
</script>

<style scope>
.frostedGlass {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>
