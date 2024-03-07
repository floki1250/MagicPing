<template>
    <div class="p-4 bg-quarter-spanish-white-50 dark:bg-quarter-spanish-white-700">
        <h2>
            <button class="flex items-center justify-between w-full" @click.prevent="accordionOpen = !accordionOpen"
                :aria-expanded="accordionOpen" aria-controls="accordion-text-01">
                <div>
                    <div class="flex">
                        <h1 class="font-bold text-2xl text-black">
                            AVAILABLE DEVICES
                            <UButton size="md" color="primary" variant="link" icon="i-solar-refresh-linear"
                                @click="refresh" />
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
            class="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
            :class="accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
            <div class="overflow-hidden rounded-lg">
                <div class="grid grid-cols-5 gap-4 w-full" v-if="data.length > 1">
                    <div v-for="i in data" :key="i" class="flex justify-left p-2">
                        <UButton color="primary" variant="soft" :ui="{ rounded: 'rounded-full' }">
                            <UAvatar :src="getUniqueAvatarUrl(i)" size="xl" alt="avatar" />
                        </UButton>
                    </div>
                </div>
                <div v-else class="flex jusitfy-center flex-col w-full p-4">
                    <UIcon name="i-solar-devices-bold-duotone" class="w-20 h-20"></UIcon>
                    <p class="font-bold">Device Not Found</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const accordionOpen = ref(false);
const { data, error, refresh } = await useFetch("http://localhost:9000/peerjs/peers");
const getUniqueAvatarUrl = (index) => {
    return `https://api.dicebear.com/7.x/thumbs/svg?seed=${index}`;
};
</script>
