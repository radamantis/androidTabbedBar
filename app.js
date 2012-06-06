// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var win1 = Titanium.UI.createWindow();

var tabbedBar = require('androidtabbedbar');


var bar = new tabbedBar({
        width   : '250',
        height  : '34',
        top     : '10',
        left    : '10',
        backgroundColor : '#ccc',
        buttonColor     :'#33ccff',
        buttonSelectedColor :'#3366ff',
        labels: ['one', 'two'],
        index   : 1
        });
var tBar = bar.mainView;
tBar.addEventListener("click", function(e){
    Ti.API.info("CLICK!!!!"+e.source.index);
})

win1.add(bar.mainView);

Ti.API.info('**************** get index: '+bar.getIndex());
Ti.API.info('***************** lets change the index');
bar.setIndex(0);


win1.open();