import Driver from 'driver.js'
import { $driver } from '.'

export function DadJokesDriver(): Driver {
  const isDadJokesDone = localStorage.getItem('dad-jokes-driver-done')

  if (isDadJokesDone) return $driver

  const steps: Driver.Step[] = [
    {
      element: '.content',
      popover: {
        title: '一言',
        description: '点击就可以复制啦',
        position: 'bottom-center'
      }
    }
  ] as Driver.Step[]

  $driver.defineSteps(steps)
  $driver.start()

  localStorage.setItem('dad-jokes-driver-done', '1')
  return $driver
}
