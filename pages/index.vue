<template>
    <div>
        <header>
            <div class="flex justify-between">
                <div>Dashboard</div>
                <div>Logo</div>
                <div>
                    <h1>Color mode: {{ $colorMode.value }}</h1>
                    <select v-model="$colorMode.preference">
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="sepia">Sepia</option>
                    </select>
                </div>
            </div>
        </header>
        <div class="flex justify-center bg-white h-full">
            <div
                class="w-1/2 m-4 bg-rose-400/80 flex justify-center items-center flex-col rounded-3xl h-24 backdrop-blur-lg">
                <div>
                    <NuxtLink to="SendFile"> Sender</NuxtLink>
                </div>
                <div>
                    <UButton color="white" variant="solid" block>Send</UButton>
                </div>
            </div>
            <div class="w-1/2 m-4 bg-teal-400 flex justify-center items-center flex-col rounded-3xl h-3/4">
                <NuxtLink to="ReceiveFile">Receiver</NuxtLink>
                <UButton>Receive</UButton>
            </div>

            <h1>{{ data }}</h1>
        </div>
    </div>
</template>

<script setup>
const { data } = await useFetch("http://localhost:9000/peerjs/peers");
</script>
