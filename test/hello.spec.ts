
import { store, add_user } from "../src/model/store"
import { App } from "../src/view/App"
describe('test one', () =>{
  it("test a", () =>{
    expect(1 + 1).toEqual(2)
  })
})

describe('Hello.vue not using vue-test', () =>{
  add_user(store, {username: 'fred'})
  expect(store.state.users.length).toEqual(3)
  
  it('store mutation should result in correct component data', () =>{
    const vm = new Vue({
      template  : '<hello v-ref:component></hello>',
      components: {App}
    }).$mount()
    
    const comp: App = (<any>vm.$refs).component
    expect(comp.users).toEqual([
      {username:'dave'},
      {username:'pete'},
      {username:'fred'}
      ])
  })
})

/*
describe('mutate store via action', () =>{
  it('INCREMENT', () =>{
    actions.SET_COUNT(store, 42)
    expect(store.state.count).toEqual(42)
  })
})


describe('Hello.vue not using vue-test', () =>{
  actions.SET_COUNT(store, 0)
  expect(store.state.count).toEqual(0)
  
  it('store mutation should result in correct component data', () =>{
    const vm = new Vue({
      template  : '<hello v-ref:component></hello>',
      components: {Hello}
    }).$mount()
    
    actions.SET_COUNT(store, 12)
    expect(store.state.count).toEqual(12)
    const hello: Hello = (<any>vm.$refs).component
    expect(hello.count).toEqual(12)
  })
})
*/
