import { VueComponent } from "vue-typescript"
import { store, add_user } from "../model/store"

@VueComponent({
  //template: require('/Users/davem/Documents/testing/wallaby/wallaby-webpack2-ts2-vue1/src/view/App.hbs')
  template: require('./App.hbs')
})
export class App extends Vue{
  
  count = 0
  
  get users(){
    return store.state.users
  }
  
  add_user( e ){
    this.count += 1
    add_user(store, {username: "user " + this.count})
  }
  
}


/*
















 */


declare var module: any
if( module.hot ){
  const api = require('vue-hot-reload-api')
  const Vue = require('vue')
  api.install(Vue)
  if( !module.hot.data ){
    api.createRecord('App', App)
  }
  else{
    api.update('App', App)
  }
}
