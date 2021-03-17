# RabbitMQ

## 简要介绍

> RabbitMQ is the most widely deployed open source message broker

![image-20200918221012190](https://gitee.com/lwsmilence/image-hub/raw/master/image-20200918221012190.png)

**官网地址：https://www.rabbitmq.com/**

**官网教程：[RabbitMQ Tutorials — RabbitMQ](https://www.rabbitmq.com/getstarted.html)**

### 几个基本概念

- **Message**

  **消息**。消息是不具名的，它有消息头和消息体组成。消息体是不透明的，而消息头则由一系列的可选属性组成，这些属性包括`routing-key(路由键)、priority(相对于其他消息的优先权)、delivery-mode(指出该消息可能需要持久性存储)等`

- **Publisher**

  消息的**生产者**，也是一个向交换器发布消息的客户端应用程序

- **Exchange**

  **交换器**。用来接收生产者发送的消息并将这些消息路由给服务器中的队列

  `Exchange`有4种类型：`direct(默认),fanout,topic,headers`。不同类型的Exchange转发消息的策略有所区别

  - `direct`

    消息中的`routing key`如果和`Binding`中的`binding key`完全匹配，`Exchange`就将消息发到对应的队列中

    ![image-20200923220333230](https://gitee.com/lwsmilence/image-hub/raw/master/rabbitmq-direct.png)

  - `fanout`

    每个发到`fanout`类型交换器的消息都会分到所有绑定的队列上去。不处理路由键。转发消息是最快的。

    ![image-20200923220552464](https://gitee.com/lwsmilence/image-hub/raw/master/rabbitmq-fanout.png)

  - `topic`

    `topic`交换器将`routing key`和`binding key`切分成单词，这些**单词之间用点隔开**。它同样识别两个通配符：`#`, `*`。`#`匹配0个或多个单词，`*`匹配一个单词

    ![image-20200923221404501](https://gitee.com/lwsmilence/image-hub/raw/master/rabbitmq-topic.png)

- **Queue**

  **消息队列**。用来保存消息直到发送给消费者。它是消息的容器，也是消息的终点。一个消息可投入一个或多个队列。消息一直在队列里，等待消费者连接到这个队列将其取走

- **Binding**

  **绑定**，用于消息队列和交换器之间的关联。一个绑定就是基于路由键将交换器和消息队列连接起来的路由规则。可以将交换器理解成一个由绑定构成的路由表。

  `Echange`和`Queue`的绑定可以是多对多的关系

- **Connection**

  **网络连接**，比如一个`TCP`连接

- **Channel**

  **信道**。多路复用连接中的一个独立的双向数据流通道。信道是建立在真实的TCP连接内的虚拟连接，`AMQP`命令都是通过信道发出去的，不管是发布消息，订阅队列还是接收消息，这些动作都是通过信道完成。因为对于操作系统来说建立和销毁`TCP`都是非常昂贵的开销，所以引入了信道的概念，以复用一条`TCP`连接。

- **Consumer**

  消息的**消费者**，表示一个从消息队列中取得消息的客户端应用程序

- **Virtual Host**

  **虚拟主机**。表示一批交换器、消息队列和相关对象。虚拟主机是共享相同的身份认证和加密环境的独立服务器域。每个`vhost`本质上就是一个mini版的`RabbitMQ`服务器，拥有自己的队列、交换器、绑定和权限机制。`vhost`是`AMQP`概率的基础，必须在连接时指定，`RabbitMQ`默认的`vhost`是`/`     *类似于mysql的database？*

- **Broker**

  表示消息队列服务器实体

这些概念之间的关系可用下图简单展示：

![image-20200922225402224](https://gitee.com/lwsmilence/image-hub/raw/master/rabbitmq-ralation.png)

## 安装

使用[docker](https://www.docker.com/)来快速安装

### 安装docker

`开发环境为win10`

在`docker`官网下载 [docker-desktop](https://www.docker.com/products/docker-desktop), 安装。

### 配置docker镜像加速器

`Settings -> Docker Engine -> configuration ` ,  添加以下json：

```json
{
  "registry-mirrors": [
    "https://XXXXXXXX.mirror.aliyuncs.com",   // 阿里云镜像加速器(已隐藏
    "https://hub-mirror.c.163.com"  // 网易云加速器
  ],
  "insecure-registries": [],
  "debug": true,
  "experimental": false
}
```

推荐使用 [阿里云加速器](https://cr.console.aliyun.com/cn-hangzhou/mirrors)，需要登录获取

### 使用docker安装RabbitMQ

在 [docker hub](https://hub.docker.com/)上搜索`rabbitmq`，在`tag`中找到带有`management`的版本。下载镜像，启动容器：

```bash
# 下载最新版
docker pull rabbitmq:management
# 查看镜像
docker image ls 
# 启动容器 -d: 后台运行 -p: 端口映射，将容器内的端口映射到主机端口 最后是镜像id
docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmqcli 5726af297dd4
# 查看容器 -a: 查看所有容器
docker container ls -a
```

在`docker desktop`上会显示当前所有的容器，同时还有一些快捷操作，省去了敲命令的麻烦：``

![image-20200922221021920](https://gitee.com/lwsmilence/image-hub/raw/master/docker-desktop-container.png)

访问地址：[http://127.0.0.1:15672](http://127.0.0.1:15672)，进入RabbitMQ的management页面如下：

<img src="https://gitee.com/lwsmilence/image-hub/raw/master/rabbitmq-management.png" alt="image-20200922221508955"  />

使用默认用户名和密码`guest/guest`登录：

![image-20200922221713521](https://gitee.com/lwsmilence/image-hub/raw/master/rabbitmq-cli.png)

至此，`rabbitmq`在`docker`中安装成功

## 整合SpringBoot

### 新建`springboot`项目

使用`gradle`管理依赖，引入`spring-boot-starter-amqp`:

```groovy
dependencies {
    compileOnly 'org.projectlombok:lombok:1.18.12'
    annotationProcessor 'org.projectlombok:lombok:1.18.12'
    implementation 'org.springframework.boot:spring-boot-starter-amqp'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation('org.springframework.boot:spring-boot-starter-test') {
        exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
    }
    testImplementation 'org.springframework.amqp:spring-rabbit-test'
}
```

为了方便测试，同时引入了`starter-web`和`starter-test`

### 添加自定义配置

`RabbitConfig.java`

``` java
// RabbitConfig.java
@Configuration
@Slf4j
public class RabbitConfig {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Bean
    public AmqpTemplate amqpTemplate() {
        // 使用jackson 消息转换器
        rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
        rabbitTemplate.setEncoding("UTF-8");
        // 消息发送失败返回到队列中。或者yml配置 publisher-returns: true
        rabbitTemplate.setMandatory(true);
        rabbitTemplate.setReturnCallback((message, replyCode, replyText, exchange, routingKey) -> {
            String correlationId = message.getMessageProperties().getCorrelationId();
            log.debug("消息：{} 发送失败, 应答码：{} 原因：{} 交换机: {}  路由键: {}", correlationId, replyCode, replyText, exchange, routingKey);
        });
        // 消息确认，当消息发送到exchange时回调
        rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
            if (ack) {
                log.debug("消息发送到exchange成功,id: {}", correlationData.getId());
            } else {
                log.debug("消息发送到exchange失败,原因: {}", cause);
            }
        });
        return rabbitTemplate;
    }

}
```

`application.yml`

```yaml
spring:
  rabbitmq:
    publisher-returns: true
    publisher-confirm-type: SIMPLE
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest
    listener:
      simple:
#        手动确认消息，用来保证消息消费失败时不会丢失
        acknowledge-mode: manual
#        一次消费一条，用于验证能者多劳
        prefetch: 1
```

### 声明Queue、Exchange并添加绑定关系

**这里只展示direct Exchange相关的操作，其他的类似**

```java
@Bean
public void bookQueue() {
    //        return QueueBuilder.durable("bookQueue");  // 另一种声明方式
    rabbitAdmin.declareQueue(new Queue("bookQueue"));
}

@Bean
public void bookExchange() {
    rabbitAdmin.declareExchange(new DirectExchange("book.direct"));
}

@Bean
public void bookBinding() {
    rabbitAdmin.declareBinding(new Binding("bookQueue", Binding.DestinationType.QUEUE, "book.direct", "book", null));
}
```

### 发送、监听消息

1. **编写test文件，使用`RabbitTemplate`循环往exchange发送200条数据**

```java
@Autowired
RabbitTemplate rabbitTemplate;

@Test
void testDirectExchange() {
    for (int i = 0; i < 200; i++) {
        rabbitTemplate.convertAndSend("book.direct","book", "book" + i);
    }
}
```

2. **使用`RabbitListener`，监听队列消息**

```java
@RabbitListener(queues = "bookQueue")
public void bookListener1(Message message, Channel channel) throws IOException, InterruptedException {
    // 手动确认消息模式下，必须对消息进行应答
    Thread.sleep(1000);
    channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
    log.info("listener1 receive a message: {}", new String(message.getBody()));
}

@RabbitListener(queues = "bookQueue")
public void bookListener2(Message message, Channel channel) throws IOException {
    channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
    log.info("listener2 receive a message: {}", new String(message.getBody()));
}
```

> 默认情况下如果一个 Message 被消费者所正确接收则会被从 Queue 中移除

- **能者多劳**

  上面定义了两个listener，监听同一个`queue`，表示有两个消费者进行消费。其中`listener1`中添加了一个`Thread.sleep(1000)`，`listener2`中没有，用于模拟不同消费者处理快慢的情况。默认情况下， `rabbitmq`会平均分配消息给各个消费者。通过设置`spring.rabbitmq.listener.simple.prefetch: 1`， 一次只发给消费者一条消息，来实现能者多劳。

- **消息确认机制** 

  有三种消息确认机制
  
  - `AcknowledgeMode.NONE`
  - `AcknowledgeMode.AUTO`
  - `AcknowledgeMode.MANUAL`
  
  ![image-20201019202128024](https://gitee.com/lwsmilence/image-hub/raw/master/rabbit-acknowledgeMode.png)
  
  为了保证消息正常消费，采用`manual`的方式确认消息。当消息正常消费时，调用函数：`channel.basicAck`，该条消息就会从队列中删除。
  
- **mandatory**

  在消息没有被路由到合适队列情况下会将消息返还给消息发布者。以下是几种示例：

  - 创建了`exchange`但是未绑定`queue`
  - `routingKey`和`bindingKey`不一致

## 集群部署

### 启动容器

```bash
docker run -d --hostname rabbitmq1 --name rabbitmq-cluster1 -p 15672:15672 -p 5672:5672 -e RABBITMQ_ERLANG_COOKIE='rabbitmqCookie' 5726af297dd4
docker run -d --hostname rabbitmq2 --name rabbitmq-cluster2 -p 15673:15672 -p 5673:5672 -e RABBITMQ_ERLANG_COOKIE='rabbitmqCookie' --link rabbitmq-cluster1:rabbitmq1  5726af297dd4
docker run -d --hostname rabbitmq3 --name rabbitmq-cluster3 -p 15674:15672 -p 5674:5672 -e RABBITMQ_ERLANG_COOKIE='rabbitmqCookie' --link rabbitmq-cluster1:rabbitmq1 --link rabbitmq-cluster2:rabbitmq2  5726af297dd4
```

### 容器节点加入集群

1. 第一个容器

   ```bash
   docker exec -it rabbitmq-cluster1 bash
   rabbitmqctl stop_app
   rabbitmqctl reset
   rabbitmqctl start_app
   exit
   ```

2. 第二个容器加入

   ```bash
   docker exec -it rabbitmq-cluster2 bash
   rabbitmqctl stop_app
   rabbitmqctl reset
   rabbitmqctl join_cluster --ram rabbit@rabbitq1
   exit
   ```

3. 第三个容器加入

   ```bash
   docker exec -it rabbitmq-cluster3 bash
   rabbitmqctl stop_app
   rabbitmqctl reset
   rabbitmqctl join_cluster --ram rabbit@rabbitq1
   exit
   ```

### 同步策略

以下内容摘自官网：

> By default, contents of a queue within a RabbitMQ cluster are located on a single node (the node on which the queue was declared). This is in contrast to exchanges and bindings, which can always be considered to be on all nodes. Queues can optionally be made *mirrored* across multiple nodes.
>
> Each mirrored queue consists of one *master* and one or more *mirrors*. The master is hosted on one node commonly referred as the master node. Each queue has its own master node. All operations for a given queue are first applied on the queue's master node and then propagated to mirrors. This involves enqueueing publishes, delivering messages to consumers, tracking [acknowledgements from consumers](https://www.rabbitmq.com/confirms.html) and so on.
>
> Queue mirroring implies [a cluster of nodes](https://www.rabbitmq.com/clustering.html). It is therefore not recommended for use across a WAN (though of course, clients can still connect from as near and as far as needed).
>
> Messages published to the queue are replicated to all mirrors. Consumers are connected to the master regardless of which node they connect to, with mirrors dropping messages that have been acknowledged at the master. Queue mirroring therefore enhances availability, but does not distribute load across nodes (all participating nodes each do all the work).
>
> If the node that hosts queue master fails, the oldest mirror will be promoted to the new master as long as it's synchronised. [Unsynchronised mirrors](https://www.rabbitmq.com/ha.html#unsynchronised-mirrors) can be promoted, too, depending on queue mirroring parameters.

> Mirroring parameters are configured using [policies](https://www.rabbitmq.com/parameters.html#policies). A policy matches one or more queues by name (using a regular expression pattern) and contains a definition (a map of optional arguments) that are added to the total set of properties of the matching queues.

policy的设置说明：

```markdown
$ rabbitmqctl set_policy [-p Vhost] Name Pattern Definition [Priority]

-p Vhost: 可选参数，针对指定vhost下的queue进行设置
Name: policy的名称
Pattern: queue的匹配模式(正则表达式)
Definition: 镜像定义，包括三个部分ha-mode, ha-params, ha-sync-mode
    ha-mode: 指明镜像队列的模式，有效值为 all/exactly/nodes
        all: 表示在集群中所有的节点上进行镜像
        exactly: 表示在指定个数的节点上进行镜像，节点的个数由ha-params指定
        nodes: 表示在指定的节点上进行镜像，节点名称通过ha-params指定
    ha-params: ha-mode模式需要用到的参数
    ha-sync-mode: 进行队列中消息的同步方式，有效值为automatic和manual
priority: 可选参数，policy的优先级
```

以下命令将所有`queue` **自动**同步到集群的所有节点

```bash
rabbitmqctl set_policy policy-all "^" '{"ha-mode":"all","ha-sync-mode":"automatic"}'
```

## 负载均衡

使用`nginx`来实现负载均衡。

*nginx从1.9.0版本开始，新增了ngx_stream_core_module模块，使nginx支持四层负载均衡*

nginx主要配置如下：

```nginx
# /root/lws/nginx-rabbit.conf
http {
    #rabbitmq管理界面  七层负载均衡
	upstream rabbitManage {
		server 10.67.47.44:15672;
		server 10.67.47.44:15673;
		server 10.67.47.44:15674;
	}
	server {
        listen       15675;
        server_name   10.67.47.44; 
        location / {  
            proxy_pass   http://rabbitManage;
            index  index.html index.htm;  
        }  
    }
}

# rabbitmq通信 四层负载均衡
stream{
	upstream rabbitTcp{
        server 10.67.47.44:5672;
        server 10.67.47.44:5673;
		server 10.67.47.44:5674;
    }

    server {
        listen 5675;
        proxy_pass rabbitTcp;
    }
}
```

docker启动nginx:

```bash
docker run -d -it -p 15675:15675 -p 5675:5675 --name nginx-rabbit-1 -v /root/lws/nginx-rabbit.conf:/etc/nginx/nginx.conf --privileged nginx
```

`-v`参数将指定的配置文件替换为默认配置文件

访问 10.67.47.44:15675 可访问`rabbitmq management`，访问 10.67.47.44:5675 连接`rabbitmq`

## HA

**使用keepalived来实现HA**



## 参考资料

[RabbitMQ：消息发送确认 与 消息接收确认（ACK）](https://www.jianshu.com/p/2c5eebfd0e95)