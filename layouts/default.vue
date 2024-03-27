<template>

    <UContainer as="div" class="min-h-screen  overflow-hidden">
        <div class="relative  lg:block">
            <div
                class="blur-blob absolute top-20 left-20 md:top-20 md:left-16 lg:top-20 lg:left-16 bg-teal-200 dark:bg-teal-500 w-60 h-60 md:w-40 md:h-40 sm:w-40 sm:h-40 lg:w-96 lg:h-96 ">
            </div>
            <div
                class="blur-blob absolute top-96 left-16 md:top-20 md:left-2/3 lg:top-20 lg:left-2/3 bg-rose-200 dark:bg-rose-800 w-60 h-60 md:w-40 md:h-40 sm:w-40 sm:h-40  lg:w-96 lg:h-96">
            </div>
        </div>

        <header
            class="dark:bg-black/70  bg-white/50 border border-gray-100 dark:border-gray-900 hover:dark:border-gray-600 hover:border-gray-300 transition ease-in-out duration-500 m-4 rounded-lg backdrop-blur-lg awesome-shadow dark:shadow-lg h-fit">
            <div class="flex justify-between p-4">
                <div class="text-3xl font-bold">
                    <NuxtLink to="/">
                        <h1 class="righteous dark:text-white text-black/70 ml-2 mt-1">
                            <UChip text="beta" size="2xl">MagicPing</UChip>
                        </h1>
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
    <footer
        class="fixed bottom-0 w-fit  m-1 z-10 dark:bg-black/70  bg-white/50 border border-gray-100 dark:border-gray-900 hover:dark:border-gray-600 hover:border-gray-300 transition ease-in-out duration-500 rounded-full flex justify-center content-center p-1">
        <div class=" w-full h-full pt-1">
            <NuxtLink to="https://github.com/floki1250" target="_blank">
                <UIcon name="i-line-md-github-loop" class="w-5 h-5 m-1" />
            </NuxtLink>
            <NuxtLink to="https://twitter.com/Adem1250_Dr" target="_blank">
                <UIcon name="i-line-md-twitter-x-alt" class="w-5 h-5 m-1" />
            </NuxtLink>
            <NuxtLink to="https://adamdar.vercel.app/" target="_blank">
                <UIcon name="i-line-md-star" class="w-5 h-5 m-1" />
            </NuxtLink>
        </div>
    </footer>
</template>

<script setup>
const colorMode = useColorMode();
function switchColorMode () {
    colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
}
</script>
