import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ContainersService} from '../containers.service';
import {switchMap, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Container} from '../../models/container';
import {SessionHashService} from '../session-hash.service';
import {SessionHttpService} from '../../app/session-http.service';
import {Location} from '@angular/common';
import {UserIdService} from '../../app/user-id.service';
import {ActivatedRoute} from '@angular/router';
import {SaveLabelComponent} from '../../buttons/save-label/save-label.component';

const defaultCardText = `
# Card example :heart_eyes_cat:
You can use markdown (like in Git Hub) to create your own styled card.

* Lists
* Text **styles** and other cool *features*
* Emojis :heart: [cheatsheet - emoji list](https://github.com/ikatyang/emoji-cheat-sheet)
`;

@Component({
  selector: 'app-new-card-creator',
  templateUrl: './new-card-creator.component.html',
  styleUrls: ['./new-card-creator.component.css']
})
export class NewCardCreatorComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('input', { read: ElementRef })
  inputElement: ElementRef;

  @ViewChild('saveLabel', { read: SaveLabelComponent })
  saveLabel: SaveLabelComponent;

  containers: Array<Container> = [];

  selectedContainer: string;

  preview = defaultCardText;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly containersService: ContainersService,
              private readonly sessionHashService: SessionHashService,
              private readonly httpService: SessionHttpService,
              private readonly location: Location,
              private readonly userIdServiceService: UserIdService,
              private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.containersService.fetch();
    this.containersService.getContainers()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(containers => {
        this.containers = containers;

        if (containers.length) {
          const container = this.activatedRoute.snapshot.queryParamMap.get('container');
          this.selectedContainer = container || containers[0].hash;
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngAfterViewInit(): void {
    const nativeElement = this.inputElement.nativeElement as HTMLElement;
    nativeElement.focus();
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
    if (!input.value) {
      return;
    }

    this.saveLabel.startSave();
    this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(hash =>
          this.httpService.createCard(hash, this.selectedContainer, input.value)
        )
      )
      .subscribe(() => {
        this.saveLabel.endSave();
      });
  }

  onSaved(): void {
    const nativeElement = this.inputElement.nativeElement as HTMLTextAreaElement;
    nativeElement.value = '';
    nativeElement.focus();
    this.preview = defaultCardText;
  }

  checkSave(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key.toLocaleLowerCase() === 'enter') {
      this.createCard(this.inputElement.nativeElement as HTMLTextAreaElement);
    }
  }
}
