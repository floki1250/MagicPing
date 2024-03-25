<template>

    <UContainer as="div" class="min-h-screen  overflow-hidden">
        <div class="relative hidden lg:block">
            <div
                class="blur-blob absolute top-10 left-5 md:top-16 md:left-16 lg:top-16 lg:left-16 bg-teal-200 dark:bg-teal-500 w-60 h-60 md:w-40 md:h-40 sm:w-40 sm:h-40 lg:w-96 lg:h-96 ">
            </div>
            <div
                class="blur-blob absolute top-10 right-5 md:top-16 md:right-16 lg:top-16 lg:right-16 bg-rose-200 dark:bg-rose-800 w-60 h-60 md:w-40 md:h-40 sm:w-40 sm:h-40  lg:w-96 lg:h-96">
            </div>
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
        <footer class="flex justify-center  absolute bottom-0 ">

            <div
                class="dark:bg-black/70  bg-white/50 border border-gray-100 dark:border-gray-900 hover:dark:border-gray-600 hover:border-gray-300 transition ease-in-out duration-500 m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg h-fit">
                <NuxtLink to="/">
                    <h1 class="righteous dark:text-white text-black/70 ml-2 mt-1">MagicPing</h1>
                </NuxtLink>
            </div>
        </footer>

    </UContainer>
</template>

<script setup>
const colorMode = useColorMode();
function switchColorMode () {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark";
}
</script>
