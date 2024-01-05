# Code Meow Universe!
## 概要
コードの断片を使いやすい形で保存しておくためのツールです。
http://codemeow.net/register

## 使い方
1. ログインを行うと、以下のようなメニューが表示されます。
![メニュー画面](https://github.com/Rininmmmment/CodeMeow/blob/main/doc/menu_screen.png)

2. ソースコードファイルを読み込ませることで簡単にコードを保存できます。
![作成画面](https://github.com/Rininmmmment/CodeMeow/blob/main/doc/male_screen.png)
コード保存時、以下のような内容を設定できます。
- チャプター名
"C++基礎文法"、"Python ML"などの大きな枠でコードを分類します。
チャプター名はコード作成時に入力します。
- セクション名
セクションはチャプターの中に複数設定できます。
例えば、"C++基礎文法"チャプターの中に"2次元ベクトル"、"関数の定義"などのセクションを設定することで、コードを探しやすくすることができます。
セクション名はアップロードするファイルの名前に設定されます。
- コードの説明
コードにつけるタイトルのようなものです。
例えば、"ベクトルに要素を追加する"のように設定します。
コードの説明は以下のようにコメントで設定します。
```
//[sq]Define Vector {1,2,10,12,15} as arr1
```
- コード内容
コードを記述します。

以下はアップロードするソースコードの例です。
```
#include<iostream>
#include<vector>
using namespace std;

int main(){
	//[mq]C++ Grammar
	//[sq]Define Vector {1,2,10,12,15} as arr1
	vector<int> arr1 = {1,2,10,12,15};
	//[sq]Fill Constructor {7, 7, 7, 7, 7, 7, 7, 7, 7, 7}
	vector<int> arr(10,7);
	//[sq]Fill Constructor {0, 0, 0, ..., 0, 0}
	vector<int> visited(100,0);
	//[sq]Pop_back(remove the last one)
	arr.pop_back();
	//[sq]Push_Back O(1)
	arr.push_back(16);
	//[sq]Print all the elements
	for(int x : arr){
		cout << x <<",";
	}
	for(int i=0;i< arr.size(); i++){
		cout << arr[i] <<endl;
	}
	//[sq]Size of the vector
	cout << arr.size() << endl;
	//[sq]Capacity of the vector
	cout << arr.capacity() << endl;
	return 0;
}
```

3. 保存したコードは以下のように表示されます。
![表示画面](https://github.com/Rininmmmment/CodeMeow/blob/main/doc/play_screen.png)