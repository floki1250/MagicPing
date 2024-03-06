<template>
  <div>
    <header class="bg-[#3d405b] text-white h-36">
      <div class="flex justify-between p-4">
        <div class="text-6xl font-bold font-sans">
          <h1>MagicDrop</h1>
        </div>
        <div class="text-6xl font-bold font-sans">
          <UButton :icon="$colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'" size="xl" color="white"
            variant="link" @click="switchColorMode" />
        </div>
      </div>
    </header>
    <main>
      <div class="w-full min-h-12 bg-[#f2cc8f] text-black p-4 flex justify-between">
        <div>
          <h1 class="font-bold text-2xl">RECEIVING</h1>
          <p class="text-sm">Your device will shown as <b>X</b></p>
        </div>
        <div>
          <UToggle size="md" :model-value="true" />
        </div>
      </div>

      <UAccordion :items="items" color="white" variant="solid" size="xl">
        <template #default="{ item, index, open }">
          <UButton color="white" variant="solid" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
            :class="`${item.color} hover:${item.color} border-none shadow-none`">
            <template #leading>
              <div class="w-12 h-12 rounded-full flex items-center justify-center text-3xl">
                <UIcon :name="item.icon" class="w-8 h-8 dark:text-white text-black" />
              </div>
            </template>

            <span class="truncate"> {{ item.label }}</span>

            <template #trailing>
              <UIcon name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200" :class="[open && 'rotate-90']" />
            </template>
          </UButton>
        </template>
      </UAccordion>
    </main>
  </div>
</template>

<script setup>
const { data, error, refresh } = await useFetch("http://localhost:9000/peerjs/peers");
const colorMode = useColorMode();

console.log(colorMode.preference);
function switchColorMode () {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
}
const items = [
  {
    label: "Theming",
    icon: "i-heroicons-eye-dropper",
    slot: "theming",
    color: "bg-bay-leaf-300",
  },
  {
    label: "Getting Started",
    icon: "i-heroicons-information-circle",
    slot: "getting-started",
    color: "bg-japonica-500",
  },
  {
    label: "Installation",
    icon: "i-heroicons-arrow-down-tray",
    slot: "installation",
    color: "bg-quarter-spanish-white-50",
  },
];
</script>
