class Dropdowns {
  constructor(el, width) {
    this.dropdown = el;
    this.width = width;
    this.init();
  }

  init() {
    this.findDom();
    this.showHideContainer();
    this.calculatedIncrement();
    this.calculatedDecrement();
    this.clearAll();
    this.applyed();
    this.drawDecrementAndInput();
    this.showHideButtonClear();
    this.drawResultInput();
    this.closeWindowOnClickOutside();
  }

  findDom() {
    this.input = this.dropdown.querySelector('input');
    this.tick = this.dropdown.querySelector('.input__button');
    this.container = this.dropdown.querySelector(`.dropdowns-${this.width}-selection__container-execute`);
    this.increment = this.dropdown.querySelectorAll('.execute-panel__increment');
    this.decrement = this.dropdown.querySelectorAll('.execute-panel__decrement');
    this.result = this.dropdown.querySelectorAll('.execute-panel__result');
    this.clear = this.dropdown.querySelector('.dropdowns-guest-selection__clear');
    this.apply = this.dropdown.querySelector('.dropdowns-guest-selection__apply');
    this.className = `dropdowns-${this.width}-selection_hide`;
  }

  setGuestsInInput(result) {
    const array = [];
    const peoples = ['взрослые', 'младенцы'];
    function returnedTrueWord(name, humansNumber) {
      let word;
      let num = humansNumber;
      if (num > 20) {
        num %= 10;
      }
      if (num === 0 || (num > 4 && num <= 20)) {
        word = name === 'guests' ? ' гостей' : ' младенцев';
      } else if (num === 1) {
        word = name === 'guests' ? ' гость' : ' младенец';
      } else {
        word = name === 'guests' ? ' гостя' : ' младенца';
      }
      return word;
    }
    const humans = [
      returnedTrueWord('guests', +result[0].innerHTML + +result[1].innerHTML + +result[2].innerHTML),
      returnedTrueWord('baby', +result[2].innerHTML),
    ];
    const humansNumber = [
      +result[0].innerHTML + +result[1].innerHTML + +result[2].innerHTML,
      +result[2].innerHTML,
    ];
    peoples.forEach((_el, index) => {
      if (humansNumber[index] === 0) return;
      array.push(`${humansNumber[index]} ${humans[index]}`);
    });
    this.input.value = array.join(', ');
  }

  setBedsInInput(result) {
    const array = [];
    const rooms = ['Спальни', 'Кровати', 'Ванные комнаты'];
    function returnTrueWord(name, bedNumbers) {
      let bed;
      let num = bedNumbers;
      if (num > 20) {
        num %= 10;
      }
      if (num === 0 || (num > 4 && num <= 20)) {
        if (name === 'спальни') {
          bed = ' спален';
        } else if (name === 'кровати') {
          bed = 'кроватей';
        } else {
          bed = 'ванных комнат';
        }
      } else if (num === 1) {
        if (name === 'спальни') {
          bed = ' спальня';
        } else if (name === 'кровати') {
          bed = 'кровать';
        } else {
          bed = 'ванная комната';
        }
      } else if (name === 'спальни') {
        bed = ' спальни';
      } else if (name === 'кровати') {
        bed = 'кровати';
      } else {
        bed = 'ванные комнаты';
      }
      return bed;
    }
    const goods = [
      returnTrueWord('спальни', +result[0].innerHTML),
      returnTrueWord('кровати', +result[1].innerHTML),
      returnTrueWord('ванные комнаты', +result[2].innerHTML),
    ];
    rooms.forEach((el, index) => {
      array.push(`${result[index].innerHTML} ${goods[index]}`);
    });
    this.input.value = `${array.join(', ')}...`;
  }

  hideContainer() {
    this.container.classList.toggle(this.className);
  }

  showHideContainer() {
    this.tick.addEventListener('click', () => this.hideContainer());
  }

  drawResultInput() {
    if (this.dropdown.classList.contains('dropdowns-guest-selection')) {
      this.setGuestsInInput(this.result);
    } else {
      this.setBedsInInput(this.result);
    }
  }

  drawDecrementAndInput() {
    this.result.forEach((el, index) => {
      if (el.innerHTML === '0') {
        this.decrement[index].style.opacity = 0.5;
      } else {
        this.decrement[index].style.opacity = 1;
      }
    });
    this.showHideButtonClear();
  }

  increased(el) {
    const result = el.previousElementSibling;
    result.innerHTML = +result.innerHTML + 1;
    this.drawDecrementAndInput();
    this.showHideButtonClear();
  }

  calculatedIncrement() {
    this.increment.forEach((el) => {
      el.addEventListener('click', () => this.increased(el));
    });
  }

  reduced(el) {
    const result = el.nextElementSibling;
    if (result.innerHTML > 0) {
      result.innerHTML -= 1;
    }
    this.drawDecrementAndInput();
  }

  calculatedDecrement() {
    this.decrement.forEach((el) => el.addEventListener('click', () => this.reduced(el)));
  }

  clearResult() {
    this.result.forEach((el) => {
      const res = el;
      res.innerHTML = '0';
    });
    this.drawDecrementAndInput();
  }

  clearAll() {
    if (this.clear) {
      this.clear.addEventListener('click', () => this.clearResult());
      this.showHideButtonClear();
    }
  }

  classListToggle() {
    this.container.classList.toggle(this.className);
  }

  showHideButtonClear() {
    const sum = +this.result[0].innerHTML + +this.result[1].innerHTML + +this.result[2].innerHTML;
    if (this.clear !== null) {
      if (sum === 0) {
        this.clear.classList.add('dropdowns-guest-selection_disappeared');
      } else {
        this.clear.classList.remove('dropdowns-guest-selection_disappeared');
      }
    }
  }

  closeWindowOnClickOutside() {
    $(document).on('mouseup', (e) => {
      if (!$(this.dropdown).is(e.target) && $(this.dropdown).has(e.target).length === 0
      && !$(this.container).hasClass(this.className)) {
        this.hideContainer();
      }
    });
  }

  applyed() {
    if (this.apply !== null) {
      this.apply.addEventListener('click', () => {
        this.classListToggle();
        this.drawResultInput();
        this.showHideButtonClear();
      });
    }
  }
}

const long = document.querySelectorAll('.dropdowns-guest-selection');
long.forEach((el) => new Dropdowns(el, 'guest'));

export default Dropdowns;
