import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
    it('should decrease quality and sellIn for normal items', () => {
        const gildedRose = new GildedRose([new Item('normal', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(19);
        expect(items[0].sellIn).toBe(9);
    });

    it('should increase quality for Aged Brie', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(21);
    });

    it('should not change quality for Sulfuras', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(80);
    });

    it('should increase quality by 2 for Backstage passes when sellIn is less than 11', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(22);
    });

    it('should increase quality by 3 for Backstage passes when sellIn is less than 6', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(23);
    });

    it('should decrease quality by 2 for Conjured items', () => {
        const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(18);
    });

    it('should decrease quality twice as fast for normal and Conjured items after sellIn is less than or equal to zero', () => {
      const gildedRose = new GildedRose([
          new Item('normal', 0, 20),
          new Item('Conjured Mana Cake', 0, 20)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(18); // Normal item
      expect(items[1].quality).toBe(16); // Conjured item
    });

    it('should not let quality pass 50, with the exception of Sulfuras', () => {
      const gildedRose = new GildedRose([
          new Item('Aged Brie', 10, 50),
          new Item('Backstage passes to a TAFKAL80ETC concert', 15, 50),
          new Item('Sulfuras, Hand of Ragnaros', 0, 80)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50); // Aged Brie
      expect(items[1].quality).toBe(50); // Backstage passes
      expect(items[2].quality).toBe(80); // Sulfuras
  });
  
  
});
