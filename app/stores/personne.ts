import { defineStore } from 'pinia'

// `defineStore` est la fonction principale de Pinia pour définir un store
// `'personne'` est l'ID unique du store. Il est utilisé par Pinia pour le relier à l'application.
export const usePersonneStore = defineStore('personne', {
  // `state` est une fonction qui retourne l'état initial du store
  state: () => ({
    nom: '',
    email: '',
    phoneNumber: 0
  }),
  // `getters` sont des fonctions qui calculent des valeurs dérivées de l'état du store, similaires aux propriétés calculées de Vue
  getters: {},
  // `actions` sont des fonctions qui peuvent modifier l'état du store. Elles peuvent être asynchrones
  actions: {
    setIdentifiers(nom: string, email: string, phoneNumber: number) {
      this.nom = nom
      this.email = email
      this.phoneNumber = phoneNumber
      localStorage.setItem('player_name', this.nom)
      localStorage.setItem('email', this.email)
      localStorage.setItem('phoneNumber', this.phoneNumber.toString())
    },
    getIdentifiers(): Array<string> {
      return [this.nom!, this.email!, this.phoneNumber.toString()]
    },
    initializeIdentifiers(): void {
      if (import.meta.client) {
        this.nom = localStorage.getItem('player_name') || ''
        this.email = localStorage.getItem('email') || ''
        this.phoneNumber = Number(localStorage.getItem('phoneNumber') || 0)
      }
    }
  }
})
