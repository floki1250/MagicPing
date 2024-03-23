<template>
    <UContainer as="div">
        <header
            class="dark:bg-black/70  bg-white/50 border border-gray-50 dark:border-gray-500  h-full m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg">
            <div class="flex justify-between p-4">
                <div class="text-3xl font-bold">
                    <NuxtLink to="/">
                        <h1 class="righteous dark:text-white text-black/70 ml-2 mt-1">MagicPing</h1>
                    </NuxtLink>

                </div>
                <div class="text-3xl ">
                    <UButton :icon="$colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'" size="xl"
                        color="white" variant="link" @click="switchColorMode" />
                </div>
            </div>
        </header>

        <slot />


    </UContainer>
</template>

<script setup>
const colorMode = useColorMode();
function switchColorMode () {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark";
}
</script>
