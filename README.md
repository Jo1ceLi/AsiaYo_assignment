目前有一份 MySQL 資料庫,其中的資料表的 ERD 如下圖
bnbs: 旅宿
- id 旅宿 ID
- name 旅宿名稱
rooms: 房間
- id 房間 ID
- bnb_id 旅宿 ID
- name 房間名稱
orders: 訂單
- id 訂單 ID
- bnb_id 旅宿 ID
- room_id 房間 ID
- currency 付款幣別,值為:TWD (台幣) , USD (美金) , JPY (日圓)
- amouont 訂單金額
- check_in_date 入住日
- check_out_date 退房日
- created_at 訂單下訂時間

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

常理推斷bnb與order每月的數量級，會差距到2~3個數量級，1間bnb可能一個月會有100~9999筆訂單，因此推論bnb不太會是效能瓶頸。
order的數量級會是bnb的100倍以上，因此order可能才會是瓶頸所在。
在實際的排查效能瓶頸時，還是會以`EXPLAIN`來判斷效能瓶頸所在。

- 假定order是效能瓶頸，會怎麼優化
1. 將order的`created_at`建立索引。
2. partition order table，將訂單資料依年以及月份分區存放。

- 非SQL的優化方式
1. 加入cache層，減少DB的負擔。

----------