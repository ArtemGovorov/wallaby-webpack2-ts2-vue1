import * as Vue from "vue"
import { App } from "./view/App"


Vue.config.debug  = true  
Vue.config.silent = false

new Vue({
  el        : 'body',
  components: {App}
});


declare var module: any
if( module.hot ){
  module.hot.accept()
}
