<template>
  <div>
    <header class="bg-[#61BFAD] text-white h-36">
      <div class="flex justify-between p-4">
        <div class="text-6xl font-bold font-sans">
          <h1>MagicDrop</h1>
        </div>
        <div class="text-6xl font-bold font-sans">
          <UButton
            :icon="$colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
            size="xl"
            color="white"
            variant="link"
            @click="switchColorMode"
          />
        </div>
      </div>
    </header>
    <main>
      <div class="w-full h-12 bg-red-500">Test</div>
      <UAccordion :items="items" color="white" variant="solid" size="xl">
        <template #default="{ item, index, open }">
          <UButton
            :color="item.color"
            variant="solid"
            :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
          >
            <template #leading>
              <div
                class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1"
              >
                <UIcon :name="item.icon" class="w-4 h-4 text-white dark:text-gray-900" />
              </div>
            </template>

            <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>

            <template #trailing>
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
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
function switchColorMode() {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
}
const items = [
  {
    label: "Getting Started",
    icon: "i-heroicons-information-circle",
    slot: "getting-started",
    color: "red_(pantone)",
  },
  {
    label: "Installation",
    icon: "i-heroicons-arrow-down-tray",
    slot: "installation",
    color: "honeydew",
  },
  {
    label: "Theming",
    icon: "i-heroicons-eye-dropper",
    defaultOpen: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
  {
    label: "Layouts",
    icon: "i-heroicons-rectangle-group",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
  {
    label: "Components",
    icon: "i-heroicons-square-3-stack-3d",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
  {
    label: "Utilities",
    icon: "i-heroicons-wrench-screwdriver",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
];
</script>
