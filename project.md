# 人工智慧期末大作業
## 主題
* 貪婪演算法（Greedy algorithm） vs. 動態規劃演算法（Dynamic Programming）
    * 藉由找零錢問題來比較以上兩種方法哪一個比較好

## 演算法介紹
### 貪婪演算法
* 貪婪演算法（Greedy algorithm）是指在對問題求解時，總是做出在當前看來是最好的選擇。也就是說，**不從整體上最優加以考慮，他所做出的僅是在某種意義上的局部上最優的解**。貪婪演算法不是對所有問題都能得到整體最優解，但對範圍相當廣泛的許多問題他能產生整體最優解或者是整體最優解的近似解。
    * 例：在旅行推銷員問題中，如果旅行員每次都選擇最近的城市，那這就是一種貪婪演算法

### 動態規劃演算法
* 動態規劃（Dynamic Programming）通常用於最佳化問題，若問題可以被切割成許多小問題，經由小問題被解決後，可以組合起來成為大問題的解
    * 例：找零錢問題（用最少的零錢個數兌換零錢）

## 圖示說明
### 題目
* 現有 71 個 1 元，幣值分別為 29 元、22 元、5 元、1 元，請用最少的零錢個數兌換零錢
### 貪婪演算法
* 若使用貪婪演算法，我們會得到以下的解，解的過程就是從幣值最大的開始做換算，直到沒辦法在換算，再從幣值次之的做換算，以此類推直到不能換算為止

    | 幣值 | 29 元 | 22 元 | 5 元 | 1 元 |
    | ---: | :---: | :---: | :---: | :---: |
    | 換 29 元 | 2 個| | | |
    | 換 22 元 | | 0 個 | | |
    | 換 5 元 | | | 2 個 | | 
    | 換 1 元 | | | | 3 個 |
* 所以以上總共換了 2 + 0 + 2 + 3 = 7 個硬幣

### 動態規劃演算法
* 若是使用動態規則演算法，

    | 幣值 | 29 元 | 22 元 | 5 元 | 1 元 |
    | ---: | :---: | :---: | :---: | :---: |
    | 換 29 元 | 0 個| | | |
    | 換 22 元 | | 3 個 | | |
    | 換 5 元 | | | 1 個 | | 
    | 換 1 元 | | | | 0 個 |
* 所以以上總共換了 0 + 3 + 1 + 0 = 4 個硬幣

## 程式碼
### 貪婪演算法
* 程式碼
```c
#include <stdio.h>
int money, currency, i, j, t, number = 0;
int coin[1000];
int coin2[1000];
int coin3[1000];
int temp[1000];

int main() {
	printf("請輸入金額：");
	scanf("%d", &money);
	printf("請輸入有幾種幣值：");
	scanf("%d", &currency);
	printf("請輸入幣值：\n");
	for (i = 0; i < currency; i++) {
		printf("%d. ", i+1);
		scanf("%d元", &coin[i]);
	}
	
	printf("--------------------------------\n");
	
	// bubble sort algorithm
	for (i = 0; i < currency; i++) {
		for (j = i+1; j < currency; j++) {
			if (coin[i] < coin[j]) {
				t = coin[i];
				coin[i] = coin[j];
				coin[j] = t;
			}
		}
	}
	
	temp[0] = money;
	
	// greedy algorithm
	for (i = 0; i < currency; i++) {
		coin2[i] = temp[i] / coin[i];
		coin3[i] = coin2[i] * coin[i];
		temp[i+1] = temp[i] - coin3[i];
	} 
	
	// answer
	for (i = 0; i < currency; i++) {
		printf("%d元：%d\n", coin[i], coin2[i]);
		number = number + coin2[i];
	}
	printf("--------------------------------\n");
	printf("一共換了 %d 個硬幣。", number);
}
```
* 執行結果
```
請輸入金額：71
請輸入有幾種幣值：4
請輸入幣值：
1. 1
2. 5
3. 22
4. 29
--------------------------------
29元：2
22元：0
5元：2
1元：3
--------------------------------
一共換了 7 個硬幣。
```

### 動態規劃演算法
* 程式碼
```c
#include<stdio.h>
int main() {
    int i, j, coin, currency;
    int num = 1;
    while (num--) {
    	printf("請輸入金額：");
    	scanf("%d", &coin);
    	printf("請輸入有幾種幣值：");
    	scanf("%d", &currency);
    	printf("請輸入幣值：\n");
    	
        int DP[1001] = {}, money[10];
        
        for(i = 0; i < currency; i++) {
        	printf("%d. ", i+1);
			scanf("%d", &money[i]);
		}
		
		// dynamic alogrithm
        for(i = 0; i <= coin; i++) { 
            for(j = 0; j < currency; j++) { 
                if(i + money[j] <= coin) {
                    if(DP[i + money[j]] == 0) {
                        if(i == 0) { 
                            DP[i + money[j]] = 1;
                        } else {
                            DP[i + money[j]] = DP[i] + 1;
                        } 
                    } else if(DP[i + money[j]] > DP[i] + 1) { 
                        DP[i + money[j]] = DP[i] + 1;
                    } 
                }
            }
		} 
		printf("--------------------------------\n");

		// answer
        printf("一共換了 %d 個硬幣。", DP[coin]);
    }
    return 0;
}
```
* 執行結果
```
請輸入金額：71
請輸入有幾種幣值：4
請輸入幣值：
1. 29
2. 22
3. 5
4. 1
--------------------------------
一共換了 4 個硬幣。
```

## 結論
* 對於『**霍夫曼編碼法，最小擴展樹**』這類的問題而言，『貪婪算法』是可以找到最佳解的！但是對於其他問題，**每次都貪婪的走，並不見得能找到整體最好的結果**，甚至有時候結果會很差，因此是否要用貪婪算法，得視問題而定。

## 參考文獻
1. [維基百科 / 貪婪演算法](https://zh.wikipedia.org/wiki/%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95)
2. [維基百科 / 動態規劃](https://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92)
3. [GitHub cccbook / 書籍：專業程序員一定要會的 23 種算法](https://github.com/cccbook/algjs/wiki)
4. [ITREAD<sup>01</sup> / 動態規劃與貪心演算法的區別](https://www.itread01.com/content/1548966248.html)
5. [Chu-Ling Ko / Ch14 貪婪演算法](https://ko19951231.github.io/algo/Ch14%20%E8%B2%AA%E5%A9%AA%E6%BC%94%E7%AE%97%E6%B3%95.html)
6. [Chu-Ling Ko / Ch15 動態規劃](https://hackmd.io/@qR5cY2d3Ql2AdYtLfHFxVg/ByZgGkLpW?type=view)
