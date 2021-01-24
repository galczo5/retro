import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContainersService} from '../../session/containers.service';
import {CardsService} from '../../session/cards.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Container} from '../../models/container';
import {Card} from '../../models/card';
import {ExportService} from '../export.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.css']
})
export class ExportButtonComponent implements OnInit, OnDestroy {

  private readonly onDestroy$: Subject<void> = new Subject<void>();
  private containers: Array<Container> = [];
  private cards: Array<Card> = [];

  constructor(private readonly containersService: ContainersService,
              private readonly cardsService: CardsService,
              private readonly exportService: ExportService) {
  }

  ngOnInit(): void {

    this.containersService.getContainers()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(containers => {
        this.containers = containers;
      });

    this.cardsService.getCards()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(containers => {
        this.cards = containers;
      });

  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  export(): void {
    const fileString = this.exportService.exportMarkdown(this.containers, this.cards);
    const blob = new Blob([fileString], {type: 'text/plain;charset=utf-8'});
    const filename = `Retro ${new Date().toDateString()}.md`.replace(/\s/gi, '_');

    saveAs(blob, filename);
  }
}
