export class Card {
  constructor(public readonly hash: string,
              public readonly containerHash: string,
              public readonly sessionHash: string,
              public readonly text: string) {
  }
}
