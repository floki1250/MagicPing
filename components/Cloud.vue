<template>
  <div class="p-4 bg-japonica-500 dark:bg-japonica-700">
    <h2>
      <button
        class="flex items-center justify-between w-full"
        @click.prevent="accordionOpen = !accordionOpen"
        :aria-expanded="accordionOpen"
        aria-controls="accordion-text-01"
      >
        <div>
          <div class="flex flex-col">
            <h1 class="font-bold text-2xl text-black">CLOUD TRANSFER</h1>
          </div>
        </div>
        <div>
          <UIcon
            :name="
              accordionOpen
                ? 'i-solar-alt-arrow-down-line-duotone'
                : 'i-solar-alt-arrow-right-line-duotone'
            "
            class="w-5 h-5"
          >
          </UIcon>
        </div>
      </button>
    </h2>
    <div
      id="accordion-text-01"
      role="region"
      aria-labelledby="accordion-title-01"
      class="grid text-sm text-white overflow-hidden transition-all duration-300 ease-in-out"
      :class="accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden">
        <br />
        <UButtonGroup size="md" orientation="horizontal" class="w-full">
          <UInput type="file" class="w-full" @change="handleFileChange" />
          <UButton
            icon="i-solar-upload-bold"
            color="white"
            variant="solid"
            @click="uploadFile"
          />
        </UButtonGroup>
        <br />
        <div class="pt-4">
          <div class="pb-4">
            <UBadge color="black" variant="solid" :ui="{ rounded: 'rounded-full' }">
              <NuxtLink :to="url" target="_blank">
                <span class="text-xl font-bold">Download Link</span>
                <UIcon name="i-solar-link-bold" class="w-5 h-5" />
              </NuxtLink>
            </UBadge>
          </div>
          <img :src="qrcode" alt="QR Code" v-if="qrcode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQRCode } from "@vueuse/integrations/useQRCode";
const props = defineProps(["characterName"]);
const file = ref(null);
const accordionOpen = ref(false);
const handleFileChange = (event) => {
  file.value = event.target.files[0];
};
const url = ref(null);

const uploadFile = async () => {
  if (!file.value) {
    console.error("File is null or undefined");
    return;
  }
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // Format: yyyyMMdd
  const binName = `MagicDropCloud_${currentDate}_${props.characterName}`;
  const fileName = file.value.name;

  const formData = new FormData();
  formData.append(fileName, file.value);
  url.value = `https://filebin.net/${binName}/${fileName}`;
  const qrcode = useQRCode(url.value);
  try {
    const response = await $fetch(url.value, {
      method: "POST",

      body: formData,
    });
    console.log("File uploaded:", response);
  } catch (error) {
    console.error("Error uploading file:", error?.message);
  }
};
</script>
