<template>
  <div class="app h-100 d-flex flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <h1>Entrar</h1>
                  <p class="text-muted">Faça o login na sua conta</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      v-model="user.email"
                      placeholder="E-mail"
                      required
                      autocomplete="autocomplete"
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      v-model="user.password"
                      required
                      class="form-control"
                      placeholder="Senha"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="5">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="7" class="text-right">
                      <b-button variant="link" class="px-0">Esqueceu sua senha?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2 class="mb-5">Cadastra-se</h2>
                  <b-button id="cadastrar" variant="primary" class="active mt-5">
                    Se cadastrar agora!
                    <i class="fa fa-thumbs-up"></i>
                  </b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import store from '../../store'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    login (event) {
      event.preventDefault()
      store.dispatch('login', this.user)
    }
  }
}
</script>

<style scoped>
</style>
