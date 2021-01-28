import {Injectable} from '@angular/core';
import {CardsContainer} from '../models/cardsContainer';
import {Card} from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportMarkdown(containers: Array<CardsContainer>, cards: Array<Card>): string {
    let result = '';
    for (const container of containers) {
      result += '# <span style="color:blue">' + container.name + '</span>\n';
      const mappedCards = cards.filter(card => card.containerHash === container.hash).map(card => card.text).join('\n');
      result += mappedCards + '\n\n';
    }

    return result;
  }

}
