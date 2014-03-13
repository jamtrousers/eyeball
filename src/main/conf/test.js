module.exports = function(testers){

    var tests = {
        browser : [{
            name : 'dommonster',
            src: 'lib/dommonster.js',
            extractor : testers.dommonster
        }],
        har : [{
            name : 'yslow',
            extractor : testers.yslow
        }],
        markup : [{
            name : 'validator',
            extractor : testers.validator
        }]
    };

    var grades = {
        percentage : { A : 90,B : 80,C : 70,D : 60,E : 50, F : 0},
        points : {F : 32,E : 16,D : 8,C : 4,B : 2,A : 1},
        time : {
            lt : { F : 6000,E : 5000,D : 4000,C : 3000,B : 2000,A : 0},
            lt_u : { F : 6000,E : 5000,D : 4000,C : 3000,B : 2000,A : 0},
            dt : { F : 5000,E : 4000,D : 3000,C : 2000,B : 1000,A : 0},
            dt_u : { F : 5000,E : 4000,D : 3000,C : 2000,B : 1000,A : 0}
        },
        yslow : {
            o : { A : 90,B : 80,C : 70,D : 60,E : 50, F : 0},
            w : { F : 1000000,E : 750000,D : 500000,C : 250000,B : 125000,A : 0},
            w_c : { F : 1000000,E : 750000,D : 500000,C : 250000,B : 125000,A : 0},
            r : {F : 60,E : 50,D : 40,C : 30,B : 20,A : 0},
            r_c : {F : 60,E : 50,D : 40,C : 30,B : 20,A : 0},
            lt : { F : 6000,E : 5000,D : 4000,C : 3000,B : 2000,A : 0},
            g : {
                yminify : {
                    score : { A : 90,B : 80,C : 70,D : 60,E : 50, F : 0}
                }
            }
        },
        dommonster : {
            COMPOSITE_stats : { A : 90,B : 80,C : 70,D : 60,E : 50, F : 0},
            stats : {
                //serialization time
                elements : {F : 1500, E: 1125,D : 1000,C : 875,B : 750,A :0},
                nodes : {F : 2500, E: 2125,D : 2000,C : 1875,B : 1750,A :0},
                "text nodes" : {F : 1500, E: 1125,D : 1000,C : 875,B : 750,A :0},
                "text node size" : {F : 360000, E: 290000,D : 220000,C : 150000,B : 80000,A :0},
                "content percentage" : {A : 50, B: 45,C : 40,D : 35,E : 30,F :0},
                "average nesting depth" : {F : 15.5, E: 14,D : 12.5,C : 11,B : 9.5,A :0},
                "serialized DOM size" : {F : 204800, E: 179200,D : 153600,C : 128000,B : 102400,A :0}
            }
        },
        validator : {
            COMPOSITE_info : { A : 90,B : 80,C : 70,D : 60,E : 50, F : 0},
            info : {
                errors : {F : 5, E: 4,D : 3,C : 2,B : 1,A :0},
                warnings : {F : 25, E: 20,D : 15,C : 10,B : 5,A :0}
            }
        }
    };


    // add tests and grade mappings here

    return {
        tests : tests,
        grades : grades
    };

};