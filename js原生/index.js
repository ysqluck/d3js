// d3.select();
// d3.selectAll();
// d3.select('h1').style('color', 'red')
// .attr('class', 'heading')
// .text('Updated h1 tag');
// d3.select('body').append('p').text('First Paragraph');
// d3.select('body').append('p').text('Second Paragraph');
// d3.select('body').append('p').text('Third Paragraph');
// d3.selectAll('p').style('color','hotpink')

// selectAll?
let dataList = [1, 2, 3, 4, 5]
d3.select('body').selectAll('div').data(dataList).enter().append('div').text('D3 is awesome!!');

// 柱状图demo
// 数据集
let dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
// 定义svg图形宽高，以及柱状图间距
let svgWidth = 500, svgHeight = 300, barPadding = 5;
// 通过图形计算每个柱状宽度
let barWidth = (svgWidth / dataset.length);
// 绘制图形
let svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("style", 'background-color:yellow')
let barChart = svg.selectAll("rect")
    .data(dataset) //绑定数组
    .enter() // 指定选择集的enter部分
    .append("rect") // 添加足够数量的矩形
    .attr("y", d => svgHeight - d ) // d为数据集每一项的值, 取y坐标
    .attr("height", d => d) // 设定高度
    .attr("width", barWidth - barPadding) // 设定宽度
    .attr("transform", (d, i) =>  {
        let translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    }); // 实际是计算每一项值的x坐标