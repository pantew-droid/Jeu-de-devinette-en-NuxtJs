<template>
  <UContainer>
    <UCard class="text-center p-2 m-2 flex-col">
      <template #header>
        <p class="text-xl text-green-600">
          Vueillez tout d'abord vous enregistrer dans notre système 😃
        </p>
      </template>
      <UForm @submit="submitForm">
        <UInput required class="m-2 w-xl" v-model="name" type="text" placeholder="Veuillez entrer votre nom..." color="primary" size="xl" variant="soft" trailing-icon="i-lucide-pencil"></UInput><br>
        <UInput required v-model="email" class="m-2 w-xl" type="email" placeholder="Veuillez entrer votre email..." trailing-icon="i-lucide-at-sign" color="primary" size="xl" variant="soft"></UInput><br>
        <UInput required v-model="phoneNumber" class="m-2 w-xl" type="tel" placeholder="Veuillez entrer votre numéro de téléphone..." trailing-icon="i-heroicons-phone" color="primary" size="xl" variant="soft"></UInput><br>
        <UButton type="submit">
          Soumettre
        </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { usePersonneStore } from '~/stores/personne'
import { useToast } from '#imports'

const ps = usePersonneStore()
ps.initializeIdentifiers()
const [a, b, c] = ps.getIdentifiers()
const name = ref(a?.toString())
const email = ref(b?.toString())
const phoneNumber = ref(Number(c))
const phone: number = Number(phoneNumber.value)
const toast = useToast()
const router = useRouter()

const submitForm = () => {
  try {
    ps.setIdentifiers(name.value!, email.value!, phone)
    toast.add({
      title: 'Félicitations',
      description: 'Bienvenue dans le Game',
      icon: '',
      color: 'info',
      close: {
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full'
      },
      closeIcon: 'i-lucide-x'
    })
    setTimeout(() => {
      router.push('/play')
    }, 500)
  } catch (e) {
    console.error(e)
  }
}
</script>
