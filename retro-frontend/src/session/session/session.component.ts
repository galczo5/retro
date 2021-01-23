import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainersService } from '../containers.service';
import { SessionHashService } from '../session-hash.service';
import { Container } from '../../models/container';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy {

  containers: Array<Container>;

  hash: string;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly route: ActivatedRoute,
              private readonly containersService: ContainersService,
              private readonly sessionHashService: SessionHashService) { }

  ngOnInit(): void {
    this.hash = this.route.snapshot.paramMap.get('id');

    this.sessionHashService.setHash(this.hash);
    this.containersService.fetch();

    this.containersService.getContainers()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(containers => {
        this.containers = containers;
      })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
