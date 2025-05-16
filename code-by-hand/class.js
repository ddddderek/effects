class BaseMenu {
  constructor(title, icon) {
    this.title = title;
    this.icon = icon;
  }
  isDisabled() {
    return false;
  }
}

class ButtonMenu extends BaseMenu {
  constructor(title, icon) {
    super(title, icon);
  }
  exec() {
    console.log("hello");
  }
}

class SelectMenu extends BaseMenu {
  constructor(title, icon) {
    super(title, icon);
  }
  exec() {
    return ["item1", "item2", "item3"];
  }
}

class ModalMenu extends BaseMenu {
  constructor(title, icon) {
    super(title, icon);
  }
  exec() {
    return "modal";
  }
}

const button = new ButtonMenu();
const select = new SelectMenu();
const dialog = new ModalMenu();

console.log(button.exec(), select.exec(), dialog.exec());
