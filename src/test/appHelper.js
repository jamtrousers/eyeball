var eyeballTestData = {};

var eyeball = {
    logger : {
        error : function(){},
        info : function(){}
    },
    DB : {
        find : function(one,two,three) {
            if(typeof two === "function") {
                return two(null,eyeballTestData);
            } else if(typeof three === "function") {
                return three(null,eyeballTestData);
            }
            eyeballTestData = {
                dbQuery : one,
                cfg : two,
                dbCfg : three
            };
            return {
                sort : function(cfg,cb) {
                    cb();
                }
            }
        }
    }
};

var exports = function () {
    return;
};

var spies = {};

var helpers = {
    require : function(name) {

        function returnIfExists(funcName) {
            if(window[funcName]) {
                return window[funcName]();
            }
            return null;
        }

        if(name === "fs") {

            var obj = {
                writeFile : function(file,data,cb) {
                    return cb();
                },
                readFile: function() {},
                unlink : function(){}
            };
            spies.writeFile = spyOn(obj,"writeFile");

            return obj;

        } else if(name === "yslow") {
            return {
                YSLOW : {
                    harImporter : {
                        run : function() {
                            return {
                                context : {
                                    PAGE : {
                                        overallScore : 90
                                    },
                                    result_set : {
                                        getRulesetApplied : function(){
                                            return {};
                                        },
                                        getResults: function(){
                                            return [{score : 90, message : 'I love eyeball',rule_id : "overall"}];
                                        }
                                    }
                                }
                            };
                        }
                    },
                    util : {
                        isArray : function(){},
                        getPageSpaceid : function(){}
                    },
                    doc : {
                        rules : {
                            myMadeUpRule : {
                                name : "Test rule"
                            }
                        }
                    }
                }
            }
        } else if (name === "jsdom") {
            return {
                jsdom : function() {}
            }
        } else if (name.indexOf('/conf/test') !== -1){
            return returnIfExists("configTest");
        } else if (name.indexOf('/conf/report') !== -1){
            return returnIfExists("configReport");
        } else if (name === './grader'){
            return returnIfExists("EyeballControllersTestGrader");
        } else if (name === './yslowOverride'){
           return returnIfExists("EyeballControllersTestYslowOverride");
        } else if (name === './phantom'){
            return returnIfExists("EyeballControllersTestPhantom");
        } else if (name === './validator'){
            return returnIfExists("EyeballControllersTestValidator");
        } else if (name.indexOf('controllers/test/test') !== -1){
            return EyeballControllersTestTest;
        } else if(name === "child_process") {
            var on = function(evt,cb){
                return cb();
            };
            var stdout = {
                on : on
            };
            var stderr = stdout;
            return {
                exec : function(){
                    return {
                        on : on,
                        stdout : stdout,
                        stderr : stderr
                    }
                }
            }
        } else if(name === "url") {
            return {
                init : function(data) {
                    eyeballTestData = data;
                },
                parse : function() {
                    eyeballTestData.path = {
                        match : function() {
                            return eyeballTestData;
                        }
                    };
                    return eyeballTestData;
                }
            }
        } else if (name === "node-phantom-simple") {
            return {
                create : function(){}
            }
        } else if (name === "phantomjs") {
            return {
                path : "somepath"
            }
        } else if (name === "mongojs") {
            return {
                ObjectId : function(){}
            }
        } else if (name.indexOf("/util") !== -1) {
            return EyeballUtil();
        } else if (name === "q") {
            return {
                defer : function(){
                    return {
                        resolve : function() {}
                    }
                }
            }
        } else if (name === "lodash") {
            return {
                find : function(){}
            }
        }

        return function(args) {
            return args || {};
        }
    },
    res : {
        headers : {},
        setHeader : function(name,value) {
            this.headers[name] = value;
        },
        send : function(output) {
            this.output = output;
        }
    },

    process : {
        on : function(){}
    }
};

require = helpers.require;
process = helpers.process;