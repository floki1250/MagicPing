<template>
  <main class="p-4 transition duration-300">
    <div class="blur-blob absolute top-1/4 left-40 bg-teal-200 dark:bg-teal-500  ">

    </div>
    <div class="blur-blob absolute top-1/6 right-1/4 bg-amber-200 dark:bg-amber-500  ">

    </div>
    <div class="flex w-full mb-2">
      <div @mouseenter="hoverSend = true" @mouseleave="hoverSend = false"
        class="w-1/2 h-60 mr-1 hover:w-11/12 text-center flex justify-center items-center dark:bg-black/70 dark:text-white bg-white/50 text-black/70 rounded-lg backdrop-blur-lg transition-all ease-in-out duration-500 border border-gray-100 dark:border-downy-300   awesome-shadow dark:shadow-lg">
        <NuxtLink to="/Send" class="w-full h-full flex justify-center items-center">
          <div class="flex" :class="hoverReceive ? 'rotate-90 w-fit ' : 'rotate-0'">
            <UIcon name="i-line-md-uploading-loop" class="w-10 h-10 mr-2" />
            <h1 :class="hoverReceive ? 'text-2xl' : 'text-3xl'" class="text-bold reem-kufi">
              Sender
            </h1>
          </div>
        </NuxtLink>
      </div>
      <div @mouseenter="hoverReceive = true" @mouseleave="hoverReceive = false"
        class="w-1/2 h-60 rounded-lg ml-1 hover:w-11/12 dark:bg-black/70 dark:text-white bg-white/50 text-black/70 backdrop-blur-lg transition-all ease-in-out duration-500 border border-gray-100 dark:border-downy-300  awesome-shadow dark:shadow-lg">
        <NuxtLink to="/Receive" class="w-full h-full flex justify-center items-center">
          <div class="flex" :class="hoverSend ? 'rotate-90 w-fit ' : 'rotate-0'">
            <UIcon name="i-line-md-downloading-loop" class="w-10 h-10 mr-2" />
            <h1 :class="hoverSend ? 'text-2xl' : 'text-3xl'" class="text-bold reem-kufi">
              Receiver
            </h1>
          </div>
        </NuxtLink>
      </div>
    </div>
    <!--  <Cloud :characterName="'Data'" /> -->
  </main>
</template>
<script setup>
const hoverSend = ref(false);
const hoverReceive = ref(false);
</script>
