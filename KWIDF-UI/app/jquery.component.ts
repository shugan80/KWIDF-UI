import { Component, OnInit, ElementRef }  from '@angular/core';
declare var $: any;

@Component({
    selector: 'jquery-app',
    template: ``
})
export class jQueryComponent implements OnInit {
    constructor(private _elmRef: ElementRef) { }

    ngOnInit() {

        //Expand Collapse  Side bar
        $(function () {
            $(".handle").on("click", function () {
                $(".body-container").toggleClass("menuCollapsed");
            });
        })

  

 

    }
}