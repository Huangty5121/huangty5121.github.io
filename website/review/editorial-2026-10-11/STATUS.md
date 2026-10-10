# 本輪未採用；已恢復改動前版本

使用者回饋：整體互動及排版比之前更差，全部不如之前。此輪不作為完成交付。

已從開工前獨立備份恢復 website/site.css、site.mjs、views.mjs、build.mjs，並重新生成網站。四個檔案 SHA-256 均與開工前備份一致；about-content.mjs、experience-view.mjs 在本輪未更改。沒有 Git reset，沒有撤回先前既有未提交工作，沒有推送或發布。

本輪試作來源與新產生的識別／預覽素材收在 rejected-source，未接入目前網站。此資料夾根目錄中的 matrix、accessibility、interactions 和畫面屬於被否決的試作，不能當作現行版本的完成證據；matrix 已中止，沒有跑完全套。恢復後檢查另見 restored-static.json 和 restored/。

確認的實作問題：最初 About 圖文欄位因選擇器覆寫而壓窄；Experience 日期繼承原 grid 定位造成碰撞。即使修正這些局部問題，整體構圖仍未獲使用者接受，因此撤回整輪，而不是以自動測試通過判定設計成功。

後續應從恢復版本開始，先用完整真實內容檢查一個頁面的靜態與展開狀態，形成可比較的具體畫面；不得把本次試作當作新基礎繼續加補丁。
