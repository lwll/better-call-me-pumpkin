# Nginx

## 安装nginx

使用docker安装nginx

```bash
docker pull nginx
```

## 基本用途

### 正向代理

**客户端中配置代理服务器**

### 反向代理

 

### 负载均衡

部署多个服务器，将请求分发到多个服务

### 动静分离

## 配置文件

`nginx`配置文件由三部分组成。

### 全局块

从配置文件开始到events块的内容，主要会设置一些影响`nginx`服务器整体运行的配置指令。

`worker_processes 1  可支持的并发处理器` 

### events块

影响`nginx`服务器和用户的网络连接

`worker_connnection  1024  支持的最大连接数`

### http块

1. http全局块
2. server块

## nginx配置实例

### 反向代理

```nginx
http {
	server {
		listen       88;
        server_name  localhost;
        
        # 代理静态页面
        location ^~/haiou-client/ {
            index  index.html;
            alias  /opt/haiou-client/;
        }
        # 代理后台服务1
        location ^~/haiou-server/ {
            proxy_pass   http://10.73.32.3:8889/haiou-server/;
		    proxy_set_header X-Forwarded-For $remote_addr;
        }
        # 代理后台服务2
        location ^~/haioubigdata-server/ {
            proxy_pass   http://10.73.32.3:7889/haioubigdata-server/;
			proxy_set_header X-Forwarded-For $remote_addr;
        }
	}
}
```

### 负载均衡



## 参考资料



1. [Nginx配置文件详解](https://www.cnblogs.com/hunttown/p/5759959.html)
2. [nginx documentation](http://nginx.org/en/docs/)
3. [linux负载均衡总结性说明（四层负载/七层负载）](https://www.cnblogs.com/kevingrace/p/6137881.html)