<template>
  <main class="p-4 transition duration-300">
    <div
      class="blur-blob animate-blob transition top-1/6 left-1/20 bg-teal-200 dark:bg-teal-500 animate-blob animate-ease-[cubic-bezier(0.25,0.1,0.25,1)] ">
    </div>
    <div class="flex w-full mb-2">
      <div
        class="w-1/2 h-40 mr-1 hover:w-11/12 text-center flex justify-center items-center dark:bg-black/70 dark:text-white bg-white/50 text-black/70 rounded-lg backdrop-blur-lg transition-all ease-in-out duration-500 border border-gray-200 dark:border-downy-300 hover:bg-downy-300 dark:hover:bg-downy-300 awesome-shadow dark:shadow-lg ">
        <NuxtLink to="/Send">
          <div class="flex  ">
            <UIcon name="i-line-md-uploading-loop" class="w-10 h-10 mr-2" />
            <h1 class="text-3xl text-bold reem-kufi">
              Sender
            </h1>
          </div>

        </NuxtLink>
      </div>
      <div
        class="w-1/2 h-40 rounded-lg ml-1 hover:w-11/12 flex justify-center items-center dark:bg-black/70 dark:text-white bg-white/50 text-black/70 backdrop-blur-lg transition-all ease-in-out duration-500 border border-gray-200 dark:border-downy-300 hover:bg-downy-300 dark:hover:bg-downy-300 awesome-shadow dark:shadow-lg">
        <NuxtLink to="/Receive">
          <div class="flex">
            <UIcon name="i-line-md-downloading-loop" class="w-10 h-10 mr-2" />
            <h1 class="text-3xl text-bold reem-kufi">Receiver</h1>
          </div>

        </NuxtLink>
      </div>
    </div>
    <Cloud :characterName="'Data'" />
  </main>
</template>
