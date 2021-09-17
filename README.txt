Open Terminal
    $ npm start

Timestamp : http://localhost:3500/timestamp
Logs : http://localhost:3500/logs
    => Submit Data
Logs?limit=<N>  Ex : http://localhost:3500/logs?limit=3

Sometimes, express has error "throw er; // Unhandled 'error' event" 
Fix : change port(main.js:5) 

Fix Part 1 : 

- Không nên commit thư mục node_modules                                     : Em ko hiểu cái này nghĩa là gì ạ
- Nên khởi chạy server bằng npm start                                       : Done
- Indentation cần phải thống nhất hơn                                       : Done 
- Timestamp phải là timestamp lúc truy vấn, không phải timestamp cố định    : Done
- Đặt tên hàm/biến chuẩn hơn (employee -> log)                              : Done
- Với truy vấn có limit=N thì cần trả về N log gần nhất (gợi ý: slice(-N))  : Done 
