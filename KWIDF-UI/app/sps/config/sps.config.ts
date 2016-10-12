import { DateFilter } from '../../shared/model/filter';

export const SPS_Config_Items = {
    "title": "SPS",
    "contentmenuItems": [
        {
            "menuText": "Overview",
            "menuUrl": "overview",
            "imgStyle": "fa fa-tachometer"
        },
        {
            "menuText": "Loss & Gain",
            "menuUrl": "lossgain",
            "imgStyle": "fa fa-sitemap"
        },
        {
            "menuText": "Well Test Priority",
            "menuUrl": "welltestpriority",
            "imgStyle": "fa fa-sitemap"
        },
        {
            "menuText": "Alarms/Events",
            "menuUrl": "alarmsevents",
            "imgStyle": "fa fa-sitemap"
        }
    ],
    "overview_WellEvents_Config": {
        "title": "Well Events",
        "isTitleVisible": false,
        "isDataLabelsEnabled": false,
        "subTitle": "",
        "xAxisTitle": "",
        "yAxisTitle": "No of Events",
        "isLegendEnabled": false,
        "yAxisTickInterval": 2

    },
    "overview_WellStatus_Config": {
        "title": "Overall Well Status",
        "isTitleVisible": false,
        "isDataLabelsEnabled": true,
        "dataLablesColor": "white",
        "subTitle": "",
        "isLegendEnabled": true,
        "seriesName": "Well Status",
        "toolTipPointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"

    },
    "overview_DownTime_ProdLoss_Config": {
        "title": "Downtime Vs Prod Loss",
        "isTitleVisible": false,
        "subTitle": "",
        "isDataLabelsEnabled": true,
        "dataLablesColor": "white",
        "isLegendEnabled": true,
        "yAxisPrimaryTitle": "Downtime Hours/Well Count",
        "yAxisSecondaryTitle": "Stb/d(1000s)",
        "xAxisTickInterval": 1,
        "yAxisPrimaryTickInterval": 50,
        "yAxisSecondaryTickInterval": 0.2

    },
    "overview_Historic_Production_Config": {
        "title": "Historic Production",
        "isTitleVisible": false,
        "subTitle": "Production vs. Allowable vs. PGOR test",
        "isDataLabelsEnabled": true,
        "dataLablesColor": "white",
        "isLegendEnabled": true,
        "yAxisTitle": "Stb/d(1000s)",
        "xAxisTickInterval": 2,
        "yAxisTickInterval": 20

    },
    "lossGain_Production_Config": {
        "title": "Production",
        "isTitleVisible": false,
        "isDataLabelsEnabled": true,
        "dataLablesColor": "white",
        "subTitle": "",
        "isLegendEnabled": true,
        "seriesName": "Well Status"
    },
    "lossGain_FieldLossGain_Config": {
        "title": "Field Losses & Gains",
        "isTitleVisible": false,
        "isDataLabelsEnabled": false,
        "subTitle": "",
        "xAxisTitle": "",
        "yAxisTitle": "No of Events",
        "isLegendEnabled": false

    }
}

export const SPS_HistoricProd_DateFilters: DateFilter[] = [
    {
        text: "Day",
        value: "day"
    },
    {
        text: "Week",
        value: "week"
    },
    {
        text: "Month",
        value: "month"
    },
    {
        text: "Year",
        value: "year"
    }
]