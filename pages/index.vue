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
      <div class="divide-y divide-slate-200">
        <Accordion />
      </div>
    </main>
  </div>
</template>

<script setup>


const colorMode = useColorMode();

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
