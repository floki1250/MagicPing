<template>

    <UContainer as="div" class="h-screen  overflow-hidden">
        <div class="relative ">

            <div class="blur-blob absolute top-16 left-16 bg-teal-200 dark:bg-teal-500  w-96 h-96 ">
            </div>
            <div class="blur-blob absolute top-16 right-16 bg-amber-200 dark:bg-amber-500   w-96 h-96"></div>
        </div>

        <header
            class="dark:bg-black/70  bg-white/50 border border-gray-100 dark:border-gray-900 hover:dark:border-gray-600 hover:border-gray-300 transition ease-in-out duration-500 m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg h-fit">
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
        <footer class="flex justify-center content-end bg-black">
            footer
        </footer>

    </UContainer>
</template>

<script setup>
const colorMode = useColorMode();
function switchColorMode () {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark";
}
</script>
