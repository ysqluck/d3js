const data = [
    {
        name: 'aaa',
        value: 10
    },
    {
        name: 'bbb',
        value: 11
    },
    {
        name: 'ccc',
        value: 12
    },
    {
        name: 'ddd',
        value: 13
    },
    {
        name: 'eee',
        value: 16
    },
    {
        name: 'fff',
        value: 20
    },
    {
        name: 'ggg',
        value: 25
    },
    {
        name: 'hhh',
        value: 40
    },
    {
        name: 'iii',
        value: 19
    },
    {
        name: 'jjj',
        value: 26
    }

]
// 画柱状图
// 1. 对页面的svg进行Dom获取
const svgDom = d3.select('#mainsvg')
const width = svgDom.attr('width')
const height = svgDom.attr('height')
// 2. 定义margin 如果不定义margin会导致x或y轴坐标溢出画布的情况
const margin = {
    top: 20,
    right: 40,
    bottom: 20,
    left: 60
}
const innerWidth = width - margin.right - margin.left
const innerHeight = height - margin.top - margin.bottom
// 3. 定义比例尺
/*
    比例尺分为两种
    1. 线性比例尺scaleLinear 2. 序数比例尺scaleBand
    domain定义域 range值域
    线性比例尺，能将一个连续的区间，映射到另一区间
    定义域和值域不连续的时候 需要使用序数比例尺
*/
const xScale = d3.scaleLinear()
    // d3.max(数据源，func) 这里是获取data中每一项中value属性对应的最大值
    .domain([0, d3.max(data, d => d.value)]).range([0, innerWidth])
const yScale = d3.scaleBand()
    // 序数比例尺 domain设置成 数据对应的name 
    .domain(data.map(item => item.name)).range([0, innerHeight])
    // 增加上下柱状条带的间距
    .padding(0.1) //百分之0.1
// 4.画出坐标轴
// 1.确定y轴的比例尺和映射形式【定义】
const yAxis = d3.axisLeft(yScale)
// 给y轴画出横向辅助线
.tickSize(-innerWidth)
// 给定坐标轴的绘制容器
const g = svgDom.append('g').attr('id', 'maingroup')
    // 新创建的容易依然要根据margin确定位置
    .attr('transform', `translate(${margin.left},${margin.top})`)
// 在这个容器中新建一个标签指向y轴
g.append('g').call(yAxis)
// 2.画x轴
const xAxis = d3.axisBottom(xScale)
// 给x轴画出横向辅助线
.tickSize(-innerHeight )
// 这里有个问题：坐标轴在定义的时候会随着group放置在（0，0）点
// 想放到下面需要手动设置attr('transform',`translate(0,${innerHeight})`)
g.append('g').call(xAxis).attr('transform',`translate(0,${innerHeight})`)

// 绘制横向柱状图的条带
data.forEach(i=>{
    g.append('rect')
    // 定义长 因为是线性比例尺所以可以直接使用
    .attr('width',xScale(i.value))
    // 定义宽 因为是序数比例尺，需要将离散数据映射到线性空间的每一个条带
    // 使用方法bandwidth
    .attr('height',yScale.bandwidth())
    // 添加填充色
    .attr('fill','hotpink')
    // 确定位置 通过y轴枚举的属性来进行匹配
    .attr('y',yScale(i.name))
    .attr('opacity',0.7)
})

// 更改x，y轴字体大小
d3.selectAll('.tick text').attr('font-size','16px')
// 给图片添加title
g.append('text').text('d3js柱状图').attr('font-size','22px')
// 文字居中
.attr('transform',`translate(${innerWidth/2},0)`)
.attr('text-anchor','middle')
// 给y坐标轴加个title
g.append('text').text('name').attr('transform',`translate(-40,-10)`)
// 修改颜色用fill
.attr('fill','red')