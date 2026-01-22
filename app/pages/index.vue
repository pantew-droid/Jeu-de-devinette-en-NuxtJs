<template>
  <UContainer>
    <!-- <Placeholder class="h-32"></Placeholder> -->
    <UCard class="justify-center m-8 mt-55">
      <p class="text-5xl mb-5 text-center text-green-600">
        Bienvenue dans DNumber.
      </p>
      <p class="text-xl text-center">
        Il s'agit d'une application de dévinette du nombre généré par l'app. Vous avez droit à 10 essaies.
      </p><br>
      <nuxt-link to="/insription" class="cursor-pointer">
        <UButton color="success" class="cursor-pointer text-center m-8 ml-135" size="xl" variant="solid" icon="i-lucide-rocket" target="_self" label="Play" />
      </nuxt-link>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { usePersonneStore } from '../stores/personne'

onMounted(() => {
  const ps = usePersonneStore()
  ps.initializeIdentifiers()
})
</script>
