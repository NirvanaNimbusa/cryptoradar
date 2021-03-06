"use strict";

const Strategy = require("./Strategy"),
    DeepPeakPromise = require("../Indicators/DeepPeakPromise"),
    Margin = require("../Indicators/Margin"),
    Mean = require("../Indicators/Mean"),
    SMA = require("../Indicators/SMA");

class PromiseBased extends Strategy {

    constructor(action) {
        super();
        this.action = action;
        this.init();
    }

    init() {
        this.add(new Mean(this.action === "buy" ? "down" : "up"));

        //TODO: this SMA must be removed from here, It needs a new strategy for itself
        //this.add(new SMA(this.action === "buy" ? "buy" : "sell"));
        this.add(new DeepPeakPromise(this.action === "buy" ? "deep" : "peak"));
        this.add(new Margin(this.action));

    }

    update(data) {
        this.updateIndicators(data)
    }

    check() {
        return this.checkAdvices();
    }

}

module.exports = PromiseBased;