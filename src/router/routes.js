import Login from '../components/Login/Login.vue'
import Logout from '../components/Login/Logout.vue'
import Personagens from '../components/Personagens/Index.vue'

export default [{
  path: '/',
  name: 'Index',
  component: Login
},
{
  path: '/login',
  name: 'Login',
  component: Login
},
{
  path: '/personagens',
  name: 'Personagens',
  component: Personagens,
  meta: {
    auth: true
  }
}, {
  path: '/favoritos',
  name: 'Favoritos',
  component: Login
},
{
  path: '/logout',
  name: 'Logout',
  component: Logout
},
{
  path: '/404',
  name: '404',
  component: Login
},
]
