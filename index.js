class KumikoAwesome {
  #image = [
    'kumiko-1.jpg', 'kumiko-2.jpg', 'kumiko-3.jpg', 'kumiko-4.jpg', 'kumiko-5.jpg', 'kumiko-6.jpg', 'kumiko-7.jpg', 'kumiko-8.jpg', 'kumiko-9.jpg', 'kumiko-10.jpg', 'kumiko-11.jpg', 'kumiko-12.jpg', 'kumiko-13.jpg', 'kumiko-14.jpg', 'kumiko-15.jpg', 'kumiko-16.jpg', 'kumiko-17.jpg', 'kumiko-18.jpg', 'kumiko-19.jpg', 'kumiko-20.jpg', 'kumiko-21.jpg', 'kumiko-22.jpg', 'kumiko-23.jpg', 'kumiko-24.jpg', 'kumiko-25.jpg', 'kumiko-26.jpg', 'kumiko-27.jpg', 'kumiko-28.jpg', 'kumiko-29.jpg', 'kumiko-30.jpg', 'kumiko-31.jpg', 'kumiko-32.jpg', 'kumiko-33.jpg', 'kumiko-34.jpg', 'kumiko-35.jpg', 'kumiko-36.jpg', 'kumiko-37.jpg', 'kumiko-38.jpg', 'kumiko-39.jpg', 'kumiko-40.jpg', 'kumiko-41.jpg', 'kumiko-42.jpg', 'kumiko-43.jpg', 'kumiko-44.jpg', 'kumiko-45.jpg', 'kumiko-46.jpg', 'kumiko-47.jpg', 'kumiko-48.jpg', 'kumiko-49.jpg', 'kumiko-50.jpg', 'kumiko-51.jpg', 'kumiko-52.jpg', 'kumiko-53.jpg', 'kumiko-54.jpg', 'kumiko-55.jpg', 'kumiko-56.jpg', 'kumiko-57.jpg', 'kumiko-58.jpg', 'kumiko-59.jpg', 'kumiko-60.jpg', 'kumiko-61.jpg', 'kumiko-62.jpg', 'kumiko-63.jpg', 'kumiko-64.jpg', 'kumiko-65.jpg', 'kumiko-66.jpg', 'kumiko-67.jpg', 'kumiko-68.jpg', 'kumiko-69.jpg', 'kumiko-70.jpg'
  ].map(k => `./imgs/${k}`);
  #imageStack = []

  constructor(row, count) {
    this.row = row;
    this.count = count;
    console.log(this.#image)
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
      const img = document.createElement('img');
      img.src = this.getOneRoadomKumikoImage();
      containerElement.appendChild(img)
    }
  }

  handEvent(element, id) {
    const isEvenRow = id % 2 === 0;
    element.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) return;
      e.target.style = `animation: rotate-diagonal-${isEvenRow ? 1 : 2} 0.4s linear both;`
      e.target.src = this.getOneRoadomKumikoImage();
      e.target.addEventListener('animationend', (e) => e.target.style = '')
      e.target.removeEventListener(animationend)
    })
  }

  getOneRoadomKumikoImage() {
    if (!this.#imageStack.length || this.#image.length == this.#imageStack.length) {
      this.#imageStack = this.#image.slice().sort(_ => Math.random() - 0.5)
    }

    return this.#imageStack.pop();
  }
}

const KA = new KumikoAwesome(20, 100)

KA.init('.group')

