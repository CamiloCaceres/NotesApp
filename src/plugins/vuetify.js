import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#e6e6e6',
            secondary: '#b0bec5',
            accent: '#427dde',
            error: '#b71c1c',
            background: "404040"
          },
        },
      },
});
