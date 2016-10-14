import { Component, OnInit, ElementRef, Input, OnChanges, SimpleChange }  from '@angular/core';
declare var $: any;

@Component({
    selector: 'fixed-ht',
    template: ``
})
export class fixedHeight implements OnInit {
    constructor(private _elmRef: ElementRef) { }
    @Input() controlId: string;
    @Input() expandStatus: string;
    controlParentId: string;
    isExpendClass: boolean = false;
    isExpend: boolean = false;
    tempOldClass: string = '';
    maximizeClass: string;
    fullWidth: string;

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let propName in changes) {
            let changedProp = changes[propName];
            if (propName == "controlId") {
                this.controlParentId = changedProp.currentValue;
            }
            else {
                let expandParentStatus = changedProp.currentValue;
            }
        }

        this.expandChart();

    }

    ngOnInit() {

        var tempProductionHeight = 0;

        var dynamicTempChartsHeight = 0;
        var dynamicTempSingleChartHeight = 0;

        var wellChartId = "myChartNew";
        var wellChartContent = "wellChartContent";
        var wellChartCompress = "wellChartCompress";
        var wellChartExpend = "wellChartExpend";
        this.maximizeClass = "col-md-12";
        this.tempOldClass = "col-md-4";
        this.fullWidth = "position:absolute;z-index:100;width:100%;height:100%";
     
      

        //$(this._elmRef.nativeElement)
        //    .find('button')
        //    .on('click', function () {
        //        alert('Hello Hemant');
        //    });

        //Dashboard fixedht Height
        $('#fixed-ht').height($(window).height() - 147);
        $(document).ready(fixedht);
        $(window).resize(fixedht);
        $(window).load(fixedht);
        customResize();

        function fixedht() {
            return $('#fixed-ht').height($(window).height() - 147);
        }


        function customResize() {
            if ($(window).width() > 991) {
                //heightSet();
                //if (myCharts.length === 1) {
                //    if (isExpend === true) {
                $('.production').css('height', fixedht());
                //    } 
                //} 
            }
            //else {
            //    $.each(myCharts, function (index, value) {
            //        $("#" + value).css('height', "300px");
            //    });
            //}
        }


        



        /* expendChart(id, expendClass) {
            if (isExpendClass === false) {
                isExpend = true;
                tempOldClass = expendClass;
                $("." + id).removeClass(expendClass).addClass(maximizeClass);
                //$("#" + minId).show();
                //$("#" + maxId).hide();
                //$("#" + chartId).css('height', tempProductionHeight);
                isExpendClass = true;
            } else {
                isExpend = false;
                $("." + id).removeClass(maximizeClass).addClass(tempOldClass);
                //if (isOdd === "false") {
                //    $("#" + id).removeClass("clsPaddingRight0");
                //}
                //$("#" + minId).hide();
                //$("#" + maxId).show();
                //(wellChartContent === "wellChartContent1") ? $("#" + chartId).css('height', dynamicTempSingleChartHeight) : $("#" + chartId).css('height', dynamicTempChartsHeight);
                isExpendClass = false;
            };

        };*/





    }

    expandChart() {
        //alert(this.controlParentId);
        if (this.isExpendClass === false) {
            this.isExpend = true;
            //this.tempOldClass = "col-md-4";
            //$("." + this.controlParentId).removeClass(this.tempOldClass).addClass(this.maximizeClass);
            //$("#" + minId).show();
            //$("#" + maxId).hide();
            //$("#" + chartId).css('height', tempProductionHeight);
            this.isExpendClass = true;
        } else {
            this.isExpend = false;
            $("." + this.controlParentId).removeClass(this.tempOldClass).addClass(this.fullWidth);
            //if (isOdd === "false") {
            //    $("#" + id).removeClass("clsPaddingRight0");
            //}
            //$("#" + minId).hide();
            //$("#" + maxId).show();
            //(wellChartContent === "wellChartContent1") ? $("#" + chartId).css('height', dynamicTempSingleChartHeight) : $("#" + chartId).css('height', dynamicTempChartsHeight);
            this.isExpendClass = false;
        };

        //var ids = $('.over-view').map(function () {
        //    return $(this).attr('id');
        //});

        //$.each(ids, function (index, value) {
        //    if (this.isExpendClass === true) {
        //        if (value !== this.controlParentId) {
        //            $("#" + value).hide();
        //        };
        //    } else {
        //        $("#" + value).show();
        //    }
        //})
    }

}