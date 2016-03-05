console.log('Homework 2-A...')

d3.csv('../data/hubway_trips_reduced.csv',parse,dataLoaded);

function dataLoaded(err,rows){

    var cf = crossfilter(rows),
        tripsByTime = cf.dimension(function(d){return d.startTime}),
        tripsByAge = cf.dimension(function(d){return d.userAge}),
        tripsByDuration = cf.dimension(function(d){return d.duration}),
        tripsByStartStation = cf.dimension(function(d){return d.startStation});

    //Filtering

    //How many trips in 2012 only?
    tripsByTime.filter([new Date(2012,0,1),new Date(2012,11,31)]);
    console.log(tripsByTime.top(Infinity).length);

    //How many trips in 2012 are by those under 18?
    tripsByAge.filter([.1,18]);
    console.log(tripsByAge.top(Infinity));
    console.log(tripsByTime.top(Infinity));

    //How many trips in 2012 are by those over 60?
    tripsByAge.filter(function(d){return d<20 || d>40});
    console.log(tripsByAge.top(Infinity).length);
    console.log(tripsByTime.top(Infinity).length);

    //How many trips in 2012 started from Northeastern (station id 5)?
    tripsByAge.filterAll();
    tripsByStartStation.filter('5');
    console.log(tripsByTime.top(Infinity).length);

    //Clear all filters
    tripsByStartStation.filterAll();
    tripsByTime.filterAll();


    //Group
    //Combine trips into 10-year age groups; how many trips in each age group?





    tripsByAgeGroup = tripsByAge.group(function(d){return Math.floor(d/10)});
    console.log(tripsByAgeGroup.all());

}

function parse(d){
    if(+d.duration<0) return;

    return {
        duration: +d.duration,
        startTime: parseDate(d.start_date),
        endTime: parseDate(d.end_date),
        startStation: d.strt_statn,
        endStation: d.end_statn,
        userAge: d.birth_date?parseDate(d.start_date).getFullYear()- (+d.birth_date):0,
        gender:d.gender? d.gender:"Unknown"
    }
}

function parseDate(date){
    var day = date.split(' ')[0].split('/'),
        time = date.split(' ')[1].split(':');

    return new Date(+day[2],+day[0]-1, +day[1], +time[0], +time[1]);
}

