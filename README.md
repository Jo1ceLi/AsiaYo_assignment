# 資料庫測驗

題目一
請寫出一條查詢語句 (SQL),列出在 2023 年 5 月下訂的訂單,使用台幣付款且5月總金額最
多的前 10 筆的旅宿 ID (bnb_id), 旅宿名稱 (bnb_name), 5 月總金額 (may_amount)

作答:
```sql
SELECT 
    b.id AS bnb_id,
    b.name AS bnb_name,
    SUM(o.amouont) AS may_amount
FROM 
    bnbs b
JOIN 
    orders o ON b.id = o.bnb_id
WHERE 
    o.created_at >= '2023-05-01' 
    AND o.created_at < '2023-06-01'
    AND o.currency = 'TWD'
GROUP BY 
    b.id, b.name
ORDER BY 
    may_amount DESC
LIMIT 10;
```

題目二
在題目一的執行下,我們發現 SQL 執行速度很慢,您會怎麼去優化?請闡述您怎麼判斷與優化的方式

作答:
- 判斷效能瓶頸所在

常理推斷bnb與order每月的數量級，會差距到2-3個數量級，1間bnb可能一個月會有100-9999筆訂單，因此推論bnb不太會是效能瓶頸。
order的數量級會是bnb的100倍以上，因此order可能才會是瓶頸所在。
在實際的排查效能瓶頸時，還是會以`EXPLAIN`來判斷效能瓶頸所在。

### 假定order是效能瓶頸，會怎麼優化

- 有實作經驗且有效的方法:
1. 將order的`created_at`建立索引。
2. partition order table，將訂單資料依年以及月份分區存放。
3. 在結算日執行排程將週期內的資料進行統計，將統計資料另存一張表，繞過巨大的資料表，直接查詢該統計表。

- 有研究過但沒有實作經驗的方法:
1. database sharding (將資料庫進行分片能提升擴展性，缺點是join 及 transaction會較複雜->會牽涉到2 phase commit)
2. 資料庫讀寫分離 (能提升read-heavy應用程式的效率，Trade off是會降低對於寫入資料庫的效能)

- 其他非SQL的優化方式
1. 加入應用層的caching (redis)，減少DB的負擔
2. 加入Http caching (ETag)
3. 水平、垂直擴展資料庫硬體

----------

# API 實作測驗

規格模糊的部分:
- 因題目中給的範例沒有提供哪些屬性是必填，採取所有屬性都是必填，且額外多出的屬性，將不會被額外處理及報錯的方式。

題目需求: 
- 此應用程式將有一支 endpoint 為 POST /api/orders 的 API 作為輸入點
    - `src/orders/orders.controller.ts` 作為API輸入點
- [ ] SOLID
- 此 API 需按照以下心智圖之所有情境,處理訂單檢查格式與轉換的功能。
    - 檢查必要欄位及指定型態: `src/orders/dto/validators/` (檢查 必填、字串、貨幣、名字、價錢)
    - 將訂單送到service做訂單格式檢查與轉換: 因上一步驟已經完成檢查，因此這步驟只負責轉換，也比較符合單一責任原則，於`src/orders/orders.service.ts`做轉換
    - 返回檢查與轉換結果: controller -> service 通過後，會在返回controller做response的回傳

- 以下所有情境皆需附上單元測試,覆蓋成功與失敗之案例。

1. 測試指令 `docker compose up`

2. 測試檔案

![image](https://github.com/user-attachments/assets/ba8a11fd-2483-42b4-b570-b5f43b743452)

3. 測試結果截圖

![image](https://github.com/user-attachments/assets/4c5256f4-70ea-44a0-a838-bd9cfe03d9b9)


- 請使用 docker 包裝您的環境。
```
docker build -t asiayo_jo1ce_assignment .
docker run -p 3000:3000 -d asiayo_jo1ce_assignment
```
