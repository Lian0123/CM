## Project介紹：
 本專案名為Convolution Machine，即蜷曲運算機器，用於數學類上的運算的程式，預設執行於Ubuntu平台上。
 預設啟動指令 ./start.sh

## 版本差異：
 本專案為完整版專案，但已打包好的zip檔是屬於精簡版（無輸出成專有格式的功能）
 已打包好的zip檔不算是MIT LICENSES所包含的範圍
 
## Windows X64精簡版zip：
 https://goo.gl/q7gy4m
 
## Ubuntu X64精簡版zip：
 https://goo.gl/YMEA1v

## 操作模式：
 #### [方法1]直接操作
    使用手動輸入X與H資料的方式，執行運算得到Y的值

 #### [方法2]從檔案匯入
    以正常的sscm檔載入獲得X與H，進行Y的運算並進行輸出

 #### [方法3]從紀錄獲取
    讀取執行過的結果，並將輸入（表格）與結果顯示。

## 錯誤代碼：

  Error11:
    ※輸入檔案格式錯誤。

    請檢查檔案格式是否符合範例文件所敘述之"@ProjectName:"、"@Who:"、"@MakeTime:"、"@UpdateTime:"、"#InX:"、"#InH:"、"ValueX:"、"ValueH:"等保留字，請檢查保留字是否有被濫用或缺少之情形。

  Error12:
    ※數值下限錯誤。
    
    任意資料需大於等於-5~+5的區間，發生此錯誤可能是因為您在"#InX"或"#InH"設定的值未大於-5~+5的區間。
    
  Error13:
    ※數值列設定錯誤。
    
    請檢查您的"ValueX"、"ValueH"的數值列表是否有遺漏或是錯誤。而多餘數值，則會被視為為未定義執行結果。

  Error14:
    ※執行錯誤，未選擇加載檔案。
    
    請檢查您是否選擇了正確檔案後，才按下"執行專案"。
  
  Error21:
    ※錯誤指令

    可能是您輸入了錯誤的指令所造成，建議先查看操作指令列表，再進行操作。

  Error22:
    ※參數錯誤

    可能是您未指派操作參數而造成的，請檢查您的指令是否了忽略目標參數。

  Error23:
    ※未指派運算子

    可能是您在使用的指令是屬於需要委派參數類的指令，您可能忽略其需要"="運算子做委派。

  Error24:
    ※未指派數值

    可能是您在使用的指令是屬於需要委派參數類的指令，但您可能在使用"="做委派時忽略其委派的值。

  Error25:
    ※賦予值的語意錯誤

    可能是您在使用的指令包含賦予值是數值參數，但您可能在使用時弄錯其參數型別。

  Error26:
    ※未位指派操作陣列

    可能是您在使用的指令是屬於對陣列中的指令，但您可能在使用時忽略了對陣列的操作。

  Error27:
    ※陣列語法錯誤

    可能是您在使用的指令是屬於對陣列中的指令，但您的陣列卻不匹配，而造成此語法錯誤。

  Error28:
    ※存取範圍錯誤

    可能是您在使用的指令是屬於對陣列中的指令，但您的陣列索引值參數範圍超越設定的範圍空間限制，請查閱或更新空間範圍。

  Error29:
    ※使用尚未被定義Y

    Y為計算後的結果，您可能在其被執行運算前做呼叫，請在"Start"運算完成後，再進行呼叫Y。

  Error30:
    ※色彩參數錯誤

    可能是您在設定色彩時，超越色彩的表示範圍，色彩的表示範圍僅限至於#000000～#FFFFFF，且需滿足七的字的大小。

## 手動輸入操作手冊：
    > Set X = 5
      使X的範圍為 -5 ~ +5 
      參數不可小於5
      設定後，將會內容會初始化為0

    > Set H = 5
      使H的範圍為 -5 ~ +5
      參數不可小於5
      設定後，將會內容會初始化為0

    > Let X<-1> = 2
      使X[-1]陣列的值設為 2
      再未輸入下，預設是0

    > Let H<0> = -4
      使H[0]陣列的值設為 -4
      再未輸入下，預設是0

    > Open X
      打開X參數的圖形檢視圖表畫面

    > Open H
      打開H參數的圖形檢視圖表畫面

    > Open Y
      打開Y參數的圖形檢視圖表畫面

    > Open All
      打開參數的圖形檢視圖表畫面

    > Close X
      關閉X參數的圖形檢視圖表畫面

    > Close H
      關閉H參數的圖形檢視圖表畫面

    > Close Y
      關閉Y參數的圖形檢視圖表畫面

    > Reset All
      關閉所有參數的圖形檢視圖表畫面

    > Reset X
      將把X參數的內容全部初始化為0
      色彩也會重置為預設值

    > Reset H
      將把H參數的內容全部初始化為0
      色彩也會重置為預設值

    > Reset Y
      將把Y參數的內容全部初始化為0
      色彩也會重置為預設值

    > Reset All
      將把所有參數的內容全部初始化為0
      色彩也會重置為預設值

    > help
      顯示提示

    > clear
      清空終端畫面

    > X
      顯示X參數的所有內容（CLI模式）

    > H
      顯示H參數的所有內容（CLI模式）

    > Y
      顯示Y參數的所有內容（CLI模式）

    > All
      顯示所有參數的所有內容（CLI模式）

    > Color X #ffffff
      設定X圖表的色彩

    > Color H #ffffff
      設定X圖表的色彩

    > Color Y #ffffff
      設定X圖表的色彩

    > Color ALL #ffffff
      設定所有圖表的色彩

    # 這是註解
      輸入註解至終端的語法

####  ※注[1]：大小寫無區分
####  ※注[2]：ALL定義為該指令下的所有可能目標物件


## Project架構一覽：
#### CM
#### |
#### ├─ NewFile··:··新建立檔案的界面
#### |··············|
#### |··············├ 輸入模式····:··以指令輸入
#### |··············|
#### |··············├ 匯出結果····:··將執行結果匯出（文字模式、c3.js圖像模式）
#### |··············|
#### |··············├ 輸出檔案····:··將目前的配置以檔案輸出，位置為" ./file/輸出時間.sscm"
#### |··············|
#### |··············└ 回上一頁····:··回到首頁
#### |
#### ├─ LoadFile :  載入檔案用的界面
#### |··············|
#### |··············├ 選擇檔案····:··選擇輸入的檔案
#### |··············|
#### |··············├ 匯出結果····:··將執行結果匯出（c3.js圖像模式）
#### |··············|
#### |··············└ 回上一頁····:··回到首頁
#### |
#### |
#### └─ About : 專案相關，連到本專案開發者的GitHub


