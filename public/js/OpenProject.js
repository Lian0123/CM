/*  
 *
 * |------------------------------------------------------------------------
 * | [Vue] 載入檔案模式的Vue.js程式碼
 * |------------------------------------------------------------------------
 * | Name    :  LoadDataView
 * | About   :  載入檔案模式的Vue.js程式碼（包含jQuery與c3.js）
 * | UpDate  :  2018.04.05
 * | Writer  :  Lian0123
 * 
 */

var LoadDataView = new Vue({
    el: "#LoadDataView"  ,
    data:{
        ProjectName : "[檔案未開啟]" , //專案名稱
        Who         : "[檔案未開啟]" , //製作的人
        MakeTime    : "[檔案未開啟]" , //專案生成時間
        UpdateTime  : "[檔案未開啟]" , //專案更新時間
        InX         : 5            , //X的值域
        InH         : 5            , //H的值域
        DotArrayX   : []           , //X各點的數值
        DotArrayH   : []           , //H各點的數值
        OutY        : 10           , //Y的值域
        DotArrayY   : []           , //Y各點的數值
        DotArraytmp : []           , //tmp各點
        IsComput    : false        , //是否能被計算
    },
    methods:{
        /* [CM載入檔案模式專用]初始化方程 */
        InitEvent:function InitEvent() {
            LoadDataView.ProjectName = "[檔案未開啟]";
            LoadDataView.Who = "[檔案未開啟]";
            LoadDataView.MakeTime = "[檔案未開啟]";
            LoadDataView.UpdateTime = "[檔案未開啟]";
            LoadDataView.InX = 5;
            LoadDataView.InH = 5;
            LoadDataView.DotArrayX = [];
            LoadDataView.DotArrayH = [];
            LoadDataView.OutY = 10;
            LoadDataView.DotArrayY = [];
            LoadDataView.DotArraytmp = [];
            LoadDataView.IsComput = false;
        },
        /* [CM載入檔案模式專用]讀檔方程 */
        ReadFile: function CMReadFile() {
            LoadDataView.InitEvent();
            var FilePath ;
            try{
                FilePath = $('#FileIn').prop('files')[0].path;
            }catch(error){
                FilePath = __dirname + "/../../file/tmp.sscm";
            }
            fs.readFile(FilePath, function (error, data) {
                if (error) throw error;
                var str = data.toString();
                ProjectNameID=str.search("@ProjectName:");
                if(str.search("@ProjectName:")==-1||str.search("@MakeTime:")==-1||str.search("@Who:")==-1||str.search("@UpdateTime:")==-1||str.search("#InX:")==-1||str.search("#InH:")==-1){
                    alert("檔案格式錯誤！","Error:11");
                    LoadDataView.InitEvent();
                }else{
                    LoadDataView.ProjectName = str.slice(str.search("@ProjectName:")+13,str.search("\r\n")).trim();
                    str = str.slice(str.search("\r\n")+1,str.length);
                    LoadDataView.Who = str.slice(str.search("@Who:")+5,str.search("\r\n")).trim();
                    str = str.slice(str.search("\r\n")+1,str.length);
                    LoadDataView.MakeTime = str.slice(str.search("@MakeTime:")+10,str.search("\r\n")).trim();
                    str = str.slice(str.search("\r\n")+1,str.length);
                    LoadDataView.UpdateTime = str.slice(str.search("@UpdateTime:")+12,str.search("\r\n")).trim();
                    str = str.slice(str.search("#InX:"),str.length);
                    LoadDataView.InX = Number(str.slice(str.search("#InX:")+5,str.search("\r\n")).trim());                    
                    str = str.slice(str.search("#InH:"),str.length);
                    LoadDataView.InH = Number(str.slice(str.search("#InH:")+5,str.search("\r\n")).trim());
                    str = str.slice(str.search("ValueX:")+7,str.length);
                    LoadDataView.OutY= LoadDataView.InH+LoadDataView.InX;
                    if(LoadDataView.InX<5||LoadDataView.InH<5){
                         alert("數值下限設定錯誤！\n請確認輸入數值需大於5","Error:12");
                         LoadDataView.InitEvent();
                    }else{
                        for (let i = -LoadDataView.InX; i < LoadDataView.InX; i++) {
                            LoadDataView.DotArrayX[i] = parseInt(str.slice(0,str.search(",")).trim());
                            str = str.slice(str.search(",")+1,str.length);
                            if(isNaN(LoadDataView.DotArrayX[i])){
                                alert("數值列的值設定錯誤！\n請確認輸入格式","Error:13");
                                LoadDataView.InitEvent();
                            }
                        }
                        LoadDataView.DotArrayX[LoadDataView.InX] = Number(str.slice(0,str.search("\r\n")).trim());
                        str = str.slice(str.search("ValueH:")+7,str.length);

                        for (let j = -LoadDataView.InH; j < LoadDataView.InH; j++) {
                            LoadDataView.DotArrayH[j] = parseInt(str.slice(0,str.search(",")).trim());
                            str = str.slice(str.search(",")+1,str.length);
                            if(isNaN(LoadDataView.DotArrayH[j])){
                                alert("數值列的值設定錯誤！\n請確認輸入格式","Error:13");
                                LoadDataView.InitEvent();
                            }
                        }
                        LoadDataView.DotArrayH[LoadDataView.InH] = Number(str.slice(0,str.search("\r\n")).trim());
                        
                    }
                }
                LoadDataView.IsComput = true;
            });
        },
        /* [CM載入檔案模式專用]寫檔方程(初始化) */
        CMInitWriteTmp: function CMInitWriteTmp(ProjectName,Who,MakeTime) {
            var NowDate = new Date();
            fs.writeFile(__dirname+'/../../file/tmp.sscm', 
                "@ProjectName: " + ProjectName + "\r\n" +
                "@Who: " + Who + "\r\n" +
                "@MakeTime: " + MakeTime + "\r\n" +
                "@UpdateTime: " + NowDate.getFullYear() + "-" + (NowDate.getMonth()+1) + "-" + NowDate.getDate()  + "\r\n" +
                "\r\n" +
                "** 程式主體 **" + "\r\n" +
                "\r\n" 
            , (error) => {
                if (error) throw error;
            });
        },
        /* [CM載入檔案模式專用]計算與輸出結果方程 */
        Count: function Count(){
            var OutDotX = ["x"];
            var OutDotY = ["Y"];
            for (let l = -LoadDataView.OutY; l <= LoadDataView.OutY; l++) {
                LoadDataView.DotArrayY[l] = 0;
            }
            if(LoadDataView.IsComput==true){
                for(var n = -LoadDataView.OutY;n<=LoadDataView.OutY;n++)
                    for(var k = -LoadDataView.OutY;k<=LoadDataView.OutY;k++)
                        if(!isNaN(LoadDataView.DotArrayH[n-k])&&!isNaN(LoadDataView.DotArrayX[k])){
                            LoadDataView.DotArrayY[n]+=LoadDataView.DotArrayX[k] * LoadDataView.DotArrayH[n-k];
                        }

                for(var m = -LoadDataView.OutY;m<=LoadDataView.OutY;m++){
                        OutDotX.push(m);
                        OutDotY.push(LoadDataView.DotArrayY[m]);
                }

                /* c3.js設定 */
                var chart = c3.generate({
                    bindto: "#C3View",
                    data: {
                        x: 'x',
                        colors:{
                            Y:"#555555"
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
            }else{
                alert("執行錯誤！未選擇加載檔案","Error:14");
            }
        }
    }
})




/* 舊方程 */

function CMWriteTmp(Who,InDataX,InDataY,OutData) {
    fs.writeFile(__dirname+'/../../file/tmp.sscm',{flag: "a"}, (err) => {
        if (err) throw err;
    });
}

function CMClearTmpFile(FileName) {
    fs.writeFile(__dirname+'/../../file/'+FileName,{flag: "a"}, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}
