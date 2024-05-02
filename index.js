class KumikoAwesome {
  #image = [
    "1f00a0dc30474bb234ccdc19d6239ae9",
    "7e8e1d02efaca9d5435dd273de4b6b7f",
    "08a3a6edce29575a14e1941f657f4859",
    "8d0f7103219209fe73f2671a126e4d85",
    "41d559994efd465cd91730906371ea64",
    "96fc97e71d5f876ac68a95a992b89019",
    "245e51e7aeb98b4c9b03d9dd2e5af60e",
    "704fe4600ccad183c8980cd034e6ec42",
    "aff50105471a77149de56bbb8fec9fa3",
    "b1680996db7612a12ff65c4c2f16a9ed",
    "b354033048a54cc7a8eeb2d30ddd8295",
    "d7eda5b017cb1c5d483c251229e27c07",
    "a97379a52bf6f12e98827467c4183590",
    "04f3030c8cdbfe2f56ce5a8c8afcfb05",
    "5fd6731279cb3f152d5c502a90f3ee7e",
    "a623c2d57fa39cb3e831106c522fb2ea",
    "2c369ef051babdc59193de45fd7c0a9f",
    "a84d1a5bd2c878cc38eb867ada76629d",
    "50d756b396e7a7b4e543d47c60b463c4",
    "43fef66fc99afc896894eebd650d38fb",
    "8440d6d5959882bc27ade9e770423f13",
    "7a39c151e008d5b83bebfd1e5a8107ce",
    "608fa1e2ca214996cfeb1360569f1356",
    "f52cef32fecbcf8dcd8cf20055a141bd",
    "f10964b00b748deb18ece012c387c98f",
    "689e74146e4aa29f821808f24fcbdece",
    "5d4799f4badc6aaf9c17f56167d6c03c",
    "50d2305e5c58213a299404db5166acda",
    "cc3f5e109162c36c73a85939a721873b",
    "9e1ec825e01d687f9a96531bef91e444",
    "f15e841d1538ddb3cb736bb976da443c",
    "96093dadce80c3cae5c0691c580e6d0a",
    "1f619337b7abe84286831feed96e8c20",
    "729ac2f2a1268bb25157a65fbb853c7b",
    "5f60700edb03a420c491e19798e081f4",
    "2d4289200bcdb3651f30d086249b41b8",
    "be39c9e9992929f374ab58f10c44992b",
    "e7c756ef122b8ae8844af926190e0163",
    "3be347f451661ce51e8e842764573a32",
    "3c44b034f9ee2e69e85c70bb30f0afdf",
    "c666aae76821093fb2de8131e73dfd76",
    "0bf0a48cbae0a49fba99070c5e7e060f",
    "33c9f5b3d26353fb5af4cb6b52aaccc9",
    "3d6975be06268c53a7ecd168602ef731",
    "e1c0e313748bbd6f4ea57b13ccb55a9a",
    "2509270bbd7842d6175d887ceb07058a",
    "d2c7f65b6be25b14d47c0e3daa1dff73",
    "d081364f48e3d6b5f9ab5be6161e6690",
    "e9bba40624252a7337cf4525abe42b79",
    "b55909d508883c65219abbf1ce2ac0fa",
    "3365dab2e6281ec3ec4fe39754887f8e",
    "b3ca0bff5c0f9942ffa828be2dba5bd4",
    "1d792a7332561cc6999234f19330d55d",
    "76c09d4c1741a4f5c68200ddc271176f",
    "9e6bd811e804b6ceb7cd773b1cf0abf9",
    "03fa3e1d3ff287daecde5437fc20f5ad",
    "55e7ce7d9153cc6f8dceff0a81bbfac1",
    "618cdc5a9767acb62b89d72d8e279ff9",
    "ca6c6f83d4fe55fb3cafdc89b3f02ca1",
    "0bede94c99982dba05e93c021100c24d",
    "611b90a7c4cf23dcd93263943105c21c",
    "21a0685c8194b3352c6002f9bdc0aa3c",
    "317b7ef71a77c87ea0a73713cb441bb9",
    "63fe90cae88ddee56620b11d37f0977d",
    "8adfa816fcb8a4b963e14ca8639e68b6",
    "4819c872ba14a2ff5d8446293bd9597a",
    "b813e9bc40248035cf56566e8e298509",
    "3691cb39f54fc3164240bbf777edbde5",
    "c63594a907fd66ac256d1772191f6828",
    "064a189f9b637bcd352122184c0cfb55"
  ].map(k => `https://image.magiconch.com/recaptcha/images/undefined/${k}.jpg`);
  #imageStack = []

  constructor(row, count) {
    this.row = row;
    this.count = count;
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

