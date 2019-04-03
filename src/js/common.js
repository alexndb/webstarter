import '@babel/polyfill'
import $ from 'jquery'

import dragOff from './modules/dragOff'
import buttonToggle from '../blocks/button/button'
import select from '../blocks/select/select'
import withLabel from '../blocks/form-control-with-label/form-control-with-label'
import slider from '../blocks/slider/slider'
import agreement from '../blocks/agreement/agreement'
import iMask from './modules/libs/iMask'
import magnificPopup from './modules/libs/magnificPopup/popups'
import formSubmit from './modules/forms/submit/onSubmit'

dragOff()
withLabel()
agreement()
iMask()
formSubmit()
slider()

$(document).ready(() => {
  buttonToggle()
  select()
  magnificPopup()
})