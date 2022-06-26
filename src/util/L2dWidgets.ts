import { L2Dwidget } from 'live2d-widget'

export function setupL2dWidget() {
  L2Dwidget.init({
    model: {
      jsonPath: 'https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json ',
      scale: 1
    },
    display: { position: 'left', width: 150, height: 300, hOffset: 0, vOffset: -20 },
    mobile: { show: true, scale: 0.5 },
    react: { opacityDefault: 0.7, opacityOnHover: 0.2 },
    dialog: {
      enable: true,
      script: {
        //每20s，显示一言（调用一言Api返回的句子）
        'every idle 20s': '$hitokoto$',
        //触摸到class='star'对象
        'hover .star': '多读书多看报，少吃零食多睡觉 (*/ω＼*)',
        //触摸到身体
        'tap body': '害羞?(? ???ω??? ?)?',
        //触摸到头部
        'tap face': '~~'
      }
    }
  })
}
