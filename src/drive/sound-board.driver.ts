import Driver from 'driver.js'
import { $driver } from '.'

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
