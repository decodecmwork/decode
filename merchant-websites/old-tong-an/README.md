# 老同安小酒館｜DECODE 提案展示版

- 專案路徑：merchant-websites/old-tong-an/
- 網址（待 gh-pages 成功部署）：https://decode.com.tw/merchant-websites/old-tong-an/
- 版本：非官方商家提案展示／未經業主授權
- 發佈來源：decodecmwork/decode 的 gh-pages（與 main 分支不同）

## 已製作
1. 首頁照片襯底、Logo 檔位、雙 CTA、RWD 導覽
2. 餐單四分類互動：經典料理／分享小食／精釀啤酒／調酒飲品
3. 空間照片展示
4. 訂位互動展示（姓名、電話、用餐日期、時間、人數、IG 選填、備註）
5. 原 Google 表單連結：https://forms.gle/7pKk9TFPiC8AStS18
6. 表單不傳送資料、不寫入真實訂位，完成時明示未建立訂位

## P0：尚未完成，不可對外宣稱已正式交付

### 使用者提供的 Logo 與照片尚未匯入
聊天內嵌照片無法直接取得可寫入 GitHub 的原始圖片檔。待用可下載的獨立檔或 ZIP 匯入，指定如下：

- assets/logo.png：原店家 Logo
- assets/hero.jpg：首屏背景實景照
- assets/scene-01.jpg：關於段落照片
- assets/scene-02.jpg：實景圖集照片 1
- assets/scene-03.jpg：實景圖集照片 2
- assets/scene-04.jpg：實景圖集照片 3
- assets/menu-classic.jpg：經典料理照片／菜單
- assets/menu-bites.jpg：分享小食照片／菜單
- assets/menu-beer.jpg：精釀啤酒照片／酒單
- assets/menu-cocktail.jpg：調酒照片／酒單

首頁圖在沒有 assets/hero.jpg 時，暫以公開 Gomaji 老同安照片為遠端 Demo 備援，並非取得正式圖片使用授權。正式版須替換成店家授權圖片。其他圖片缺少時會顯示漸層排版，非已上傳原圖。

### Google Form 尚未完成原表單核對
目前僅確認公開訂位短網址；未取得原 Google Form 所有題目、必填、選項、分支及說明文字，因此此頁面為一般預約 UX 的展示示意。必須取得完整表單截圖，建立 Form Parity Matrix，逐題比對後才能將示意欄位做為真實前後端系統。

### 待店家確認
Logo／照片／菜單授權、時段、座位容量、低消、取消規定、個資告知、對外正式發布同意。

## 已核實商家資料（2026-11-15）
| 項目 | 內容 | 驗證狀態 |
| --- | --- | --- |
| 名稱 | 老同安小酒館 | Google 商家／FunNow |
| 地址 | 台北市中正區同安街24號 | Google 商家／FunNow |
| 電話 | 0928-914-341 | Google 商家／公開報導 |
| Instagram | https://www.instagram.com/oldt.a.beerbar/ | 使用者直接提供 |
| Facebook | https://www.facebook.com/OldT.A.BeerBar/ | 公開報導 |
| 訂位 Google Form | https://forms.gle/7pKk9TFPiC8AStS18 | 公開 FB 搜尋結果，題目待核對 |
| 營業時間 | 週日至週四 18:00–00:30、週五六 18:00–02:30 | 公開資料，以店家實際公告為準 |
| 主要品項 | 牛肉麵、東坡肉飯、炸物、披薩、精釀與調酒 | 公開資料，非正式完整菜單 |

資料來源：
- https://www.myfunnow.com/zh-tw/branches/3050882431428
- https://www.gomaji.com/store/145574/pid/241420
- https://www.juksy.com/article/96317

## 驗收注意
GitHub commit 不等於網站成功上線。確認 GitHub Actions 頁面部署成功，實際網址可開啟，檢查手機導覽、菜單切換、連結正確與 Demo 不收單。正式成交後須建立新的客戶資產和獨立的正式訂位管理系統。
