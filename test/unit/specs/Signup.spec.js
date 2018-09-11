import Vue from 'vue';
import Signup from '@/pages/Signup';

describe('Signup.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Signup);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1.my-title').textContent)
      .toEqual('Matsuri cash flow manager');
  });
});
