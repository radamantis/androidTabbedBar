/*
 * tabbed bar for android
 * @author: Radamantis Torres
 * @company: appcelerator Inc.
 * @email: rtlechuga@appcelerator.com
 */
function tabbedBar(params) {
    //get the params and sets the default values
    if(params.width)
        this.width = params.width;
    else
        this.width = 300;

    if(params.height)
        this.height = params.height;
    else
        this.height = 55;

    if(params.top)
        this.top = params.top;
    else
        this.top = 0;

    if(params.left)
        this.left = params.left;
    else
        this.left = 0;

    if(params.backgroundColor)
        this.backgroundColor = params.backgroundColor;
    else
        this.backgroundColor = '#ccc';

    if(params.backgroundImage)
        this.backgroundImage = params.backgroundImage
    else
        this.backgroundImage = null;

    if(params.buttonSelectedColor)
        this.buttonSelectedColor = params.buttonSelectedColor;
    else
        this.buttonSelectedColor = "#3366ff";

    if(params.buttonColor)
        this.buttonColor = params.buttonColor;
    else
        this.buttonColor = "#33ccff";

    if(params.index)
        this.index = params.index;
    else
        this.index = 0;

    if(params.labels)
        this.labels = params.labels
    else
        this.labels = ["default"];

    // build all the mainView
    this.mainView = Ti.UI.createView({
        width : this.width,
        height : this.height,
        top : this.top,
        left : this.left,
        backgroundColor : this.backgroundColor,
        borderRadius : 5,
        borderColor : '#eee',
        borderWidth : 1,
        layout : "horizontal"
    });
    //if the developer is passing an image for the background of the view, then, we set the image
    if(this.backgroundImage != null)
        this.mainView.backgroundImage = this.backgroundImage;
    //creation of the views as buttons
    this.createBtn();
    var self = this;
    // handle the click event into the view
    this.mainView.addEventListener("click", function(e) {
        if(e.source.selected === false) {
            self.clicked(self, e.source);
        }
    });

    //return this.mainView;
}

//function to handle the click
tabbedBar.prototype.clicked = function(self, e) {
    e.backgroundColor = self.buttonSelectedColor;
    self.mainView.children[self.index].backgroundColor = self.buttonColor;
    self.mainView.children[self.index].selected = false;
    e.selected = true;
    self.index = e.index;
}
//function to create a button
tabbedBar.prototype.createBtn = function() {
    /*create each button and put it inside the main view, we should check which one is preselected,
     * no worries if not, by default, we are selecting the first one if the developer
     * does not send a preselected view
     */
    var viewWidth = (this.width / this.labels.length) - 7;
    Ti.API.info("ViewWidth: " + viewWidth + ',' + "labels length: " + this.labels.length);
    var viewHeight = this.height - 6;
    var bgcolor = null;
    var slctd = null;
    for(var i = 0, j = this.labels.length; i < j; i++) {
        var label = Ti.UI.createLabel({
            background : "transparent",
            color : "#111",
            font : {
                fontSize : 15
            },
            text : this.labels[i],
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            top : ((viewHeight / 2) - 11),
            touchEnabled : false
        });
        if(this.index == i){
            bgcolor = this.buttonSelectedColor;
            slctd = true;
        }else{
            bgcolor = this.buttonColor;
            slctd = false;
        }
        var oneView = Ti.UI.createView({
            height : viewHeight,
            width : viewWidth,
            backgroundColor : bgcolor,
            borderColor : '#fff',
            borderWidth : 1,
            borderRadius : 5,
            left : 5,
            index : i,
            selected : slctd
        });
        oneView.add(label);
        this.mainView.add(oneView);
    }
}

tabbedBar.prototype.getIndex = function() {
    return this.index;
};

tabbedBar.prototype.setIndex = function(index) {
    this.clicked(this, this.mainView.children[index]);
};

module.exports = tabbedBar;

