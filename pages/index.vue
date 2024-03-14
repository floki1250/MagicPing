<template>
  <div>
    <main class="p-4">
      <div class="flex w-full mb-2">
        <div class="w-1/2 h-40 rounded-lg bg-downy-300 mr-1 hover:w-3/4 text-center flex justify-center items-center">
          <NuxtLink to="/Send">
            <h1 class="text-3xl text-bold">Sender</h1>
          </NuxtLink>
        </div>
        <div class="w-1/2 h-40 rounded-lg bg-blue-500 ml-1 hover:w-3/4 flex justify-center items-center">
          <NuxtLink to="/Receive">
            <h1 class="text-3xl text-bold">Receiver</h1>
          </NuxtLink>
        </div>
      </div>
      <Cloud :characterName="'Data'" />
    </main>
  </div>
</template>
