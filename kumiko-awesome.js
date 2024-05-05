class KumikoAwesome {
  #imagesStack = []
  #audiosStack = []

  constructor(image, audio) {
    this.row = parseInt(window.innerHeight / 120) * 4
    this.count = parseInt(window.innerWidth / 120) * 4
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
    const isEvenRow = id % 2 === 0
    let previous = null;
    let speed = .4;

    element.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) return
      if (e.target.style.animation !== '') speed = .2;
      if (previous !== null && previous !== e.target) previous.removeEventListener('animationend', removeAnimation)
      if (this.audios.length > 0) this.playRandomKumikoGibberish()
      e.target.style = `animation: rotate-diagonal-${isEvenRow ? 1 : 2} ${speed}s linear both;`
      e.target.src = this.getOneRandomKumikoImage()
      e.target.addEventListener('animationend', removeAnimation)
      previous = e.target
    })

    const removeAnimation = (e) => e.target.style = '';
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
