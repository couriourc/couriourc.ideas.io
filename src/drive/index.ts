import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

export const $driver: Driver = new Driver({
  allowClose: false,
  doneBtnText: '记住啦',
  closeBtnText: '嗯嗯',
  stageBackground: '#fff',
  nextBtnText: '下一步',
  prevBtnText: '上一步'
})

export { SoundBoardDriver } from './sound-board.driver'
export { DadJokesDriver } from './dad-jokes.driver'
