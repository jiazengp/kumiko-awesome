class KumikoAwesome {
  #imagesStack = []
  #audiosStack = []

  constructor(image, row, count, audio) {
    this.row = row
    this.count = count
    this.images = [...image]
    this.audios = [...audio]
    console.log(this.audio)
    this.preloadResource()
  }

  init(className) {
    const group = document.querySelector(className)

    for (let i = 1; i < this.row; i++) {
      const container = document.createElement('div')
      container.className = 'kumiko-container'
      container.id = `kumiko-container-${i}`
      this.loadKumiko(container)
      this.handEvent(container, i)
      group.appendChild(container)
    }
  }

  loadKumiko(containerElement) {
    for (let i = 1; i < this.count; i++) {
      const img = document.createElement('img')
      img.loading = 'lazy'
      img.src = this.getOneRoadomKumikoImage()
      img.id = i
      containerElement.appendChild(img)
    }
  }

  handEvent(element, id) {
    const isEvenRow = id % 2 === 0
    let previous = null;
    let speed = .4;

    element.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) return
      if (e.target.style.animation !== '') speed = .2;
      if (previous !== null && previous !== e.target) previous.removeEventListener('animationend', removeAnimation)
      if (this.audios.length > 0) this.playRoadomKumikoGibberish()
      e.target.style = `animation: rotate-diagonal-${isEvenRow ? 1 : 2} ${speed}s linear both;`
      e.target.src = this.getOneRoadomKumikoImage()
      e.target.addEventListener('animationend', removeAnimation)
      previous = e.target
    })

    const removeAnimation = (e) => e.target.style = '';
  }

  preloadResource() {
    this.images.forEach(val => addPreloadLink(val, 'image'))
    this.audios.forEach(val => addPreloadLink(val, 'video'))

    function addPreloadLink(href, as, type) {
      console.log(as)
      const linkElement = document.createElement("link")
      linkElement.href = href
      linkElement.rel = 'preload'
      linkElement.as = as
      linkElement.type = type
      document.head.appendChild(linkElement)
    }
  }

  getOneRoadomKumikoImage() {
    if (!this.#imagesStack.length || this.images.length == this.#imagesStack.length) {
      this.#imagesStack = this.images.slice().sort(_ => Math.random() - 0.5)
    }

    return this.#imagesStack.pop()
  }

  playRoadomKumikoGibberish() {
    if (this.#audiosStack.length == 0) confirm('确认将会在点击时随机播放久美子的怪叫，请确认扬声器音量~') ? '' : this.audios = []
    if (!this.#audiosStack.length || this.audios.length == this.#audiosStack.length) {
      this.#audiosStack = this.audios.slice().sort(_ => Math.random() - 0.5)
    }

    return new Audio(this.#audiosStack.pop()).play()
  }
}

const images = [
  'kumiko-1.jpg', 'kumiko-2.jpg', 'kumiko-3.jpg', 'kumiko-4.jpg', 'kumiko-5.jpg', 'kumiko-6.jpg', 'kumiko-7.jpg', 'kumiko-8.jpg', 'kumiko-9.jpg', 'kumiko-10.jpg', 'kumiko-11.jpg', 'kumiko-12.jpg', 'kumiko-13.jpg', 'kumiko-14.jpg', 'kumiko-15.jpg', 'kumiko-16.jpg', 'kumiko-17.jpg', 'kumiko-18.jpg', 'kumiko-19.jpg', 'kumiko-20.jpg', 'kumiko-21.jpg', 'kumiko-22.jpg', 'kumiko-23.jpg', 'kumiko-24.jpg', 'kumiko-25.jpg', 'kumiko-26.jpg', 'kumiko-27.jpg', 'kumiko-28.jpg', 'kumiko-29.jpg', 'kumiko-30.jpg', 'kumiko-31.jpg', 'kumiko-32.jpg', 'kumiko-33.jpg', 'kumiko-34.jpg', 'kumiko-35.jpg', 'kumiko-36.jpg', 'kumiko-37.jpg', 'kumiko-38.jpg', 'kumiko-39.jpg', 'kumiko-40.jpg', 'kumiko-41.jpg', 'kumiko-42.jpg', 'kumiko-43.jpg', 'kumiko-44.jpg', 'kumiko-45.jpg', 'kumiko-46.jpg', 'kumiko-47.jpg', 'kumiko-48.jpg', 'kumiko-49.jpg', 'kumiko-50.jpg', 'kumiko-51.jpg', 'kumiko-52.jpg', 'kumiko-53.jpg', 'kumiko-54.jpg', 'kumiko-55.jpg', 'kumiko-56.jpg', 'kumiko-57.jpg', 'kumiko-58.jpg', 'kumiko-59.jpg', 'kumiko-60.jpg', 'kumiko-61.jpg', 'kumiko-62.jpg', 'kumiko-63.jpg', 'kumiko-64.jpg', 'kumiko-65.jpg', 'kumiko-66.jpg', 'kumiko-67.jpg', 'kumiko-68.jpg', 'kumiko-69.jpg', 'kumiko-70.jpg'
].map(k => `./imgs/${k}`)
const gibberish = ['1.wav', '3.wav', '4.wav', '5.wav', '6.wav', '7.wav', '8.wav', '9.wav', '11.wav', '12.wav', '13.wav', '14.wav', '15.wav', '16.wav', '17.wav', '18.wav', '19.wav', '20.wav', '21.wav', '23.wav', '24.wav', '25.wav', '26.wav', '27.wav', '28.wav', '29.wav', '30.wav', '31.wav', '32.wav', '33.wav', '34.wav', '35.wav', '36.wav', '37.wav', '38.wav'].map(k => `./audios/${k}`)
const KA = new KumikoAwesome(images, 20, 100, gibberish)

KA.init('.group')


// class InertialSlider {
//   constructor(containerId) {
//       this.container = document.getElementById(containerId);
//       this.isDragging = false;
//       this.startX = 0;
//       this.translateX = 0;
//       this.velocity = 0;
//       this.amplitude = 0;
//       this.timestamp = 0;
//       this.targetX = 0;
//       this.friction = 0.95; // 摩擦系数

//       this.container.addEventListener('mousedown', this.startDrag.bind(this));
//       this.container.addEventListener('touchstart', this.startDrag.bind(this), {passive: false});
//   }

//   startDrag(event) {
//       this.container.classList.add('no-animation')
//       this.isDragging = true;
//       this.startX = event.clientX || event.touches[0].clientX;
//       this.translateX = this.getTranslateX();
//       this.timestamp = Date.now();
//       this.amplitude = 0;
//       this.velocity = 0;
//       clearInterval(this.interval);
//       event.preventDefault();

//       document.addEventListener('mousemove', this.drag.bind(this));
//       document.addEventListener('touchmove', this.drag.bind(this), {passive: false});
//       document.addEventListener('mouseup', this.endDrag.bind(this));
//       document.addEventListener('touchend', this.endDrag.bind(this));
//   }

//   drag(event) {
//       if (!this.isDragging) return;
//       const x = event.clientX || event.touches[0].clientX;
//       const dx = this.startX - x;
//       this.startX = x;
//       this.translateX -= dx;
//       this.setTranslateX(this.translateX);
//   }

//   endDrag(event) {
//       this.isDragging = false;
//       const x = event.clientX || event.changedTouches[0].clientX;
//       const dx = this.startX - x;
//       this.velocity = -dx / (Date.now() - this.timestamp);
//       this.targetX = this.translateX + this.velocity * 200; // 乘以一个系数以增强惯性效果
//       this.amplitude = 0.8 * this.velocity;
//       this.autoScroll();
//       this.container.classList.remove('no-animation')

//       document.removeEventListener('mousemove', this.drag.bind(this));
//       document.removeEventListener('touchmove', this.drag.bind(this));
//       document.removeEventListener('mouseup', this.endDrag.bind(this));
//       document.removeEventListener('touchend', this.endDrag.bind(this));
//   }

//   autoScroll() {
//       const elapsed = Date.now() - this.timestamp;
//       const delta = -this.amplitude * Math.exp(-elapsed / 325);
//       if (delta > 0.5 || delta < -0.5) {
//           this.translateX = this.targetX + delta;
//           this.targetX = this.translateX;
//           this.amplitude *= this.friction; // 每次自动滚动时乘以摩擦系数
//           this.setTranslateX(this.translateX);
//           requestAnimationFrame(this.autoScroll.bind(this));
//       }
//   }

//   getTranslateX() {
//       const style = window.getComputedStyle(this.container);
//       const transform = style.getPropertyValue('transform');
//       const matrix = transform.match(/^matrix\(([^\)]+)\)$/);
//       if (matrix) {
//           const values = matrix[1].split(', ');
//           return parseInt(values[4]);
//       }
//       return 0;
//   }

//   setTranslateX(x) {
//       this.container.style.transform = 'translateX(' + x + 'px)';
//   }
// }

// document.querySelectorAll('.kumiko-container').forEach(container => {
//   const id = container.id;
//    new InertialSlider(id);
// });
