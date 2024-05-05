class KumikoAwesome {
  #imagesStack = []
  #audiosStack = []

  constructor(image, audio) {
    this.row = Math.ceil(window.innerHeight / 120) * 4
    this.count = Math.ceil(window.innerWidth / 120) * 6
    this.images = [...image]
    this.audios = [...audio]
    console.log(this.row , this.count)
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

    this.preloadResource()
  }

  loadKumiko(containerElement) {
    for (let i = 1; i < this.count; i++) {
      const img = document.createElement('img')
      img.loading = 'lazy'
      img.src = this.getOneRandomKumikoImage()
      img.id = i
      containerElement.appendChild(img)
    }
  }

  handEvent(element, id) {
    let previous = null;
    let lastClickTime = 0;

    element.addEventListener('click', (e) => {
      const animationClass = id % 2 === 0 ? 'animation-even' : 'animation-odd'
      const currentTime = new Date().getTime();
      
      if (e.target === e.currentTarget) return
      if (previous !== null && previous !== e.target) previous.removeEventListener('animationend', removeAnimation)
      if (this.audios.length > 0) this.playRandomKumikoGibberish()
      if (currentTime - lastClickTime < 800 &&  previous == e.target) e.target.style.setProperty('--scroll-speed', '0.1s');
      
      e.target.classList.toggle(animationClass)
      e.target.src = this.getOneRandomKumikoImage()
      e.target.addEventListener('animationend', removeAnimation)

      previous = e.target
      lastClickTime = currentTime;
    })

    const removeAnimation = (e) => { 
      e.target.className = ''
      e.target.style.setProperty('--scroll-speed', '0.4s');
    }
  }

  getOneRandomKumikoImage() {
    if (!this.#imagesStack.length || this.images.length == this.#imagesStack.length) {
      this.#imagesStack = this.images.slice().sort(_ => Math.random() - 0.5)
    }

    return this.#imagesStack.pop()
  }

  playRandomKumikoGibberish() {
    if (!this.#audiosStack.length || this.audios.length == this.#audiosStack.length) {
      this.#audiosStack = this.audios.slice().sort(_ => Math.random() - 0.5)
    }

    return new Audio(this.#audiosStack.pop()).play()
  }

  preloadResource(images, audios) {
    this.images.forEach(val => addPreloadLink(val, 'image'))
    this.audios.forEach(val => addPreloadLink(val, 'audio'))

    function addPreloadLink(href, as, type) {
      const linkElement = document.createElement("link")
      linkElement.href = href
      linkElement.rel = 'preload'
      linkElement.as = as
      linkElement.type = type
      document.head.appendChild(linkElement)
    }
  }
}
