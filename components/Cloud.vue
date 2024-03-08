<template>
    <div class="p-4 bg-japonica-500 dark:bg-japonica-700">
        <h2>
            <button class="flex items-center justify-between w-full" @click.prevent="accordionOpen = !accordionOpen"
                :aria-expanded="accordionOpen" aria-controls="accordion-text-01">
                <div>
                    <div class="flex">
                        <h1 class="font-bold text-2xl text-black">CLOUD TRANSFER</h1>
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
                    <UInput type="file" class="w-full" />
                    <UButton icon="i-solar-upload-bold" color="white" variant="solid" />
                </UButtonGroup>
            </div>
        </div>
    </div>
</template>

<script setup>
const accordionOpen = ref(false);
</script>
