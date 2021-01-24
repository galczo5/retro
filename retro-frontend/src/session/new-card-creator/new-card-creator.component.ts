import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContainersService} from '../containers.service';
import {switchMap, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Container} from '../../models/container';
import {SessionHashService} from '../session-hash.service';
import {SessionHttpService} from '../../app/session-http.service';
import {Location} from '@angular/common';
import {UserIdService} from '../../app/user-id.service';

@Component({
  selector: 'app-new-card-creator',
  templateUrl: './new-card-creator.component.html',
  styleUrls: ['./new-card-creator.component.css']
})
export class NewCardCreatorComponent implements OnInit, OnDestroy {

  containers: Array<Container> = [];

  selectedContainer: string;

  preview = `
# Card example :heart_eyes_cat:
You can use markdown (like in Git Hub) to create your own styled card.

* Lists
* Text **styles** and other cool *features*
* Emojis :heart: [cheatsheet - emoji list](https://github.com/ikatyang/emoji-cheat-sheet)
  `;
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly containersService: ContainersService,
              private readonly sessionHashService: SessionHashService,
              private readonly httpService: SessionHttpService,
              private readonly location: Location,
              private readonly userIdServiceService: UserIdService) {
  }

  ngOnInit(): void {
    this.containersService.fetch();
    this.containersService.getContainers()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(containers => {
        this.containers = containers;

        if (containers.length) {
          this.selectedContainer = containers[0].hash;
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  setPreview(input: HTMLTextAreaElement): void {
    this.preview = input.value;
  }

  setSelectedContainer(hash: string): void {
    this.selectedContainer = hash;
  }

  getSelectedContainerText(): string {
    const container = this.containers.find(c => c.hash === this.selectedContainer);
    return container ? container.name : 'Card preview';
  }

  createCard(input: HTMLTextAreaElement): void {
    const userId = this.userIdServiceService.getUserId();

    this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(hash =>
          this.httpService.createCard(hash, this.selectedContainer, input.value)
        )
      )
      .subscribe(() => {
        this.location.back();
      });
  }
}
