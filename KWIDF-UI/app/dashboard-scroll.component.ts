import { Component, OnInit, ElementRef }  from '@angular/core';
declare var $: any;

@Component({
    selector: 'fixed-ht',
    template: ``
})
export class fixedHeight implements OnInit {
    constructor(private _elmRef: ElementRef) { }

    ngOnInit() {

  


        //$(this._elmRef.nativeElement)
        //    .find('button')
        //    .on('click', function () {
        //        alert('Hello Hemant');
        //    });

     //Dashboard fixedht Height
        $('#fixed-ht').height($(window).height() - 200);
        $(document).ready(fixedht);
        $(window).resize(fixedht);
        $(window).load(fixedht);

        function fixedht() {
            var a = $('#fixed-ht').height($(window).height() - 200);
        }

 

    }
}