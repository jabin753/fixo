import Vue from 'vue'
import { UserVuetifyPreset } from 'vuetify'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import es from 'vuetify/src/locale/es'

Vue.use(Vuetify)

const opts: UserVuetifyPreset = {
  lang: {
    locales: { es },
    current: 'es'
  }
}
export default new Vuetify(opts)
