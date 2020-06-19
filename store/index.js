import Vue from 'vue'  //引入 Vue
import Vuex from 'vuex'  //引入 Vuex

import app from '@/store/modules/app'
import cart from '@/store/modules/cart'
import user from '@/store/modules/user'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const $store = new Vuex.Store({
	modules
})

export default $store