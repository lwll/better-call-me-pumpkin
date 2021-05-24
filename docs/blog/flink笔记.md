# flink笔记

## Flink架构

Flink 是一个分布式系统，需要有效分配和管理计算资源才能执行流应用程序。它集成了所有常见的集群资源管理器，例如[Hadoop YARN](https://hadoop.apache.org/docs/stable/hadoop-yarn/hadoop-yarn-site/YARN.html)、[Apache Mesos](https://mesos.apache.org/)和[Kubernetes](https://kubernetes.io/)，但也可以设置作为独立集群甚至库运行。

Flink 运行时由两种类型的进程组成：一个 *JobManager* 和一个或者多个 *TaskManager*。

![The processes involved in executing a Flink dataflow](https://ci.apache.org/projects/flink/flink-docs-release-1.13/fig/processes.svg)

### JobManager 

*obManager* 具有许多与协调 Flink 应用程序的分布式执行有关的职责：它决定何时调度下一个 task（或一组 task）、对完成的 task 或执行失败做出反应、协调 checkpoint、并且协调从失败中恢复等等。这个进程由三个不同的组件组成：

- **ResourceManager**

  *ResourceManager* 负责 Flink 集群中的资源提供、回收、分配 - 它管理 **task slots**，这是 Flink 集群中资源调度的单位。Flink 为不同的环境和资源提供者（例如 YARN、Mesos、Kubernetes 和 standalone 部署）实现了对应的 ResourceManager。在 standalone 设置中，ResourceManager 只能分配可用 TaskManager 的 slots，而不能自行启动新的 TaskManager。

- **Dispatcher**

  *Dispatcher* 提供了一个 REST 接口，用来提交 Flink 应用程序执行，并为每个提交的作业启动一个新的 JobMaster。它还运行 Flink WebUI 用来提供作业执行信息。

- **JobMaster**

  *JobMaster* 负责管理单个[JobGraph](https://ci.apache.org/projects/flink/flink-docs-release-1.13/zh/docs/concepts/glossary/#logical-graph)的执行。Flink 集群中可以同时运行多个作业，每个作业都有自己的 JobMaster。

### TaskManagers 

*TaskManager*（也称为 *worker*）执行作业流的 task，并且缓存和交换数据流。

必须始终至少有一个 TaskManager。在 TaskManager 中资源调度的最小单位是 task *slot*。TaskManager 中 task slot 的数量表示并发处理 task 的数量。请注意一个 task slot 中可以执行多个算子

## Flink中的API

Flink为流式/批式处理应用程序的开发提供了不同级别的抽象

![Programming levels of abstraction](https://ci.apache.org/projects/flink/flink-docs-release-1.13/fig/levels_of_abstraction.svg)

## 有状态流处理

如果要跨越多个事件（比如多个windows操作）记录信息，这种操作就叫做有状态。

### Keyed State

## 及时流处理

及时流处理是有状态流处理的扩展。 可以用来处理时间序列分析

### 时间的概念：事件时间和处理时间

- 事件时间：

  事件时间是每个独立的事件在它的生产设备上产生的时间。这个时间一般是时间在进去Flink之前嵌入的。

- 处理时间

  处理时间指的是机器进行相应的操作时的系统时间。

  ![Event Time and Processing Time](https://ci.apache.org/projects/flink/flink-docs-release-1.13/fig/event_processing_time.svg)

### 事件事件和水印



## 数据管道 & ETL

### 无状态的转换

#### map()

`Apache FLink`的一种常见应用场景是`ETL`（抽取、转换、加载）管道任务。从一个或多个数据源获取数据，进行一些转换操作和信息补充，将结果存储起来。

官方示例代码：

```java
DataStream<TaxiRide> rides = env.addSource(new TaxiRideSource(...));

DataStream<EnrichedRide> enrichedNYCRides = rides
    .filter(new RideCleansingSolution.NYCFilter())
    .map(new Enrichment());

public static class Enrichment implements MapFunction<TaxiRide, EnrichedRide> {

    @Override
    public EnrichedRide map(TaxiRide taxiRide) throws Exception {
        return new EnrichedRide(taxiRide);
    }
}
```

#### flatmap()

`MapFunction`只适用于一对一的转换：对每个进入算子的流元素，`map()`将仅输出一个转换后的元素。对于除此之外的场景，需要使用`flatmap()`

```java
DataStream<TaxiRide> rides = env.addSource(new TaxiRideSource(...));

DataStream<EnrichedRide> enrichedNYCRides = rides
    .flatMap(new NYCEnrichment());

enrichedNYCRides.print();
```

其中用到的`FlatMapFunction`:

```java
public static class NYCEnrichment implements FlatMapFunction<TaxiRide, EnrichedRide> {

    @Override
    public void flatMap(TaxiRide taxiRide, Collector<EnrichedRide> out) throws Exception {
        FilterFunction<TaxiRide> valid = new RideCleansing.NYCFilter();
        if (valid.filter(taxiRide)) {
            out.collect(new EnrichedRide(taxiRide));
        }
    }
}
```

使用接口中提供的 `Collector` ，`flatmap()` 可以输出你想要的任意数量的元素，也可以一个都不发。

### Keyed Streams

#### keyBy()

`keyBy`将一个流根据其中的一些属性来进行分区，从而使所有具有相同属性的事件分到相同的组里。

```java
rides
    .flatMap(new NYCEnrichment())
    .keyBy(enrichedRide -> enrichedRide.startCell)
```

每个 `keyBy` 会通过 shuffle 来为数据流进行重新分区。总体来说这个开销是很大的，它涉及网络通信、序列化和反序列化。

![keyBy and network shuffle](https://ci.apache.org/projects/flink/flink-docs-release-1.13/fig/keyBy.png)

KeySelector 不仅限于从事件中抽取键。也可以按想要的方式计算得到键值:

```java
keyBy(ride -> GeoUtils.mapToGridCell(ride.startLon, ride.startLat))
```

#### Keyed Stream的聚合

#### reduce()和其他聚合算子

### 有状态的转换

在flink不参与管理状态的情况下，你的应用也可以使用状态，但Flink为其管理状态提供了一些引人注目的特性：

- 本地性
- 持久性
- 纵向可扩展性
- 横向可扩展性 
- 可查询性

#### Rich Functions

`Flink`的几种函数接口，包括`FilterFunction、MapFunction、FlatMapFunction`,都是单一抽象方法模式。`Flink`同样也为他们提供了一个所谓`rich`的变体，如`RichFlatMapFunction`,其中增加了以下放大，包括：

- `open(Configuration)`
- `close()`
- `getRuntimeContext()`

`open()`仅在算子初始化时调用一次。可以用来加载一些静态数据，或者建立外部服务的链接等。

`getRuntimeContext()`是创建和访问`Flink`状态的途径

#### 一个使用Keyed State的例子

在这个例子里，想象有一个要去重的事件数据流，对每个键只保留第一个事件。下面是完成这个功能的应用，使用一个名为`Deduplicator`的`RichFlatMapFunction`：

```java
private static class Event {
    public final String key;
    public final long timestamp;
    ...
}

public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
  
    env.addSource(new EventSource())
        .keyBy(e -> e.key)
        .flatMap(new Deduplicator())
        .print();
  
    env.execute();
}
```

`Deduplicator`需要记录每个键是否已经有了相应的记录。它将通过使用Flink的`keyed state`接口来做这件事，`Flink`会为每个状态中管理的条目维护一个键值存储。`Flink`支持几种不同方式的`keyed state`,这个例子使用的是最简单的一个，叫做`ValaueState`。意思是对于每个键，`FLink`将存储一个单一的对象。

```java
public static class Deduplicator extends RichFlatMapFunction<Event, Event> {
    ValueState<Boolean> keyHasBeenSeen;

    @Override
    public void open(Configuration conf) {
        ValueStateDescriptor<Boolean> desc = new ValueStateDescriptor<>("keyHasBeenSeen", Types.BOOLEAN);
        keyHasBeenSeen = getRuntimeContext().getState(desc);
    }

    @Override
    public void flatMap(Event event, Collector<Event> out) throws Exception {
        if (keyHasBeenSeen.value() == null) {
            out.collect(event);
            keyHasBeenSeen.update(true);
        }
    }
}
```

部署在分布式集群时，将会有很多 `Deduplicator` 的实例，每一个实例将负责整个键空间的互斥子集中的一个。所以，当你看到一个单独的 `ValueState`，比如

```java
ValueState<Boolean> keyHasBeenSeen;
```

要理解这个代表的不仅仅是一个单独的布尔类型变量，而是一个分布式的共享键值存储。

#### 清理状态

在键无限增长的应用中，清除再也不会使用的状态是很必要的：

```java
keyHasBeenSeen.clear()
```

也可以选择使用 [状态的过期时间（TTL）](https://ci.apache.org/projects/flink/flink-docs-release-1.13/zh/docs/dev/datastream/fault-tolerance/state/#state-time-to-live-ttl)，为状态描述符配置你想要旧状态自动被清除的时间。

### Connected Streams

当需要更灵活地调整转换的某些功能，可以使用`connected streams` ，一个单独的算子有两个输入流。

![connected streams](https://ci.apache.org/projects/flink/flink-docs-release-1.13/fig/connected-streams.svg)

connected stream 也可以被用来实现流的关联。

```java
public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

    DataStream<String> control = env
        .fromElements("DROP", "IGNORE")
        .keyBy(x -> x);

    DataStream<String> streamOfWords = env
        .fromElements("Apache", "DROP", "Flink", "IGNORE")
        .keyBy(x -> x);
  
    control
        .connect(streamOfWords)
        .flatMap(new ControlFunction())
        .print();

    env.execute();
}
```

两个流只有键一致的时候才能连接。 `keyBy` 的作用是将流数据分区，当 keyed stream 被连接时，他们必须按相同的方式分区。这样保证了两个流中所有键相同的事件发到同一个实例上。这样也使按键关联两个流成为可能。

在这个例子中，两个流都是 `DataStream<String>` 类型的，并且都将字符串作为键。正如你将在下面看到的，`RichCoFlatMapFunction` 在状态中存了一个布尔类型的变量，这个变量被两个流共享。

```java
public static class ControlFunction extends RichCoFlatMapFunction<String, String, String> {
    private ValueState<Boolean> blocked;
      
    @Override
    public void open(Configuration config) {
        blocked = getRuntimeContext()
            .getState(new ValueStateDescriptor<>("blocked", Boolean.class));
    }
      
    @Override
    public void flatMap1(String control_value, Collector<String> out) throws Exception {
        blocked.update(Boolean.TRUE);
    }
      
    @Override
    public void flatMap2(String data_value, Collector<String> out) throws Exception {
        if (blocked.value() == null) {
            out.collect(data_value);
        }
    }
}
```

 `flatMap1` 和 `flatMap2` 的调用顺序是没法控制的，这两个输入流是相互竞争的关系。

## 事件驱动应用

## 容错处理

