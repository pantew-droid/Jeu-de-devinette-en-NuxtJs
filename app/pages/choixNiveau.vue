<template>
  <UContainer>
    <UHeader to="">
      <template #title>
        <span class="text-2xl text-green-600">DNumber</span>
        <Logo class="h-6 w-auto" />
      </template>

      <UNavigationMenu :items="items" />

      <template #right>
        <UColorModeButton />
      </template>

      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

    <UMain>
      <UPageSection
        title="Simple game made in Nuxt + NuxtUI"
        icon="i-lucide-rocket"
        description="The rule is sample. Try to devine the number genrated by the app. No biggie, DNumber help you to find the number. Just be SMART."
      >
        <UContainer class="flex fill-red-200 content-between gap-2">
          <div class="bg-[#2F2F2F] p-5 rounded-lg shadow-md w-140 text-white">
            <p>
              DNumber had already generated the number. Which number it is ?
            </p><br>
            <UInput v-model="nbreUser" type="text" size="xl" color="primary" icon="i-lucide-binary"></UInput>
            <UButton @click="checkNumber(nbreUser)" variant="ghost" size="xl" class="cursor-pointer ml-6" :disabled="(message.toString().includes('😎😎')? true : false)">
              Vérifier
            </UButton><br>
            <h6>Nombre de tentatives restantes: <span class="text-green-600 text-lg m-1">{{ tentatives }}</span></h6>
          </div>
          <div class="bg-[#2F2F2F] p-5 rounded-lg shadow-md w-140 text-white">
            <p>
              Joueur connu sous l'email <span class="text-green-600 font-bold underline">{{ email ? email : 'duckpanpan@duck.com' }}</span>
            </p><br>
            <h4 class="text-center font-bold">
              Indication
            </h4>
            <p>{{ message }}</p><br>
            <UButton @click="reloadNuxtApp()" variant="ghost" size="xl" class="cursor-pointer ml-6" v-if="(message.toString().includes('😎😎')? true : false)">
              Start a new game
            </UButton>
          </div>
        </UContainer>
      </UPageSection>
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-muted text-sm">
          Copyright © {{ new Date().getFullYear() }}
        </p>
      </template>
      <template #right>
        <UButton
          icon="i-simple-icons-discord"
          color="neutral"
          variant="ghost"
          to="https://go.nuxt.com/discord"
          target="_blank"
          aria-label="Discord"
        />
        <UButton
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          to="https://go.nuxt.com/x"
          target="_blank"
          aria-label="X"
        />
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/nuxt"
          target="_blank"
          aria-label="GitHub"
        />
      </template>
    </UFooter>
  </UContainer>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useRoute, usePersonneStore } from '#imports'

const route = useRoute()
const nbreUser = ref(0)
const nbreGen = Math.floor(Math.random() * 100)
const tentatives = ref(10)
const message = ref('')
const user = usePersonneStore()
let nom: string | undefined
let email: string | undefined
let phoneNumber: string | undefined
const toast = useToast()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    icon: 'i-lucide-house',
    active: route.path.startsWith('')
  },
  {
    label: 'S\'enregistrer',
    to: '/insription',
    icon: 'i-lucide-log-in',
    active: route.path.startsWith('/insription')
  },
  {
    label: 'Play',
    icon: 'i-lucide-gamepad',
    to: '/play',
    active: route.path.startsWith('/play')
  }
])

const checkNumber = (nbre: number) => {
  if (Number(tentatives.value) > 0) {
    if (nbre == nbreGen) {
      message.value = 'Félicitations ' + nom?.toString() + ' 😎😎'
      toast.add({
        title: 'Great 👌',
        description: 'Félicitations, vous avez trouvé le nombre caché 😁',
        duration: 2000,
        closeIcon: 'i-lucide-arrow-right',
        color: 'info'
      })
    } else if (nbre < nbreGen) {
      message.value = 'Essayez encore, votre nombre est bas'
    } else {
      message.value = 'Essayez encore, votre nombre est haut'
    }
    console.log(phoneNumber)
    tentatives.value -= 1
  } else {
    toast.add({
      title: 'Erreur',
      description: 'Plus de tentatives restantes',
      duration: 3000,
      closeIcon: 'i-lucide-x',
      color: 'error'
    })
  }
}

onMounted(() => {
  [nom, email, phoneNumber] = user.getIdentifiers()
  console.log(nbreGen)
})
</script>
