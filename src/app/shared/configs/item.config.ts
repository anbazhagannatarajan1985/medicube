
export class ItemConfig {

  static getImages() {
    return [
      { id: 'CAPSULE', url: '/assets/images/capsule1.jpg' },
      { id: 'DROP', url: '/assets/images/drops1.jpg' },
      { id: 'INJECTION', url: '/assets/images/injection1.jpg' },
      { id: 'SYRUP', url: '/assets/images/liquid1.jpg' },
      { id: 'POWDER', url: '/assets/images/powder1.jpg' },
      { id: 'TABLET', url: '/assets/images/tablet3.jpg' },
    ];
  }

  static getImageUrl(key: string) {
    const images = this.getImages();
    const image = images.filter(item => key === item.id);

    return !!image && image.length > 0 ? image[0].url : null;

  }

  static getCategories() {
    return [
      { id: 'PHARMA', name: 'PHARMA' },
      { id: 'PER-CARE', name: 'PERSONAL CARE' },
      { id: 'BABY-CARE', name: 'BABY CARE' },
      { id: 'NUTRITION', name: 'NUTRITION' },
    ];
  }

  static getSubCategories() {
    return [
      { id: 'CAPSULE', name: 'Capsule' },
      { id: 'DROP', name: 'Drops' },
      { id: 'INJECTION', name: 'Injection' },
      { id: 'SYRUP', name: 'Syrup' },
      { id: 'POWDER', name: 'Powder' },
      { id: 'TABLET', name: 'Tablet' },
    ];
  }

}
