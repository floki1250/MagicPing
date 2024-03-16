<template>
    <div>
        <header
            class="dark:bg-black/70  bg-white/50 border border-gray-200 dark:border-gray-500  h-full m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg">
            <div class="flex justify-between p-4">
                <div class="text-3xl font-bold flex">
                    <img src="/MagicPing.svg" alt="" class="w-16 h-16 ">
                    <h1 class="righteous dark:text-white text-black/70 mt-4 mx-2">MagicPing</h1>
                </div>
                <div class="text-3xl ">
                    <UButton :icon="$colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'" size="xl"
                        color="white" variant="link" @click="switchColorMode" />
                </div>
            </div>
        </header>
        <slot />
    </div>
</template>
<script setup>
const colorMode = useColorMode();
function switchColorMode () {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark";
}
</script>
