import * as Vue from "vue"
import * as Vuex from "vuex"

Vue.use(Vuex)

export class Person{
  username: string;
}

// state:
export interface AuState{
  users: Person[]
}

// mutation:
const mutations: Vuex.MutationTree<AuState> = {
  ADD_USER( s: AuState, user: Person ){
    s.users.push(user)
  }
}

// action:
export function add_user( store: AuStore, u:Person){
  store.dispatch('ADD_USER', u)
}

// store:
export const store = new Vuex.Store<AuState>({
  state: {
    users: [
      <Person>{username: 'dave'},
      <Person>{username: 'pete'}
    ]
  },
  mutations
})

export type AuStore = Vuex.Store<AuState>




declare const module: any
if( module.hot ){
  module.hot.accept(() =>{
    console.log('vuex accepted')
    store.hotUpdate({mutations: mutations})
  })
}

