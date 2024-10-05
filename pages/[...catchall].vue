<template>
    <div></div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

if (window.location.pathname === '/index.html') {
    router.push('/')
}
</script>
