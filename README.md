### 虚拟dom的简单实现

#### 使用create-react-app脚手架创建

1. 使用js对象模拟虚拟dom（虚拟dom）。

2. 将虚拟dom转为真实dom，插入到某个节点下（render）。


3. 对比新旧虚拟dom的差异，将差异保存在patches中（diff）。

4. 将差异对象应用到真实dom中（patch）。