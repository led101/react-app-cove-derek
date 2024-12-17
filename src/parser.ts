export type itemType = {
  id: number;
  type: string;
  name: string;
  price?: number;
  children?: number[];
};

type MenuType = Record<number, itemType>;

const text = `4
DISH
Spaghetti
10.95
2
3

1
CATEGORY
Pasta
4
5

2
OPTION
Meatballs
1.00

3
OPTION
Chicken
2.00

5
DISH
Lasagna
12.00

6
DISH
Caesar Salad
9.75
3`;

interface MenuStream {
  /** @return Next input line or null when the stream is empty. */
  nextLine(): string | null;
}

export class TextMenuStream implements MenuStream {
  private lines: string[];
  private currentIndex: number = 0;

  constructor(text: string) {
    // Split the text into lines and remove any empty lines
    this.lines = text.split("\n").filter((line) => line.trim() !== "");
  }

  nextLine(): string | null {
    if (this.currentIndex >= this.lines.length) {
      return null;
    }
    return this.lines[this.currentIndex++];
  }
}

function parse(menuStream: MenuStream): MenuType {
  const menu: MenuType = {};

  while (true) {
    // Read ID
    const idLine = menuStream.nextLine();
    if (!idLine) break;

    const id = parseInt(idLine);
    const type = menuStream.nextLine() || "";
    const name = menuStream.nextLine() || "";

    const item: itemType = { id, type, name };

    // Read price for DISH and OPTION types
    if (type === "DISH" || type === "OPTION") {
      item.price = parseFloat(menuStream.nextLine() || "0");
    }

    // Read children if any more lines exist before next item
    const children: number[] = [];
    let nextLine = menuStream.nextLine();

    while (nextLine && !isNaN(parseInt(nextLine))) {
      children.push(parseInt(nextLine));
      nextLine = menuStream.nextLine();
    }

    if (children.length > 0) {
      item.children = children;
    }

    menu[id] = item;
  }

  return menu;
}

const menu = parse(new TextMenuStream(text));
console.log("menu: ", menu);
