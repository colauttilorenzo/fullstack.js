// ---------------- libraries ---------------
import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { OverlayService } from '@app/services/overlay.service';
import { SpinnerService } from '@app/services/spinner.service';
import { Subscription } from 'rxjs';
// ---------------- libraries ---------------


@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy, OnChanges {

  public is_overlay_active: boolean = false;
  public exit_delegate: Function = () => { };

  public is_loader_active: boolean = false;

  constructor(private overlay: OverlayService, private spinner: SpinnerService) {


    this.overlay.isactive.subscribe((data: boolean) => {
      this.is_overlay_active = data;
    });

    this.overlay.exitdelegate.subscribe((data: Function) => {
      this.exit_delegate = data;
    });

  }


  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

    this.spinner.isactive.subscribe((data: boolean) => {
      this.is_loader_active = data;
      if (this.is_loader_active) {
        this.overlay.set = true;
      }
    });

  }

  ngOnDestroy() {

  }

  public exit(): void {
    this.exit_delegate();
    if (this.is_loader_active === false) {
      this.overlay.set = false;
    }
  }

}