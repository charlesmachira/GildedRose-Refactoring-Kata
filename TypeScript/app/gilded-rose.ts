export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }
  
    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            switch (this.items[i].name) {
                case 'Aged Brie':
                    if (this.items[i].quality < 50) {                   //quality never exceeds 50
                        this.items[i].quality += 1;
                    }
                    break;
                case 'Sulfuras, Hand of Ragnaros':
                    this.items[i].quality = 80;                         //quality is constant at 80
                    break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    if (this.items[i].sellIn <= 0) {
                        this.items[i].quality = 0;
                    } else if (this.items[i].sellIn <= 5) {
                        this.items[i].quality += 3;
                    } else if (this.items[i].sellIn <= 10) {
                        this.items[i].quality += 2;
                    } else {
                        this.items[i].quality += 1;
                    }
                    break;
                case 'Conjured Mana Cake':
                    this.items[i].quality -= this.items[i].sellIn <= 0 ? 4 : 2;             //conjured loses quality twices as fast a normal items
                    break;
                default:
                    this.items[i].quality -= this.items[i].sellIn <= 0 ? 2 : 1;             //normal items lose quality by 1 if sellin is more than 0. Lose quality Twice as fast is sellin less/equal to 0
            }

            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].sellIn -= 1;
            }

            if (this.items[i].quality < 0) {
                this.items[i].quality = 0;                                                                        //quality cannot be negative
            } else if (this.items[i].name != 'Sulfuras, Hand of Ragnaros' && this.items[i].quality > 50) {
                this.items[i].quality = 50;                                                                        //quality cannot exceed 50 exception is sulfuras
            }
        }

        return this.items;
    }
}


