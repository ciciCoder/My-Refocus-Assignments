/**
 * Description
 * @param {string} str
 * @returns {string}
 */
const capitalize = str => str.replace(/^\w/, c => c.toUpperCase());

class Animal {
  /**
   * Description
   * @param {string} name
   * @param {string} sound
   * @returns {void}
   */
  constructor(name, sound) {
    /**@type {string} */
    (this.name = name), (this.sound = sound);
  }

  speak() {
    const msg = capitalize(`${this.sound}! I am a ${this.name}.`);
    console.log(msg);
  }

  status() {
    const msg = capitalize(`${this.name} is currently eating...`);
    console.log(msg);
  }
}

const cat = new Animal('cat', 'meow');
const dog = new Animal('dog', 'arf');
const bird = new Animal('bird', 'tweet');
const tiger = new Animal('tiger', 'rawr');

cat.speak();
dog.speak();
bird.speak();
tiger.speak();
cat.status();
dog.status();
bird.status();
tiger.status();
