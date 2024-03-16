<template>
  <div
    class="p-4 dark:bg-black/60 bg-white/50 rounded-lg border border-gray-200 dark:border-downy-300 awesome-shadow dark:shadow-lg text-black/70 dark:text-white">
    <h2>
      <button class="flex items-center justify-between w-full" @click.prevent="accordionOpen = !accordionOpen"
        :aria-expanded="accordionOpen" aria-controls="accordion-text-01">
        <div>
          <div class="flex">
            <UIcon name="i-line-md-cloud-upload-loop" class="w-8 h-8 mr-2" />
            <h1 class="font-bold text-2xl reem-kufi">
              Cloud Transfer
            </h1>
          </div>
        </div>
        <div>
          <UIcon :name="accordionOpen
          ? 'i-solar-alt-arrow-down-line-duotone'
          : 'i-solar-alt-arrow-right-line-duotone'
          " class="w-5 h-5">
          </UIcon>
        </div>
      </button>
    </h2>
    <div id="accordion-text-01" role="region" aria-labelledby="accordion-title-01"
      class="grid text-sm text-white overflow-hidden transition-all duration-300 ease-in-out"
      :class="accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
      <div class="overflow-hidden">
        <br />
        <UButtonGroup size="md" orientation="horizontal" class="w-full">
          <UInput type="file" class="w-full" @change="handleFileChange" />
          <UButton icon="i-solar-upload-bold" color="white" variant="solid" @click="uploadFile" :loading="loading" />
        </UButtonGroup>
        <br />
        <div class="pt-4">
          <div class="pb-4">
            <UBadge color="black" variant="solid" :ui="{ rounded: 'rounded-full' }" v-if="url">
              <NuxtLink :to="url" target="_blank">
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
const toast = useToast();
const props = defineProps(["characterName"]);
const file = ref(null);
const loading = ref(false);
const accordionOpen = ref(false);
const handleFileChange = (event) => {
  file.value = event.target.files[0];
};
const url = ref(null);
let qrcode = useQRCode("");
const uploadFile = async () => {
  loading.value = true;
  if (!file.value) {
    console.error("File is null or undefined");
    loading.value = false;
    return;
  }
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // Format: yyyyMMdd
  const binName = `MagicDropCloud_${currentDate}_${props.characterName}`;
  const fileName = file.value.name;

  const formData = new FormData();
  formData.append(fileName, file.value);
  url.value = `https://filebin.net/${binName}/${fileName}`;
  qrcode = useQRCode(url.value);
  try {
    const response = await $fetch(url.value, {
      method: "POST",
      body: formData,
    });
    console.log("File uploaded:", response);
    toast.add({
      id: "success",
      title: "success",
      description: "File uploaded successfully" + response.file.filename,
      icon: "i-heroicons-check-circle",
      timeout: 6000,
      color: "green",
    });
  } catch (error) {
    toast.add({
      id: "errors",
      title: "Error",
      description: "Error uploading file: " + error?.message,
      icon: "i-heroicons-exclamation-circle",
      timeout: 6000,
      color: "rose",
    });
    console.error("Error uploading file:", error?.message);
  } finally {
    loading.value = false;
  }
};
</script>
