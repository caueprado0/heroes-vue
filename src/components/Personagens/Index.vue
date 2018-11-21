<template>
  <div class="container mt-5">
    <b-row>
      <b-col v-if="logged">
        <b-alert
          :show="alertTime"
          dismissible
          :variant="alertVariant"
          @dismissed="encerrarAlerta()"
        >
          <p>{{ alertText }}</p>
        </b-alert>
        <b-card-group deck class="justify-content-between align-content-stretch flex-wrap">
          <div v-for="personagem in personagens" :key="personagem.id" class="mb-4">
            <b-card
              :title="personagem.name"
              :img-src="imagePath(personagem)"
              :img-alt="personagem.name"
              img-top
              tag="article"
              class="h-100"
              style="max-width: 20rem;"
            >
              <h6>Presente nos seguintes quadrinhos</h6>
              <b-list-group>
                <b-list-group-item
                  v-for="(comics, index) in personagem.comics.items"
                  :key="index"
                >{{ comics.name }}</b-list-group-item>
              </b-list-group>
              <b-button
                @click.prevent="favoritar(personagem)"
                class="mt-4"
                variant="primary"
              >Favoritar</b-button>
            </b-card>
          </div>
        </b-card-group>
        <b-pagination
          class="mt-4 fluid"
          size="md"
          :limit="10"
          align="center"
          v-show="showPagination"
          :total-rows="personagensTotal || 1"
          :value="currentPage"
          :per-page="personagensLimit || 1"
          @change="changePage"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  created () {
    if (this.logged) {
      this.$store.dispatch('personagens')
    }
  },
  computed: {
    ...mapState({
      personagens: (state) => state.personagens.personagens,
      personagensOffset: (state) => state.personagens.offset,
      personagensTotal: (state) => state.personagens.total,
      personagensLimit: (state) => state.personagens.limit,
      logged: (state) => state.auth.logged
    }),
    currentPage () {
      return !_.isUndefined(this.personagensOffset) ? _.round((_.floor(this.personagensOffset) / this.personagensLimit) + 1, 0) : 1
    },
    showPagination () {
      return !_.isUndefined(this.personagens) && _.size(this.personagens)
    }
  },
  methods: {
    imagePath (personagem) {
      return `${personagem.thumbnail.path}.${personagem.thumbnail.extension}`
    },
    changePage (page) {
      const offset = ((page - 1) * this.personagensLimit) + 1
      this.$store.dispatch('personagens', { offset })
        .then(() => {
          window.setTimeout(() => {
            window.scrollTo(0, 0)
          }, 3500)
        })
    },
    favoritar (personagem) {
      this.$store.dispatch('favoritarPersonagem', { id: personagem.id })
        .then(() => {
          this.alertText = `Sucesso!, o Personagem ${personagem.name} foi favoritado com sucesso.`
          this.alertTime = 10
          window.setTimeout(() => {
            window.scrollTo(0, 0)
          }, 500)
        })
        .catch((error) => {
          this.alertText = error.response.data.mensagem
          this.alertTime = 20
        })
    },
    encerrarAlerta () {
      this.alertText = ''
      this.alertTime = 0
      this.alertVariant = 'info'
    }
  },
  data () {
    return {
      alertVariant: 'info',
      alertText: '',
      alertTime: 0
    }
  }
}
</script>

<style scoped>
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
