# Stream-LB
## やりたいこと
- 複数プロセスでStreamを起動し、masterプロセスからworkerプロセスに処理を流す
- Streamのインターフェイスで扱いたい
- デフォルトではコア数分child streamが起動される
- child-process / cluster
- masterはduplex stream
- childはtransform stream
    - master -> child -> masterとする
 
## 仕様
- child-process / clusterどちらを使うかを調査
    - 特にcluster
- masterプロセスからevent emitter経由でchild processにどのようにシグナルを送るかを決める
- Child Processのworkの定義
    - 一旦transform streamの_transformでOK
- Load Balancing
    - Round Robin
