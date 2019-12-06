class Looper {

  constructor() {
    this.loopedMethods = []
  }

  addLoopedMethod(method, context) {
    this.loopedMethods[this.loopedMethods.length] = {method: method, context: context};
  }

  draw() {

    for (let i = 0; i < this.loopedMethods.length; i++) {
      this.loopedMethods[i].method(this.loopedMethods[i].context);
    }
  }
}

const looper = new Looper();

export default looper;
export const draw = () => looper.draw();