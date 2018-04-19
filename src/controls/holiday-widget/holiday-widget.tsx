import { Component, Prop, Event, EventEmitter} from '@stencil/core';


@Component({
  tag: 'holiday-widget',
  styleUrl: 'holiday-widget.css'
})
export class HolidayWidget{

  @Prop({ mutable: true }) holidayRemaining: number = 0;
  @Prop({ mutable: true }) totalHoliday: number = 0;

  @Event() requestClicked: EventEmitter;

  clickHandler() {
    this.requestClicked.emit();
  }
  
  render() {
    return (
        <div class="widget widget-card atoll loading widget-demo-holiday">
            <div class="widget-card-inner">
                <div class="value-label"><div class="drag-handle">{this.holidayRemaining}</div></div>

                <div class="card-image pull-right"><span><i class="icon-palm"></i></span></div>

                <div class="switcher">
                    <span>Days Holiday Available</span>
                </div>

                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <button class="btn btn-with-icon btn-atoll" onClick={() => this.clickHandler()}><i class="icon-plus"></i>Book Leave</button>
                        </div>
                        <div id="content"></div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 application-name">
                            <span class="text-feature">Absence Management</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}