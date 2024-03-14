<template>
    <div>
        <header class="dark:bg-black dark:text-white bg-white text-black h-full">
            <div class="flex justify-between p-4">
                <div class="text-3xl font-bold font-sans">
                    <h1>MagicDrop</h1>
                </div>
                <div class="text-3xl font-bold font-sans">
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
