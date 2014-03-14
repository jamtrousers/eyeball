/*global eyeballApp*/

eyeballApp.factory('fieldConfig',function(){

    var fields = {
        display : {}, //reserved
        overview : {}, //reserved
        time :{
            name : 'Load time',
            metric : 'lt',
            format : 'time',
            items : [
                {metric : 'lt', name: 'Load time', format : 'time'},
                {metric : 'dt', name: 'DOM load time', format : 'time'},
                {metric : 'lt_u', name: 'Load time (uncached)', label : 'Load time (u/c)', format : 'time'},
                {metric : 'dt_u', name: 'DOM load time (uncached)', label: 'DOM time (u/c)', format : 'time'}
            ]
        },
        yslow : {
            name : 'YSlow',
            metric : 'o',
            items : [
                {metric : 'o', name : 'Overall'},
                {metric : 'w', name : 'Page size', format : 'size', label : 'Size'},
                {metric : 'w_c', name : 'Page size (cached)', format : 'size', label:'Size (c)'},
                {metric : 'r', name : 'HTTP requests', label: 'Requests'},
                {metric : 'r_c', name : 'HTTP requests (cached)', label: 'Requests (c)'}
            ]
        },
        dommonster : {
            name : 'DomMonster',
            metric : 'COMPOSITE_stats',
            items : [
                {metric : 'COMPOSITE_stats', name : 'Overall'},
                {metric : 'stats.elements', name : 'Elements'},
                {metric : 'stats.nodes', name : 'Nodes'},
                {metric : 'stats.text nodes', name : 'Text nodes', label:'Text'},
                {metric : 'stats.text node size', name : 'Text node size', label:'Text size'},
                {metric : 'stats.content percentage', name : 'Content Percentage', label:'Content'},
                {metric : 'stats.average nesting depth', name : 'Nesting'},
                {metric : 'stats.serialized DOM size', name : 'DOM size'}
            ]
        },
        validator : {
            name : 'Validator',
            metric : 'COMPOSITE_info',
            items : [
                {metric : 'COMPOSITE_info', name : 'Overall'},
                {metric : 'info.errors', name : 'Errors'},
                {metric : 'info.warnings', name : 'Warnings'}
            ]
        }
    };

    // add custom fields here
    /*fields.elementCounter = {
        name : 'Element Count',
        metric : 'total',
        items : [
            {metric : 'total', name : 'Total'},
            {metric : 'DIV', name : 'DIV'},
            {metric : 'A', name : 'A'},
            {metric : 'P', name : 'P'}
        ]
    };*/

    //include any custom fields in here if you want them on the overview screens
    fields.overview = {
        name : 'Overview',
        items : ['time','yslow','dommonster','validator'/*,'elementCounter'*/]
    };
    var f, items, i=0;
    // process the fields for backwards compat with current usage. Maybe simplify at some point
    for (f in fields) {
        if(fields.hasOwnProperty(f)) {
            fields[f].tool = f;
            if(fields[f].items) {
                items = fields[f].items;
                for(i=items.length-1;i>=0;i--) {
                    if(typeof items[i] === "string") {
                        items[i] = fields[items[i]];
                    } else if (typeof items[i] === "object") {
                        items[i].tool = f;
                    }
                }
            }
        }
    }


    fields.display = [fields.overview].concat(fields.overview.items);

    return fields;

});