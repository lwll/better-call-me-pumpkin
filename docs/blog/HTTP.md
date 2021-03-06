# HTTP

## 概述

> HTTP，或者超文本传输协议，是上世纪80年代由蒂姆.伯纳斯.李发明的。它是一个规则系统，是一种协议，把应用程序和超文本文档之间的传输联系起来。换句话说，HTTP 就是机器之间彼此沟通的一个协议，或者说一个消息格式。HTTP 遵循一个简单的模型：从客户端发出请求到服务器并等待响应。因此它也被认为是一种“请求--响应协议”。请求和响应都是文本信息，或者说是字符串，信息写法遵循着一个规则，能保证其他机器能够理解上面的内容。

## 互联网

> 互联网是由数以百万计的互相连接的网络构成，网络中计算机和其他设备可以互相通信。按照惯例，网络内的所有设备都提供独特的标签。这种标签的总称是互联网协议地址或 IP 地址，是类似于在互联网上的计算机的电话号码。此外，IP 地址还有端口号，这会提供更多关于如何与其交流的细节 (类似于分机号码)

## DNS

> URL 和 IP 地址之间的对应由域名解析系统也就是常说的 DNS 来控制。DNS 是一个分布式数据库，把像 [http://www.google.com](http://www.google.com/) 这样的域名翻译成 IP 地址，并将请求映射到远程服务器。换句话说，DNS 在互联网上记录 URL 和它对应的 IP 地址。

## 无状态的

> 当一个协议设计成每一个请求/响应周期与前一个都是互相独立的话，我们就说这个协议是无状态的。对于 HTTP 要知道的一点就是，无状态协议对于服务器资源和易用性的影响。HTTP 协议下，服务器不需要在各次请求之间保留状态信息。结果就是如果一次请求出了问题，系统不必做任何清理。

## URL编码

> URL 在设计的时候就默认只接受 ASCII 码。因此，不安全的或者不是 ASCII 码的字符就要进行转义或者编码来适应这个格式。URL 编码的原理是将不符合格式的字符替换成`%`开头后面跟着两个十六进制数字代表的 ASCII 码的一串字符。

符合下列条件的字符都要进行编码处理：

1. 没有对应的 ASCII 码。
2. 字符的使用是不安全的。比如`%`就是不安全的，因为它经常用于对其它字符进行转义。
3. 字符是有特殊用途的 URL 模式保留字。有些字符用于保留字是有着特殊的意义；它们在 URL 中的存在具有特殊用途。比如`/`，`?`，`:`，和`&`，都是需要进行编码的保留字。