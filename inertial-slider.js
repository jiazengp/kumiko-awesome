
class InertialSlider {
  constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.isDragging = false;
      this.startX = 0;
      this.translateX = 0;
      this.velocity = 0;
      this.amplitude = 0;
      this.timestamp = 0;
      this.targetX = 0;
      this.friction = 0.95; // 摩擦系数

      this.container.addEventListener('mousedown', this.startDrag.bind(this));
      this.container.addEventListener('touchstart', this.startDrag.bind(this), {passive: false});
  }

  startDrag(event) {
      this.container.classList.add('no-animation')
      this.isDragging = true;
      this.startX = event.clientX || event.touches[0].clientX;
      this.translateX = this.getTranslateX();
      this.timestamp = Date.now();
      this.amplitude = 0;
      this.velocity = 0;
      clearInterval(this.interval);
      event.preventDefault();

      document.addEventListener('mousemove', this.drag.bind(this));
      document.addEventListener('touchmove', this.drag.bind(this), {passive: false});
      document.addEventListener('mouseup', this.endDrag.bind(this));
      document.addEventListener('touchend', this.endDrag.bind(this));
  }

  drag(event) {
      if (!this.isDragging) return;
      const x = event.clientX || event.touches[0].clientX;
      const dx = this.startX - x;
      this.startX = x;
      this.translateX -= dx;
      this.setTranslateX(this.translateX);
  }

  endDrag(event) {
      this.isDragging = false;
      const x = event.clientX || event.changedTouches[0].clientX;
      const dx = this.startX - x;
      this.velocity = -dx / (Date.now() - this.timestamp);
      this.targetX = this.translateX + this.velocity * 200; // 乘以一个系数以增强惯性效果
      this.amplitude = 0.8 * this.velocity;
      this.autoScroll();
      this.container.classList.remove('no-animation')

      document.removeEventListener('mousemove', this.drag.bind(this));
      document.removeEventListener('touchmove', this.drag.bind(this));
      document.removeEventListener('mouseup', this.endDrag.bind(this));
      document.removeEventListener('touchend', this.endDrag.bind(this));
  }

  autoScroll() {
      const elapsed = Date.now() - this.timestamp;
      const delta = -this.amplitude * Math.exp(-elapsed / 325);
      if (delta > 0.5 || delta < -0.5) {
          this.translateX = this.targetX + delta;
          this.targetX = this.translateX;
          this.amplitude *= this.friction; // 每次自动滚动时乘以摩擦系数
          this.setTranslateX(this.translateX);
          requestAnimationFrame(this.autoScroll.bind(this));
      }
  }

  getTranslateX() {
      const style = window.getComputedStyle(this.container);
      const transform = style.getPropertyValue('transform');
      const matrix = transform.match(/^matrix\(([^\)]+)\)$/);
      if (matrix) {
          const values = matrix[1].split(', ');
          return parseInt(values[4]);
      }
      return 0;
  }

  setTranslateX(x) {
      this.container.style.transform = 'translateX(' + x + 'px)';
  }
}

// document.querySelectorAll('.kumiko-container').forEach(container => {
//   const id = container.id;
//    new InertialSlider(id);
// });
