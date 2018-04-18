$("#TextBoxView").hide();

/*  
 *
 * |------------------------------------------------------------------------
 * | [JS] [C3] X的圖表設定
 * |------------------------------------------------------------------------
 * | Name    :  chartX
 * | About   :  設定X的圖表
 * | UpDate  :  2018.04.14
 * | Writer  :  Lian0123
 *
 */ 
var chartX = c3.generate({
    bindto: "#C3ViewX",
    data: {
        x: 'x',
        colors:{
            X:"#86C166"
        },
        columns: [
            ["x",-5,-4,-3,-2,-1,0,1,2,3,4,5],
            ["X",0,0,0,0,0,0,0,0,0,0,0]
        ],
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.5
        }
    },
    axis:{
        x: {
            tick: {
                format: '%d',
            }
        }
    }
});

/*  
 *
 * |------------------------------------------------------------------------
 * | [JS] [C3] H的圖表設定
 * |------------------------------------------------------------------------
 * | Name    :  chartH
 * | About   :  設定H的圖表
 * | UpDate  :  2018.04.14
 * | Writer  :  Lian0123
 *
 */ 
var chartH = c3.generate({
    bindto: "#C3ViewH",
    data: {
        x: 'x',
        colors:{
            H:"#00AA90"
        },
        columns: [
            ["x",-5,-4,-3,-2,-1,0,1,2,3,4,5],
            ["H",0,0,0,0,0,0,0,0,0,0,0]
        ],
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.5
        }
    },
    axis:{
        x: {
            tick: {
                format: '%d',
            }
        }
    }
});

/*  
 *
 * |------------------------------------------------------------------------
 * | [JS] [C3] Y的圖表設定
 * |------------------------------------------------------------------------
 * | Name    :  chartY
 * | About   :  設定Y的圖表
 * | UpDate  :  2018.04.14
 * | Writer  :  Lian0123
 *
 */ 
var chartY = c3.generate({
    bindto: "#C3ViewY",
    data: {
        x: 'x',
        colors:{
            H:"#555555"
        },
        columns: [
            ["x",-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9.10,11],
            ["Y",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.5
        }
    },
    axis:{
        x: {
            tick: {
                format: '%d',
            }
        }
    }
});

/*  
 *
 * |------------------------------------------------------------------------
 * | [JS] [Vue] 模擬終端機的Vue模組
 * |------------------------------------------------------------------------
 * | Name    :  Terminal
 * | About   :  模擬終端機的Vue模組
 * | UpDate  :  2018.04.14
 * | Writer  :  Lian0123
 *
 */ 
var Terminal = new Vue({
    el:"#Terminal",
    data:{
        TerminalText     :  ["","[請輸入操作指令] 預設X與H位於-5~+5",]  , //模擬終端的內容
        TerminalCounter  :  1                                       , //終端行數計數
        NowText          :  " >"                                    , //現在輸入指令的內容
    },
    methods:{
        /*讀取每次程式的輸入指令*/
        ReadText:function ReadText(event){
            if (event.keyCode == 13) {

                if(Terminal.NowText.trim()[0]=='>'||Terminal.NowText.trim()[0]=='#'){
                    if(Terminal.NowText.trim()[0]=='>'){
                        var Str = Terminal.NowText.trim().slice(1,Terminal.NowText.length).toUpperCase().trim();
                        if(Str.search("HELP")==0&&Str.length==4){
                            Terminal.TerminalText.push(Terminal.NowText);
                            $("#TextBoxView").show();

                        }else if(Str.search("CLEAR")==0&&Str.length==5){
                            Terminal.TerminalText = [];
                            Terminal.TerminalText.push(" ");
                            Terminal.TerminalText.push("[請輸入操作指令]");
                            Terminal.TerminalCounter=1;
                        }else if(Str.search("SET")==0){
                            Str = Str.slice(Str.search("SET")+3,Terminal.NowText.length).trim();
                                if (Str.search("X") == 0) {
                                    Str = Str.slice(1,Terminal.NowText.length).trim();
                                    if (Str.search("=") == 0){
                                        Str = Str.slice(1,Terminal.NowText.length).trim();
                                        if(Str!=""){
                                            if(!isNaN(Number(Str))){
                                                if(Number(Str)>4){
                                                    ConvolutionX.DotID=Number(Str);
                                                    Terminal.TerminalText.push(Terminal.NowText);
                                                }else{
                                                    ConvolutionX.DotID=5;
                                                    Terminal.TerminalText.push("[參數需大於等於5 自動修正] SET X = 5");
                                                }
                                                ConvolutionX.XSet();
                                                ConvolutionX.GUI();
                                            }else{
                                                Terminal.TerminalText.push("[Error25 賦予值的語意錯誤] " + Terminal.NowText);
                                            }
                                        }else{
                                            Terminal.TerminalText.push("[Error24 未指派數值] " + Terminal.NowText);
                                        }
                                    }else{
                                        Terminal.TerminalText.push("[Error23 未指派運算子] " + Terminal.NowText);
                                    }
                                }else if(Str.search('H') == 0){
                                    Str = Str.slice(1,Terminal.NowText.length).trim();
                                    if (Str.search("=") == 0){
                                        Str = Str.slice(1,Terminal.NowText.length).trim();
                                        if(Str!=""){
                                            if(!isNaN(Number(Str))){
                                                if(Number(Str)>4){
                                                    ConvolutionH.DotID=Number(Str);
                                                    Terminal.TerminalText.push(Terminal.NowText);
                                                }else{
                                                    ConvolutionH.DotID=5;
                                                    Terminal.TerminalText.push("[參數需大於等於5 自動修正] SET H = 5");
                                                }
                                                ConvolutionH.HSet();
                                                ConvolutionH.GUI();
                                            }else{
                                                Terminal.TerminalText.push("[Error25 賦予值的語意錯誤] " + Terminal.NowText);
                                            }
                                        }else{
                                            Terminal.TerminalText.push("[Error24 未指派數值] " + Terminal.NowText);
                                        }
                                    }else{
                                        Terminal.TerminalText.push("[Error23 未指派運算子] " + Terminal.NowText);
                                    }
                                }else if(Str.search("ALL") == 0){
                                    Str = Str.slice(3,Terminal.NowText.length).trim();
                                    if (Str.search("=") == 0){
                                        Str = Str.slice(1,Terminal.NowText.length).trim();
                                        if(Str!=""){
                                            if(!isNaN(Number(Str))){
                                                if(Number(Str)>4){
                                                    ConvolutionX.DotID=Number(Str);
                                                    ConvolutionH.DotID=Number(Str);
                                                    Terminal.TerminalText.push(Terminal.NowText);
                                                }else{
                                                    ConvolutionX.DotID=Number(Str);
                                                    ConvolutionH.DotID=Number(Str);
                                                    Terminal.TerminalText.push("[參數需大於等於5 自動修正] SET ALL = 5");
                                                }
                                                ConvolutionX.XSet();
                                                ConvolutionH.HSet();
                                                ConvolutionX.GUI();
                                                ConvolutionH.GUI();
                                            }else{
                                                Terminal.TerminalText.push("[Error25 賦予值的語意錯誤] " + Terminal.NowText);
                                            }
                                        }else{
                                            Terminal.TerminalText.push("[Error24 未指派數值] " + Terminal.NowText);
                                        }
                                    }else{
                                        Terminal.TerminalText.push("[Error23 未指派運算子] " + Terminal.NowText);
                                    }
                                }else{
                                    Terminal.TerminalText.push("[Error22 參數錯誤] " + Terminal.NowText);
                                }
                        }else if(Str.search("LET")==0){
                            Str = Str.slice(Str.search("LET")+3,Terminal.NowText.length).trim();
                                if (Str.search("X") == 0) {
                                    Str = Str.slice(1,Terminal.NowText.length).trim();
                                    if(Str.search("<") == 0){
                                        Str = Str.slice(1,Terminal.NowText.length).trim();
                                        if(Str.search(">")!=-1){
                                            var AID= Number(Str.slice(0,Str.search(">")).trim());
                                            Str = Str.slice(Str.search(">")+1,Terminal.NowText.length).trim()
                                            if (Str.search("=") == 0){
                                                Str = Str.slice(1,Terminal.NowText.length).trim();
                                                if(Str!=""){
                                                    if(!isNaN(Number(Str))&&!isNaN(Number(AID))){
                                                        if(Number(AID)<=ConvolutionX.DotID && Number(AID)>=-ConvolutionX.DotID){
                                                            if(ConvolutionX.DotArray[0]==undefined){
                                                                ConvolutionX.XSet();
                                                            }
                                                            ConvolutionX.DotArray[AID] = Number(Str);
                                                            ConvolutionX.GUI();
                                                            Terminal.TerminalText.push(Terminal.NowText);
                                                        }else{
                                                            Terminal.TerminalText.push("[Error28 存取範圍錯誤] " + Terminal.NowText);
                                                        }
                                                    }else{
                                                        Terminal.TerminalText.push("[Error22 參數錯誤] " + Terminal.NowText);
                                                    }
                                                }else{
                                                    Terminal.TerminalText.push("[Error24 未指派數值] " + Terminal.NowText);
                                                }
                                            }else{
                                                Terminal.TerminalText.push("[Error23 未指派運算子] " + Terminal.NowText);
                                            }
                                        }else{
                                            Terminal.TerminalText.push("[Error27 陣列語法錯誤] " + Terminal.NowText);
                                        }
                                    }else{
                                        Terminal.TerminalText.push("[Error26 未位指派操作陣列] " + Terminal.NowText);
                                    }
                                }else if(Str.search('H') == 0){
                                    Str = Str.slice(1,Terminal.NowText.length).trim();
                                    if(Str.search("<") == 0){
                                        Str = Str.slice(1,Terminal.NowText.length).trim();
                                        if(Str.search(">")!=-1){
                                            var AID= Number(Str.slice(0,Str.search(">")).trim());
                                            Str = Str.slice(Str.search(">")+1,Terminal.NowText.length).trim()
                                            if (Str.search("=") == 0){
                                                Str = Str.slice(1,Terminal.NowText.length).trim();
                                                if(Str!=""){
                                                    if(!isNaN(Number(Str))&&!isNaN(Number(AID))){
                                                        if(Number(AID)<=ConvolutionH.DotID && Number(AID)>=-ConvolutionH.DotID){
                                                            if(ConvolutionH.DotArray[0]==undefined){
                                                                ConvolutionH.HSet();
                                                            }
                                                            ConvolutionH.DotArray[AID] = Number(Str);
                                                            ConvolutionH.GUI();
                                                            Terminal.TerminalText.push(Terminal.NowText);
                                                        }else{
                                                            Terminal.TerminalText.push("[Error28 存取範圍錯誤] " + Terminal.NowText);
                                                        }
                                                    }else{
                                                        Terminal.TerminalText.push("[Error22 參數錯誤] " + Terminal.NowText);
                                                    }
                                                }else{
                                                    Terminal.TerminalText.push("[Error24 未指派數值] " + Terminal.NowText);
                                                }
                                            }else{
                                                Terminal.TerminalText.push("[Error23 未指派運算子] " + Terminal.NowText);
                                            }
                                        }else{
                                            Terminal.TerminalText.push("[Error27 陣列語法錯誤] " + Terminal.NowText);
                                        }
                                    }else{
                                        Terminal.TerminalText.push("[Error26 未位指派操作陣列] " + Terminal.NowText);
                                    }
                                }else if(Str.search("ALL") == 0){
                                   Str = Str.slice(3,Terminal.NowText.length).trim();
                                    if(Str.search("<") == 0){
                                        Str = Str.slice(1,Terminal.NowText.length).trim();
                                        if(Str.search(">")!=-1){
                                            var AID= Number(Str.slice(0,Str.search(">")).trim());
                                            Str = Str.slice(Str.search(">")+1,Terminal.NowText.length).trim()
                                            if (Str.search("=") == 0){
                                                Str = Str.slice(1,Terminal.NowText.length).trim();
                                                if(Str!=""){
                                                    if(!isNaN(Number(Str))&&!isNaN(Number(AID))){
                                                        if(Number(AID)<=ConvolutionX.DotID && Number(AID)>=-ConvolutionX.DotID && Number(AID)<=ConvolutionH.DotID && Number(AID)>=-ConvolutionH.DotID){
                                                            if(ConvolutionX.DotArray[0]==undefined){
                                                                ConvolutionX.XSet();
                                                            }
                                                            if(ConvolutionH.DotArray[0]==undefined){
                                                                ConvolutionH.HSet();
                                                            }
                                                            ConvolutionX.DotArray[AID] = Number(Str);
                                                            ConvolutionH.DotArray[AID] = Number(Str);
                                                            ConvolutionX.GUI();
                                                            ConvolutionH.GUI();
                                                            Terminal.TerminalText.push(Terminal.NowText);
                                                        }else{
                                                            Terminal.TerminalText.push("[Error28 存取範圍錯誤] " + Terminal.NowText);
                                                        }
                                                    }else{
                                                        Terminal.TerminalText.push("[Error22 參數錯誤] " + Terminal.NowText);
                                                    }
                                                }else{
                                                    Terminal.TerminalText.push("[Error24 未指派數值] " + Terminal.NowText);
                                                }
                                            }else{
                                                Terminal.TerminalText.push("[Error23 未指派運算子] " + Terminal.NowText);
                                            }
                                        }else{
                                            Terminal.TerminalText.push("[Error27 陣列語法錯誤] " + Terminal.NowText);
                                        }
                                    }else{
                                        Terminal.TerminalText.push("[Error26 未位指派操作陣列] " + Terminal.NowText);
                                    }
                                }else{
                                    Terminal.TerminalText.push("[Error22 參數錯誤] " + Terminal.NowText);
                                }

                        }else if(Str.search("OPEN")==0){
                            Str = Str.slice(Str.search("OPEN")+4,Terminal.NowText.length).trim();
                                if(Str.search("X") == 0 && Str.length==1) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionX.Show();
                                }else if(Str.search("H") == 0 && Str.length==1) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionH.Show();
                                }else if(Str.search("Y") == 0 && Str.length==1) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionY.Show();
                                }else if (Str.search("ALL") == 0 && Str.length==3) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionX.Show();
                                    ConvolutionH.Show();
                                    ConvolutionY.Show();
                                }else{
                                    Terminal.TerminalText.push("[Error22 參數錯誤] " + Terminal.NowText);
                                }
                        }else if(Str.search("CLOSE")==0){
                            Str = Str.slice(Str.search("CLOSE")+5,Terminal.NowText.length).trim();
                                if(Str.search("X") == 0 && Str.length==1) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionX.Hidden();
                                }else if(Str.search("H") == 0 && Str.length==1) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionH.Hidden();
                                }else if(Str.search("Y") == 0 && Str.length==1) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionY.Hidden();
                                }else if (Str.search("ALL") == 0 && Str.length==3) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionX.Hidden();
                                    ConvolutionH.Hidden();
                                    ConvolutionY.Hidden();
                                }else{
                                    Terminal.TerminalText.push("[Error22 參數錯誤] " + Terminal.NowText);
                                }

                        }else if(Str.search("RESET")==0){
                            Str = Str.slice(Str.search("RESET")+5,Terminal.NowText.length).trim();
                                if(Str.search("X") == 0 && Str.length==1) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionX.ColorX = "#86C166";
                                    ConvolutionX.DotID=5;
                                    ConvolutionX.XSet();
                                    ConvolutionX.GUI();
                                }else if(Str.search("H") == 0 && Str.length==1) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionH.ColorH = "#00AA90";
                                    ConvolutionH.DotID=5;
                                    ConvolutionH.HSet();
                                    ConvolutionH.GUI();
                                }else if (Str.search("Y") == 0 && Str.length==1) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionY.ColorY = "#555555";
                                    ConvolutionY.GUI();
                                }else if (Str.search("ALL") == 0 && Str.length==3) {
                                    Terminal.TerminalText.push(Terminal.NowText);
                                    ConvolutionX.ColorX = "#86C166";
                                    ConvolutionX.DotID=5;
                                    ConvolutionX.XSet();
                                    ConvolutionX.GUI();
                                    ConvolutionH.DotID=5;
                                    ConvolutionH.ColorH = "#00AA90";
                                    ConvolutionH.HSet();
                                    ConvolutionH.GUI();
                                    ConvolutionY.ColorY = "#555555";
                                    ConvolutionY.GUI();
                                }else{
                                    Terminal.TerminalText.push("[Error22 參數錯誤] " + Terminal.NowText);
                                }

                        }else if(Str.search("COLOR")==0){
                            Str = Str.slice(Str.search("COLOR")+5,Terminal.NowText.length).trim();
                                if(Str.search("X") == 0) {
                                    Str = Str.slice(1,Str.length).trim();
                                    if(Str.search("#") == 0 && Str.length==7 && Str.search("[G-Z]") == -1){
                                        Str = Str.slice(1,Str.length).trim();
                                        ConvolutionX.ColorX = Str;
                                        ConvolutionX.GUI();
                                        Terminal.TerminalText.push(Terminal.NowText);
                                    }else{
                                        Terminal.TerminalText.push("[Error30 色彩參數錯誤] " + Terminal.NowText);
                                    }
                                }else if(Str.search("H") == 0) {
                                    Str = Str.slice(1,Str.length).trim();
                                    if(Str.search("#") == 0 &&Str.length==7 && Str.search("[G-Z]") == -1){
                                        Str = Str.slice(1,Str.length).trim();
                                        ConvolutionH.ColorH = Str;
                                        ConvolutionH.GUI();
                                        Terminal.TerminalText.push(Terminal.NowText);
                                    }else{
                                        Terminal.TerminalText.push("[Error30 色彩參數錯誤] " + Terminal.NowText);
                                    }
                                }else if(Str.search("Y") == 0) {
                                    Str = Str.slice(1,Str.length).trim();
                                    if(Str.search("#") == 0 &&Str.length==7 && Str.search("[G-Z]") == -1){
                                        Str = Str.slice(1,Str.length).trim();
                                        ConvolutionY.ColorY = Str;
                                        ConvolutionY.GUI();
                                        Terminal.TerminalText.push(Terminal.NowText);
                                    }else{
                                        Terminal.TerminalText.push("[Error30 色彩參數錯誤] " + Terminal.NowText);
                                    }
                                }else if (Str.search("ALL") == 0) {
                                    Str = Str.slice(3,Str.length).trim();
                                    if(Str.search("#") == 0 &&Str.length==7){
                                        Str = Str.slice(1,Str.length).trim();
                                        ConvolutionX.ColorX = Str;
                                        ConvolutionX.GUI();
                                        ConvolutionH.ColorH = Str;
                                        ConvolutionH.GUI();
                                        ConvolutionY.ColorY = Str;
                                        ConvolutionY.GUI();
                                        Terminal.TerminalText.push(Terminal.NowText);
                                    }else{
                                        Terminal.TerminalText.push("[Error30 色彩參數錯誤] " + Terminal.NowText);
                                    }
                                }else{
                                    Terminal.TerminalText.push("[Error22 參數錯誤] " + Terminal.NowText);
                                }

                        }else if(Str.search("X")!=-1){
                            if(Str.trim().search("X") == 0 && Str.length==1) {
                                var ValueX = "ValueX: "
                                if(ConvolutionX.DotArray[0]==undefined){
                                    ConvolutionX.XSet();
                                }
                                for (let j = -ConvolutionX.DotID; j <= ConvolutionX.DotID; j++) {
                                    ValueX += ConvolutionX.DotArray[j];
                                    if(j!=ConvolutionX.DotID){
                                        ValueX += ","
                                    }
                                }
                                ValueX += " | From "+ (-ConvolutionX.DotID) +" ~ " + ConvolutionX.DotID ;
                                Terminal.TerminalText.push(Terminal.NowText);
                                Terminal.TerminalText.push(ValueX);
                                Terminal.TerminalCounter++;
                            }else{
                                Terminal.TerminalText.push("[Error21 錯誤指令] " + Terminal.NowText);
                            }
                        }else if(Str.search("H")!=-1){
                            if(Str.trim().search("H") == 0 && Str.length==1) {
                                var ValueH = "ValueH: "
                                if(ConvolutionH.DotArray[0]==undefined){
                                    ConvolutionH.HSet();
                                }
                                for (let j = -ConvolutionH.DotID; j <= ConvolutionH.DotID; j++) {
                                    ValueH += ConvolutionH.DotArray[j];
                                    if(j!=ConvolutionH.DotID){
                                        ValueH += ","
                                    }
                                }
                                ValueH += " | From "+ (-ConvolutionH.DotID) +" ~ " + ConvolutionH.DotID ;
                                Terminal.TerminalText.push(Terminal.NowText);
                                Terminal.TerminalText.push(ValueH);
                                Terminal.TerminalCounter++;
                            }else{
                                Terminal.TerminalText.push("[Error21 錯誤指令] " + Terminal.NowText);
                            }
                        }else if(Str.search("Y")!=-1){
                            if(Str.trim().search("Y") == 0 && Str.length==1) {
                                var ValueY = "ValueY: "
                                Terminal.TerminalText.push(Terminal.NowText);
                                if(ConvolutionY.DotArray[0]==undefined){
                                    Terminal.TerminalText.push("ValueY: [Error29 使用尚未被定義Y] ");
                                }else{
                                    for (let j = -ConvolutionY.DotID; j <= ConvolutionY.DotID; j++) {
                                        ValueY += ConvolutionY.DotArray[j];
                                        if(j!=ConvolutionY.DotID){
                                            ValueY += ","
                                        }
                                    }
                                    ValueY += " | From "+ (-ConvolutionY.DotID) +" ~ " + ConvolutionY.DotID ;
                                    Terminal.TerminalText.push(ValueY);
                                }
                                    Terminal.TerminalCounter++;
                            }else{
                                Terminal.TerminalText.push("[Error21 錯誤指令] " + Terminal.NowText);
                            }
                        }else if(Str.search("ALL")!=-1){
                            if(Str.trim().search("ALL") == 0 && Str.length==3) {
                                var ValueX = "ValueX: ";
                                var ValueH = "ValueH: ";
                                var ValueY = "ValueY: ";
                                if(ConvolutionX.DotArray[0]==undefined){
                                    ConvolutionX.XSet();
                                }
                                if(ConvolutionH.DotArray[0]==undefined){
                                    ConvolutionH.HSet();
                                }
                                for (let j = -ConvolutionX.DotID; j <= ConvolutionX.DotID; j++) {
                                    ValueX += ConvolutionX.DotArray[j];
                                    if(j!=ConvolutionX.DotID){
                                        ValueX += ",";
                                    }
                                }
                                ValueX += " | From "+ (-ConvolutionX.DotID) +" ~ " + ConvolutionX.DotID ;
                                
                                for (let j = -ConvolutionH.DotID; j <= ConvolutionH.DotID; j++) {
                                    ValueH += ConvolutionH.DotArray[j];
                                    if(j!=ConvolutionH.DotID){
                                        ValueH += ",";
                                    }
                                }
                                ValueH += " | From "+ (-ConvolutionH.DotID) +" ~ " + ConvolutionH.DotID ;

                                Terminal.TerminalText.push(Terminal.NowText);
                                Terminal.TerminalText.push(ValueX);
                                Terminal.TerminalText.push(ValueH);
                                if(ConvolutionY.DotArray[0]==undefined){
                                    Terminal.TerminalText.push("ValueY: [Error29 使用尚未被定義Y] ");
                                }else{
                                    for (let j = -ConvolutionY.DotID; j <= ConvolutionY.DotID; j++) {
                                        ValueY += ConvolutionY.DotArray[j];
                                        if(j!=ConvolutionY.DotID){
                                            ValueY += ",";
                                        }
                                    }
                                    ValueY += " | From "+ (-ConvolutionY.DotID) +" ~ " + ConvolutionY.DotID ;
                                    Terminal.TerminalText.push(ValueY);
                                }
                                Terminal.TerminalCounter+=3;
                            }else{
                                Terminal.TerminalText.push("[Error21 錯誤指令] " + Terminal.NowText);
                            }
                        }else if(Str.search("START")==0&&Str.length==5){
                            Terminal.TerminalText.push(Terminal.NowText);
                            ConvolutionY.Count();
                            ConvolutionY.GUI();
                            //SHOW
                        }else{
                            Terminal.TerminalText.push("[Error21 錯誤指令] " + Terminal.NowText);
                        }

                    }

                    if(Terminal.NowText.trim()[0]=='#'){
                        Terminal.TerminalText.push(Terminal.NowText);
                    }
                }else{
                    Terminal.TerminalText.push("[Error21 錯誤指令] " + Terminal.NowText);
                }

                while(Terminal.TerminalCounter>11){
                    Terminal.TerminalText.shift();
                    Terminal.TerminalCounter--;
                }
                
                Terminal.TerminalCounter++;
                Terminal.NowText = " >";
            }
        },
        /*將其輸出為檔案*/
        OutPutFile:function OutPutFile() {
            var NowDate = new Date();
            var NowTime = "" + NowDate.getFullYear() + '-' + (NowDate.getMonth()+1) + '-' + NowDate.getDate() + '-' + NowDate.getHours() + '-' + NowDate.getMinutes() + '-' + NowDate.getSeconds();
            var MainValueX = "";
            var MainValueH = "";
            
            if(ConvolutionX.DotArray[0]==undefined){
                ConvolutionX.XSet();
            }

            if(ConvolutionH.DotArray[0]==undefined){
                ConvolutionH.HSet();
            }

            for (let s = -ConvolutionX.DotID; s <= ConvolutionX.DotID; s++) {
                MainValueX += "" + ConvolutionX.DotArray[s];
                if(s!=ConvolutionX.DotID){
                    MainValueX +=",";
                }
            }

            for (let t = -ConvolutionH.DotID; t <= ConvolutionH.DotID; t++) {
                MainValueH += "" + ConvolutionH.DotArray[t];
                if(t!=ConvolutionH.DotID){
                    MainValueH +=",";
                } 
            }

            fs.writeFile(__dirname + '/../../file/' + NowTime + '.sscm', 
                "@ProjectName: " + NowTime + ".sscm" + "\r\n" +
                "@Who: CM" + "\r\n" +
                "@MakeTime: " +  NowDate.getFullYear() + "-" + (NowDate.getMonth()+1) + "-" + NowDate.getDate() + "\r\n" +
                "@UpdateTime: " + NowDate.getFullYear() + "-" + (NowDate.getMonth()+1) + "-" + NowDate.getDate()  + "\r\n" +
                "\r\n" +
                "** 程式主體 **" + "\r\n" +
                "\r\n" +
                "#InX: " + ConvolutionX.DotID + "\r\n" +
                "#InH: " + ConvolutionH.DotID + "\r\n" +
                "ValueX: " + MainValueX + "\r\n" + "\r\n" +
                "ValueH: " + MainValueH + "\r\n" 
            , (error) => {
                if (error) throw error;
            });

            alert("已輸出結束");
        }
    },
});

/*  
 *
 * |------------------------------------------------------------------------
 * | [JS] [Vue] X的資料與圖表操作
 * |------------------------------------------------------------------------
 * | Name    :  ConvolutionX
 * | About   :  X的資料與圖表操作
 * | UpDate  :  2018.04.14
 * | Writer  :  Lian0123
 *
 */ 
var ConvolutionX = new Vue({
    el:"#ConvolutionX",
    data:{
        SumDot    : 11         , //開始的初始值(為abs(MaxDotID)+abs(MinDotID)+1)
        DotID     : 5          , //至少要-5~+5
        SelectDot : 0          , //紀錄目前游標移動到的ID
        DotArray  : []         , //各點上存的值
        ColorX    : "#86C166"  , //X的色彩
    },
    methods:{
        /*初始化X陣列的內容空間*/
        XSet : function XSet()  { 
            this.DotArray = [];
            for (let i = -this.DotID; i <= this.DotID; i++) {
                this.DotArray[i] = 0;
            }
        },
        /*隱藏ConvolutionX的內容*/
        Hidden: function Hidden() {
            $("#ConvolutionX").hide();
        },
        /*顯示ConvolutionX的內容*/
        Show: function Show() {
            $("#ConvolutionX").show();
        },
        /*建立ConvolutionX的GUI*/
        GUI:function GUI() {
            var test = false;
            var OutDotX = ["x"];
            var OutDotY = ["X"];
            for(var m = -ConvolutionX.DotID;m<=ConvolutionX.DotID;m++){
                        OutDotX.push(m);
                        OutDotY.push(ConvolutionX.DotArray[m]);
            }
            test=true;
            if(test){
                test =false;
                /* c3.js設定 */
                var chartX = c3.generate({
                    bindto: "#C3ViewX",
                    data: {
                        x: 'x',
                        colors:{
                            X:ConvolutionX.ColorX
                        },
                        columns: [
                            OutDotX,
                            OutDotY
                        ],
                        type: 'bar'
                    },
                    bar: {
                        width: {
                            ratio: 0.5
                        }
                    },
                    axis:{
                        x: {
                            tick: {
                                format: '%d',
                            }
                        }
                    }
                });

            }
        },
    },
});

/*  
 *
 * |------------------------------------------------------------------------
 * | [JS] [Vue] H的資料與圖表操作
 * |------------------------------------------------------------------------
 * | Name    :  ConvolutionH
 * | About   :  H的資料與圖表操作
 * | UpDate  :  2018.04.14
 * | Writer  :  Lian0123
 *
 */ 
var ConvolutionH = new Vue({
    el:"#ConvolutionH",
    data:{
        SumDot    : 11         , //開始的初始值(為abs(MaxDotID)+abs(MinDotID)+1)
        DotID     : 5          , //至少要-5~+5
        SelectDot : 0          , //紀錄目前游標移動到的ID
        DotArray  : []         , //各點上存的值
        ColorH    : "#00AA90"  , //H的色彩
    },
    methods:{
        /*初始化H陣列的內容空間*/
        HSet : function HSet()  { 
            this.DotArray = [];
            for (let i = -this.DotID; i <= this.DotID; i++) {
                this.DotArray[i] = 0;
            }
        },
        /*隱藏ConvolutionH的內容*/
        Hidden: function Hidden() {
            $("#ConvolutionH").hide();
        },
        /*顯示ConvolutionH的內容*/
        Show: function Show() {
            $("#ConvolutionH").show();
        },
        /*建立ConvolutionH的GUI*/
        GUI:function GUI() {
            var test = false;
            var OutDotX = ["x"];
            var OutDotY = ["H"];
            for(var m = -ConvolutionH.DotID;m<=ConvolutionH.DotID;m++){
                        OutDotX.push(m);
                        OutDotY.push(ConvolutionH.DotArray[m]);
            }
            test=true;
            if(test){
                test =false;
                /* c3.js設定 */
                var chartH = c3.generate({
                    bindto: "#C3ViewH",
                    data: {
                        x: 'x',
                        colors:{
                            H:ConvolutionH.ColorH
                        },
                        columns: [
                            OutDotX,
                            OutDotY
                        ],
                        type: 'bar'
                    },
                    bar: {
                        width: {
                            ratio: 0.5
                        }
                    },
                    axis:{
                        x: {
                            tick: {
                                format: '%d',
                            }
                        }
                    }
                });

            }
        },
    }
});

/*  
 *
 * |------------------------------------------------------------------------
 * | [JS] [Vue] Y的資料與圖表操作
 * |------------------------------------------------------------------------
 * | Name    :  ConvolutionY
 * | About   :  Y的資料與圖表操作
 * | UpDate  :  2018.04.14
 * | Writer  :  Lian0123
 *
 */ 
var ConvolutionY = new Vue({
    el:"#ConvolutionY",
    data:{
        SumDot    : 21         , //開始的初始值(為abs(MaxDotID)+abs(MinDotID)+1)
        DotID     : 10         , //至少要-10~+10
        SelectDot : 0          , //紀錄目前游標移動到的ID
        ColorY    : "#555555"  , //Y的色彩
        DotArray  : []         , //各點上存的值
    },
    methods:{
        /*隱藏ConvolutionY的內容*/
        Hidden: function Hidden() {
            $("#ConvolutionY").hide();
        },
        /*顯示ConvolutionY的內容*/
        Show: function Show() {
            $("#ConvolutionY").show();
        },
        /*計算Y的結果*/
        Count:function Count(ID) { 
            ConvolutionY.DotArray = [];
            ConvolutionY.DotID=ConvolutionX.DotID+ConvolutionH.DotID+1;
            for (let i = -ConvolutionY.DotID; i <= ConvolutionY.DotID; i++) {
                ConvolutionY.DotArray[i] = 0;
            }

            for(let n=-ConvolutionY.DotID;n<=ConvolutionY.DotID;n++){
                for(let k=-ConvolutionY.DotID;k<=ConvolutionY.DotID;k++){
                    if(!isNaN(ConvolutionH.DotArray[n-k])&&!isNaN(ConvolutionX.DotArray[k]))
                        ConvolutionY.DotArray[n]+=ConvolutionX.DotArray[k] * ConvolutionH.DotArray[n-k];
                }
            }
        },
        /*建立ConvolutionY的GUI*/
        GUI:function GUI() {
            var test = false;
            var OutDotX = ["x"];
            var OutDotY = ["Y"];
            for(var m = -ConvolutionY.DotID;m<=ConvolutionY.DotID;m++){
                        OutDotX.push(m);
                        OutDotY.push(ConvolutionY.DotArray[m]);
            }
            test=true;
            if(test){
                test =false;
                /* c3.js設定 */
                var chartY = c3.generate({
                    bindto: "#C3ViewY",
                    data: {
                        x: 'x',
                        colors:{
                            Y:ConvolutionY.ColorY
                        },
                        columns: [
                            OutDotX,
                            OutDotY
                        ],
                        type: 'bar'
                    },
                    bar: {
                        width: {
                            ratio: 0.5
                        }
                    },
                    axis:{
                        x: {
                            tick: {
                                format: '%d',
                            }
                        }
                    }
                });

            }
        },
        GStart:function GStart() {
           ConvolutionY.Count();
           ConvolutionY.GUI();
        },
    },
});

/*  
 *
 * |------------------------------------------------------------------------
 * | [JS] [Vue] 說明內容的顯示
 * |------------------------------------------------------------------------
 * | ModelName   :  BlockList
 * | About       :  說明內容的顯示（移植於AM）
 * | UpDate      :  2018.02.19
 * | Writer      :  Lian0123
 * 
 */
var TextBoxView = new Vue({
    el: '#TextBoxView',
    methods:{
        TextBoxViewClose: function TextBoxViewClose() {
             $("#TextBoxView").hide();
        }
    }
})
