import 'crimson-styleguide'
import $ from 'jquery'

$(document).on('ready pjax:success', () => {
  $('.panel-collapse').addClass('collapse')
})
