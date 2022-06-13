import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
export const $driver: Driver = new Driver({
  allowClose: false,
  doneBtnText: '完成',
  closeBtnText: '关闭',
  stageBackground: '#fff',
  nextBtnText: '下一步',
  prevBtnText: '上一步'
})

export function SoundBoardDriver(): Driver {
  const steps: Driver.Step[] = [
    {
      element: '#card',
      popover: {
        title: '音乐卡片',
        description: '然后就可以播放音乐啦',
        position: 'bottom-center'
      }
    }
  ] as Driver.Step[]

  $driver.defineSteps(steps)
  $driver.start()
  return $driver
}
